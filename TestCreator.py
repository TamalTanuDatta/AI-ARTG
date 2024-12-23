from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import os
from pathlib import Path
from bs4 import BeautifulSoup
import html5lib
import json
from html_analyzer_model import CookieBannerAnalyzer
import subprocess
import re
import requests
from urllib.parse import urlparse
from datetime import datetime
import logging

# Initialize the logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Create static directory if it doesn't exist
os.makedirs('static', exist_ok=True)

# Initialize the analyzer
cookie_analyzer = CookieBannerAnalyzer()

def extract_url_from_html(html_content):
    """Extract URL from HTML saved from comment."""
    url_pattern = r'<!-- saved from url=\(\d+\)(.*?) -->'
    match = re.search(url_pattern, html_content)
    if match:
        return match.group(1).strip()
    return None

def clean_text(text):
    """Clean text content by removing extra whitespace and newlines."""
    # Remove newlines and extra spaces
    cleaned = ' '.join(text.strip().split())
    # Escape special characters
    cleaned = cleaned.replace('"', '\\"')
    return cleaned

def format_selector(selector):
    """Format selector to use double quotes outside and single quotes inside brackets."""
    # Handle :has-text selectors specially
    if ':has-text(' in selector:
        base, text = selector.split(':has-text(', 1)
        text = text.rstrip(')')
        # Clean and format the text content
        text = clean_text(text)
        return '"' + base + ':has-text(\\"' + text + '\\")"'
    
    # If selector contains brackets with attributes
    if '[' in selector and ']' in selector:
        # Split into parts (before bracket, inside bracket, after bracket)
        parts = selector.split('[', 1)  # Split only at first bracket
        base = parts[0]
        attrs = parts[1].rstrip(']')  # Remove closing bracket
        
        # Format attribute part
        if '=' in attrs:
            # Split at equals sign and handle quotes
            name, value = attrs.split('=', 1)
            value = value.strip('"\'')  # Remove any existing quotes
            value = clean_text(value)  # Clean the attribute value
            return '"' + base + '[' + name + '=\\"' + value + '\\"]"'
        else:
            return '"' + base + '[' + attrs + ']"'
    else:
        # No attributes, just wrap in double quotes
        return '"' + selector + '"'

def generate_test_code(test_case):
    """Generate test code for a single test case."""
    code_lines = []
    seen_assertions = set()  # Track unique assertions
    
    # Add steps
    for step in test_case.get('steps', []):
        action = step.get('action', '')
        selector = format_selector(step.get('selector', ''))
        value = step.get('value', '')
        key = step.get('key', '')
        
        # Create a unique key for this step
        step_key = f"{action}:{selector}:{value}:{key}"
        if step_key in seen_assertions:
            continue
        seen_assertions.add(step_key)
        
        # Generate step code
        if action == 'fill':
            code_lines.append('    await page.fill(' + selector + ', "' + value + '")')
        elif action == 'click':
            code_lines.append('    await page.click(' + selector + ')')
        elif action == 'check_visibility':
            code_lines.append('    await expect(page.locator(' + selector + ')).toBeVisible()')
        elif action == 'submit':
            code_lines.append('    await page.locator(' + selector + ').click()')
        elif action == 'press':
            code_lines.append('    await page.keyboard.press("' + key + '")')
    
    # Add assertions
    for assertion in test_case.get('assertions', []):
        assertion_type = assertion.get('type', '')
        selector = format_selector(assertion.get('selector', ''))
        value = assertion.get('value', '')
        
        # Create a unique key for this assertion
        assertion_key = f"{assertion_type}:{selector}:{value}"
        if assertion_key in seen_assertions:
            continue
        seen_assertions.add(assertion_key)
        
        # Generate assertion code
        if assertion_type == 'visible':
            code = '    await expect(page.locator(' + selector + ')).toBeVisible()'
            if code not in code_lines:  # Extra check to prevent duplicates
                code_lines.append(code)
        elif assertion_type == 'validation':
            code_lines.append('    await expect(page.locator(' + selector + ')).toBeVisible()')
            code_lines.append('    const isValid = await page.$eval(' + selector + ', (el: HTMLFormElement) => el.checkValidity())')
            code_lines.append('    expect(isValid).toBeTruthy()')
        elif assertion_type == 'invalid':
            code_lines.append('    await expect(page.locator(' + selector + ')).toBeVisible()')
            code_lines.append('    const isInvalid = await page.$eval(' + selector + ', (el: HTMLFormElement) => !el.checkValidity())')
            code_lines.append('    expect(isInvalid).toBeTruthy()')
        elif assertion_type == 'error_message':
            code = '    await expect(page.locator(' + selector + ')).toBeVisible()'
            if code not in code_lines:  # Extra check to prevent duplicates
                code_lines.append(code)
        elif assertion_type == 'form_validation':
            code_lines.append('    const formValid = await page.$eval("form", (form: HTMLFormElement) => form.checkValidity())')
            code_lines.append('    expect(formValid).toBeFalsy()')
        elif assertion_type == 'form_submission':
            code = '    await expect(page.locator(' + selector + ')).toBeVisible()'
            if code not in code_lines:  # Extra check to prevent duplicates
                code_lines.append(code)
            code_lines.append('    const formValid = await page.$eval(' + selector + ', (form: HTMLFormElement) => form.checkValidity())')
            code_lines.append('    expect(formValid).toBeTruthy()')
            code_lines.append('    await page.waitForTimeout(500)')
        elif assertion_type == 'value':
            code_lines.append('    await expect(page.locator(' + selector + ')).toHaveValue("' + value + '")')
    
    # Filter out empty test cases
    if not code_lines:
        return None
    
    # Remove any remaining duplicates from code_lines
    return '\n'.join(dict.fromkeys(code_lines))

def generate_test_description(test_case):
    """Generate a descriptive name for the test case based on its actions and assertions."""
    steps = test_case.get('steps', [])
    assertions = test_case.get('assertions', [])
    
    # Analyze the test case to determine its purpose
    has_form_validation = any(a.get('type') == 'form_validation' for a in assertions)
    has_form_submission = any(a.get('type') == 'form_submission' for a in assertions)
    has_error_message = any(a.get('type') == 'error_message' for a in assertions)
    has_visibility_check = any(a.get('type') == 'visible' for a in assertions)
    
    # Get field names being tested
    field_names = set()
    for step in steps:
        selector = step.get('selector', '')
        if 'name=' in selector:
            name = selector.split('name=')[1].strip('"\'[]')
            field_names.add(name)
    for assertion in assertions:
        selector = assertion.get('selector', '')
        if 'name=' in selector:
            name = selector.split('name=')[1].strip('"\'[]')
            field_names.add(name)
    
    # Generate description based on test purpose
    if has_form_submission and field_names:
        return f"Submit form with {', '.join(sorted(field_names))} fields"
    elif has_form_validation and field_names:
        return f"Validate {', '.join(sorted(field_names))} fields"
    elif has_error_message:
        return "Check error message display"
    elif has_visibility_check and field_names:
        return f"Check visibility of {', '.join(sorted(field_names))} fields"
    elif 'click' in [s.get('action') for s in steps]:
        return "Test button interactions"
    elif field_names:
        return f"Test {', '.join(sorted(field_names))} field interactions"
    else:
        return "Test form element interactions"

def categorize_test_case(test_case):
    """Categorize test case based on its purpose."""
    assertions = test_case.get('assertions', [])
    steps = test_case.get('steps', [])
    
    # Check test case characteristics
    has_form_validation = any(a.get('type') == 'form_validation' for a in assertions)
    has_form_submission = any(a.get('type') == 'form_submission' for a in assertions)
    has_error_message = any(a.get('type') == 'error_message' for a in assertions)
    has_visibility_check = any(a.get('type') == 'visible' for a in assertions)
    has_button_click = any(s.get('action') == 'click' for s in steps)
    has_input_fill = any(s.get('action') == 'fill' for s in steps)
    
    # Determine category
    if has_form_submission:
        return "Form Submission"
    elif has_form_validation:
        return "Form Validation"
    elif has_error_message:
        return "Error Handling"
    elif has_visibility_check and not (has_button_click or has_input_fill):
        return "Element Visibility"
    elif has_button_click:
        return "Button Interactions"
    elif has_input_fill:
        return "Input Interactions"
    else:
        return "General"

def is_duplicate_test(test1, test2):
    """Check if two tests are duplicates by comparing their steps and assertions."""
    # Compare steps
    steps1 = sorted((s.get('action', ''), s.get('selector', ''), s.get('value', '')) 
                    for s in test1.get('steps', []))
    steps2 = sorted((s.get('action', ''), s.get('selector', ''), s.get('value', ''))
                    for s in test2.get('steps', []))
    
    # Compare assertions
    assertions1 = sorted((a.get('type', ''), a.get('selector', ''), a.get('value', ''))
                        for a in test1.get('assertions', []))
    assertions2 = sorted((a.get('type', ''), a.get('selector', ''), a.get('value', ''))
                        for a in test2.get('assertions', []))
    
    return steps1 == steps2 and assertions1 == assertions2

def remove_duplicate_tests(categorized_tests):
    """Remove duplicate tests within and across categories."""
    # Keep track of all unique tests
    unique_tests = {}  # (steps_tuple, assertions_tuple) -> (category, test_case)
    
    # Process each category
    cleaned_categories = {}
    for category, tests in categorized_tests.items():
        cleaned_tests = []
        for test in tests:
            # Create tuples for comparison
            steps = tuple(sorted((s.get('action', ''), s.get('selector', ''), s.get('value', ''))
                               for s in test.get('steps', [])))
            assertions = tuple(sorted((a.get('type', ''), a.get('selector', ''), a.get('value', ''))
                                   for a in test.get('assertions', [])))
            test_key = (steps, assertions)
            
            # Check if we've seen this test before
            if test_key not in unique_tests:
                unique_tests[test_key] = (category, test)
                cleaned_tests.append(test)
        
        if cleaned_tests:  # Only add category if it has tests
            cleaned_categories[category] = cleaned_tests
    
    return cleaned_categories

def normalize_text(text):
    """Normalize text for use in variable names."""
    # Remove special characters and spaces, keep only alphanumeric
    normalized = ''.join(c if c.isalnum() else '_' for c in text)
    # Remove asterisks (commonly used for required fields)
    normalized = normalized.replace('*', '')
    # Remove consecutive underscores
    while '__' in normalized:
        normalized = normalized.replace('__', '_')
    # Remove leading/trailing underscores
    normalized = normalized.strip('_')
    return normalized

def detect_cookie_banner(html_content):
    """Detect cookie banner/popup elements in HTML including iframes."""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Common cookie banner patterns
    cookie_patterns = {
        'container': [
            '[class*="cookie"]',
            '[class*="consent"]',
            '[class*="privacy"]',
            '[id*="cookie"]',
            '[id*="consent"]',
            '[aria-label*="cookie"]',
            '[role="dialog"][aria-label*="cookie"]'
        ],
        'button': [
            'button:contains("Accept")',
            'button:contains("Agree")',
            'button:contains("Allow")',
            'button:contains("OK")',
            'button:contains("Got it")',
            'button:contains("Akzeptieren")',
            'button:contains("Zustimmen")',
            'button:contains("Einverstanden")',
            '[role="button"]:contains("Accept")',
            '[role="button"]:contains("Agree")'
        ]
    }
    
    # Find potential cookie banners
    for selector in cookie_patterns['container']:
        elements = soup.select(selector)
        if elements:
            # Get the first matching element as container
            container = elements[0]
            
            # Look for accept buttons within container
            buttons = []
            for btn in container.find_all(['button', 'a']):
                if any(term in btn.get_text().lower() for term in ['accept', 'agree', 'allow', 'ok']):
                    buttons.append({
                        'selector': get_selector(btn),
                        'text': btn.get_text().strip(),
                        'confidence': 0.9 if 'accept' in btn.get_text().lower() else 0.7
                    })
            
            if buttons:
                return {
                    'type': 'banner',
                    'container': {
                        'selector': get_selector(container),
                        'score': 0.9 if 'cookie' in str(container).lower() else 0.7
                    },
                    'button': {
                        'selectors': [btn['selector'] for btn in buttons] + [
                            'button:has-text("Alle akzeptieren")',
                            'button:has-text("Zustimmen")',
                            'button:has-text("Akzeptieren")',
                            'button[data-testid*="consent-accept-all"]',
                            '[aria-label*="Accept"]',
                            '[title*="Accept"]'
                        ]
                    }
                }
    
    # Check for cookie iframes if no banner found
    iframes = soup.find_all('iframe')
    for iframe in iframes:
        iframe_text = str(iframe).lower()
        if any(term in iframe_text for term in ['cookie', 'consent', 'privacy', 'gdpr']):
            return {
                'type': 'iframe',
                'elements': [{
                    'id': iframe.get('id', ''),
                    'src': iframe.get('src', ''),
                    'title': iframe.get('title', '')
                }]
            }
    
    return None

def get_selector(element):
    """Generate a selector for the element."""
    if element.get('id'):
        return f'#{element["id"]}'
    elif element.get('class'):
        return '.' + '.'.join(element['class'])
    else:
        return element.name

def detect_form_elements(soup):
    """Detect form elements from HTML content."""
    if isinstance(soup, str):
        soup = BeautifulSoup(soup, 'html.parser')
        
    form_elements = {
        'buttons': [],
        'inputs': [],
        'dropdowns': [],
        'checkboxes': []
    }
    
    # Find all buttons (including submit inputs and button elements)
    buttons = soup.find_all(['button', 'input'])
    for button in buttons:
        if button.name == 'button' or (button.name == 'input' and button.get('type') in ['submit', 'button']):
            # Try to find button text in multiple places
            button_text = (
                button.get_text(strip=True) or 
                button.get('value', '') or 
                button.get('aria-label', '') or
                button.get('title', '') or
                button.get('name', '')
            )
            
            if button_text:
                form_elements['buttons'].append({
                    'type': button.get('type', 'button'),
                    'text': button_text,
                    'name': button.get('name', ''),
                    'id': button.get('id', ''),
                    'required': button.get('required') is not None
                })
    
    # Find all input fields
    for input_field in soup.find_all('input'):
        input_type = input_field.get('type', 'text')
        if input_type in ['text', 'email', 'password', 'tel', 'number', 'search']:
            # Try to find label text
            label_text = None
            if input_field.get('id'):
                label = soup.find('label', attrs={'for': input_field['id']})
                if label:
                    label_text = label.get_text(strip=True)
            
            # If no explicit label, try to find wrapping label
            if not label_text:
                parent_label = input_field.find_parent('label')
                if parent_label:
                    label_text = parent_label.get_text(strip=True)
            
            # Use the first available identifier
            identifier = (
                label_text or
                input_field.get('placeholder', '') or
                input_field.get('aria-label', '') or
                input_field.get('name', '')
            )
            
            if identifier:
                form_elements['inputs'].append({
                    'type': input_type,
                    'identifier': identifier,
                    'name': input_field.get('name', ''),
                    'required': input_field.get('required') is not None
                })
    
    # Find all checkboxes
    for checkbox in soup.find_all('input', type='checkbox'):
        # Try to find label text
        label_text = None
        if checkbox.get('id'):
            label = soup.find('label', attrs={'for': checkbox['id']})
            if label:
                label_text = label.get_text(strip=True)
        
        # If no explicit label, try to find wrapping label
        if not label_text:
            parent_label = checkbox.find_parent('label')
            if parent_label:
                label_text = parent_label.get_text(strip=True)
        
        # Use the first available identifier
        identifier = (
            label_text or
            checkbox.get('aria-label', '') or
            checkbox.get('name', '')
        )
        
        if identifier:
            form_elements['checkboxes'].append({
                'identifier': identifier,
                'name': checkbox.get('name', ''),
                'required': checkbox.get('required') is not None
            })
    
    return form_elements

def generate_form_element_tests(form_elements):
    """Generate Playwright tests for form elements."""
    lines = []
    
    # Add Form Elements Tests
    lines.extend([
        '  test.describe("Form Elements Tests", () => {',
        ''
    ])
    
    # Track used variable names to handle duplicates
    used_var_names = set()
    
    # Test buttons
    if form_elements['buttons']:
        lines.extend([
            '    test.describe("Button Interactions", () => {',
            '      test("should verify button states and interactions", async ({ page }) => {',
            '        // Wait for all buttons to be loaded',
            '        await page.waitForLoadState("domcontentloaded");',
            '        try {'
        ])
        for button in form_elements['buttons']:
            button_text = button['text']
            base_name = normalize_text(button_text)
            
            # Handle duplicate button names
            button_name = base_name
            counter = 1
            while button_name in used_var_names:
                button_name = f"{base_name}_{counter}"
                counter += 1
            used_var_names.add(button_name)
            
            # Convert Python bool to JavaScript bool string
            is_not_submit = str(button["type"] != "submit").lower()
            
            lines.extend([
                f'          // Test button: {button_text}',
                f'          const button_{button_name} = await page.getByRole("button", {{ name: "{button_text}" }});',
                f'          if (await button_{button_name}.count() > 0) {{',
                f'            await expect(button_{button_name}, "Button should be visible").toBeVisible();',
                f'            await expect(button_{button_name}, "Button should be enabled").toBeEnabled();',
                '',
                '            // Verify button interactions',
                f'            await button_{button_name}.hover();',
                '',
                f'            if ({is_not_submit}) {{',
                f'              await button_{button_name}.click({{ trial: true }});',
                '            }',
                '          }',
                ''
            ])
        lines.extend([
            '        } catch (error) {',
            '          console.log("Error validating buttons:", error);',
            '        }',
            '      });',
            '    });',
            ''
        ])
    
    # Reset used variable names for inputs
    used_var_names.clear()
    
    # Test input fields
    if form_elements['inputs']:
        lines.extend([
            '    test.describe("Input Field Validation", () => {',
            '      test("should validate input field behavior and constraints", async ({ page }) => {',
            '        // Wait for form elements to be ready',
            '        await page.waitForLoadState("domcontentloaded");',
            '        try {'
        ])
        for input_field in form_elements['inputs']:
            identifier = input_field['identifier']
            base_name = normalize_text(identifier)
            
            # Handle duplicate input names
            input_name = base_name
            counter = 1
            while input_name in used_var_names:
                input_name = f"{base_name}_{counter}"
                counter += 1
            used_var_names.add(input_name)
            
            test_value = get_test_value_for_input(input_field['type'])
            
            # Convert Python bool to JavaScript bool string
            is_required = str(input_field["required"]).lower()
            
            lines.extend([
                f'          // Test input field: {identifier}',
                f'          const input_{input_name} = await page.getByLabel("{identifier}", {{ exact: false }});',
                f'          if (await input_{input_name}.count() > 0) {{',
                f'            await expect(input_{input_name}, "Input field should be visible").toBeVisible();',
                '',
                '            // Test input interactions',
                f'            await input_{input_name}.click();',
                f'            await input_{input_name}.fill("{test_value}");',
                f'            await expect(input_{input_name}).toHaveValue("{test_value}");',
                '',
                '            // Test field clearing',
                f'            await input_{input_name}.clear();',
                f'            await expect(input_{input_name}).toHaveValue("");',
                '',
                '            // Verify required state',
                f'            if ({is_required}) {{',
                f'              await expect(input_{input_name}).toHaveAttribute("required", "");',
                '            }',
                '          }',
                ''
            ])
        lines.extend([
            '        } catch (error) {',
            '          console.log("Error validating input fields:", error);',
            '        }',
            '      });',
            '    });',
            ''
        ])
    
    # Reset used variable names for checkboxes
    used_var_names.clear()
    
    # Test checkboxes
    if form_elements['checkboxes']:
        lines.extend([
            '    test.describe("Checkbox Interaction Tests", () => {',
            '      test("should verify checkbox states and interactions", async ({ page }) => {',
            '        // Wait for checkboxes to be loaded',
            '        await page.waitForLoadState("domcontentloaded");',
            '        try {'
        ])
        for checkbox in form_elements['checkboxes']:
            identifier = checkbox['identifier']
            base_name = normalize_text(identifier)
            
            # Handle duplicate checkbox names
            checkbox_name = base_name
            counter = 1
            while checkbox_name in used_var_names:
                checkbox_name = f"{base_name}_{counter}"
                counter += 1
            used_var_names.add(checkbox_name)
            
            # Convert Python bool to JavaScript bool string
            is_required = str(checkbox["required"]).lower()
            
            lines.extend([
                f'          // Test checkbox: {identifier}',
                f'          const checkbox_{checkbox_name} = await page.getByLabel("{identifier}", {{ exact: false }});',
                f'          if (await checkbox_{checkbox_name}.count() > 0) {{',
                f'            await expect(checkbox_{checkbox_name}, "Checkbox should be visible").toBeVisible();',
                '',
                '            // Test checkbox interactions',
                f'            await checkbox_{checkbox_name}.check();',
                f'            await expect(checkbox_{checkbox_name}, "Checkbox should be checked").toBeChecked();',
                '',
                f'            await checkbox_{checkbox_name}.uncheck();',
                f'            await expect(checkbox_{checkbox_name}, "Checkbox should be unchecked").not.toBeChecked();',
                '',
                '            // Test keyboard interaction',
                f'            await checkbox_{checkbox_name}.focus();',
                '            await page.keyboard.press("Space");',
                f'            await expect(checkbox_{checkbox_name}, "Checkbox should be checked after Space key").toBeChecked();',
                '',
                '            // Verify required state',
                f'            if ({is_required}) {{',
                f'              await expect(checkbox_{checkbox_name}).toHaveAttribute("required", "");',
                '            }',
                '          }',
                ''
            ])
        lines.extend([
            '        } catch (error) {',
            '          console.log("Error validating checkboxes:", error);',
            '        }',
            '      });',
            '    });',
            ''
        ])
    
    lines.extend([
        '  });',
        ''
    ])
    
    return lines

def get_test_value_for_input(input_type):
    """Get appropriate test value based on input type."""
    test_values = {
        'email': 'test@example.com',
        'password': 'TestPassword123!',
        'tel': '+1234567890',
        'number': '42',
        'search': 'test search',
        'text': 'Test Input'
    }
    return test_values.get(input_type, 'Test Input')

def generate_test_file(test_cases, html_content, input_url=None):
    """Generate a single test file with categorized test cases."""
    url = input_url or extract_url_from_html(html_content)
    if not url:
        url = "http://localhost"
    
    try:
        base_url = '/'.join(url.split('/')[:3])
    except Exception as e:
        logger.warning(f"Error parsing URL {url}: {str(e)}")
        base_url = url
    
    # Parse HTML to find links and form elements
    soup = BeautifulSoup(html_content, 'html.parser')
    links = soup.find_all('a', href=True)
    form_elements = detect_form_elements(soup)
    
    # Start with imports and test configuration
    lines = [
        'import { test, expect } from "@playwright/test";',
        "",
        '// Configure browser context to block cookie popups',
        'test.use({',
        '  actionTimeout: 10000,',
        '  contextOptions: {',
        '    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",',
        '    bypassCSP: true,',
        '  }',
        '});',
        "",
        'test.beforeEach(async ({ context, page }) => {',
        '  // Block cookie and tracking related requests',
        '  await context.route(/(consent|cookie|gdpr|analytics|tracking)/, route => route.abort());',
        '',
        '  // Inject script to disable cookie popups',
        '  await context.addInitScript(() => {',
        '    Object.defineProperty(document, "cookie", {',
        '      get: function() { return ""; },',
        '      set: function() { return true; }',
        '    });',
        '    window.localStorage.clear();',
        '    window.sessionStorage.clear();',
        '  });',
        '',
        '  // Navigate to page',
        f'  await page.goto("{url}");',
        '  await page.waitForLoadState("networkidle");',
        '});',
        "",
        'test.describe("Link Validation Tests", () => {',
        f'  const BASE_URL = "{url}";',
        ""
    ]
    
    # Generate link tests (keeping existing code)
    domain_links = {}
    for link in links:
        href = link.get('href')
        if href and not href.startswith(('#', 'javascript:', 'mailto:', 'tel:')):
            try:
                if href.startswith('/'):
                    href = base_url + href
                elif not href.startswith(('http://', 'https://')):
                    href = base_url + '/' + href
                domain = urlparse(href).netloc
                if domain not in domain_links:
                    domain_links[domain] = set()
                domain_links[domain].add(href)
            except Exception as e:
                logger.warning(f"Error parsing link {href}: {str(e)}")
    
    # Generate link tests (existing code)
    for domain, hrefs in domain_links.items():
        if domain:
            lines.extend([
                f'  test.describe("Links to {domain}", () => {{',
            ])
            for href in hrefs:
                test_name = href.split('/')[-1] or domain
                test_name = normalize_text(test_name)
                lines.extend([
                    f'    test("should validate link to {test_name}", async ({{ page }}) => {{',
                    "      try {",
                    f'        const links = await page.locator(\'a[href*="{test_name}"]\').all();',
                    "        if (links.length > 0) {",
                    "          for (const link of links) {",
                    "            const href = await link.getAttribute('href');",
                    "            expect(href).toBeTruthy();",
                    f'            expect(href).toContain("{test_name}");',
                    "          }",
                    "        } else {",
                    f'          console.log("No links found for {test_name} - this may be expected");',
                    "        }",
                    "      } catch (error) {",
                    f'        console.log("Error validating link {test_name}:", error);',
                    "      }",
                    "    });",
                    ""
                ])
            lines.extend([
                "  });",
                ""
            ])
    
    # Add Form Elements Tests
    lines.extend(generate_form_element_tests(form_elements))
    
    # Add cookie banner tests if detected
    cookie_banner = detect_cookie_banner(html_content)
    if cookie_banner:
        lines.extend([
            '  test.describe("Cookie Banner Tests", () => {',
            '    test("should handle cookie consent", async ({ page }) => {',
            '      try {',
            f'        const banner = await page.locator("{cookie_banner["container"]["selector"]}").first();',
            '        await expect(banner).toBeVisible({ timeout: 5000 });',
            '',
            '        // Try each accept button selector until one works',
            '        for (const selector of cookie_banner["button"]["selectors"]) {',
            '          try {',
            '            const button = await page.locator(selector).first();',
            '            if (await button.isVisible()) {',
            '              await button.click();',
            '              break;',
            '            }',
            '          } catch (error) {',
            '            console.log(`Button not found with selector: ${selector}`);',
            '          }',
            '        }',
            '      } catch (error) {',
            '        console.log("Cookie banner not found or could not be interacted with");',
            '      }',
            '    });',
            '  });'
        ])
    
    # Close the main describe block
    lines.extend([
        "});"
    ])
    
    return '\n'.join(lines)

@app.post("/generate-from-url/")
async def generate_from_url(url: str = Form(...)):
    """Generate test cases from a URL."""
    try:
        # Create necessary directories
        os.makedirs("uploads", exist_ok=True)
        os.makedirs("static", exist_ok=True)
        
        # Save HTML from URL
        file_path, html_content = await save_html_from_url(url)
        
        try:
            # Generate test file with the input URL
            test_file_content = generate_test_file({}, html_content, input_url=url)
            
            # Create a safe filename
            filename = sanitize_url_to_filename(url)
            test_file_path = f"static/test_{filename}.spec.ts"
            
            # Ensure the test file directory exists
            os.makedirs(os.path.dirname(test_file_path), exist_ok=True)
            
            # Write test file
            with open(test_file_path, "w", encoding='utf-8') as f:
                f.write(test_file_content)
            
            return {
                "message": "Test file generated successfully",
                "source_html": file_path,
                "test_file": test_file_path,
                "url": url
            }
        except Exception as e:
            logger.error(f"Error generating test file: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error generating test file: {str(e)}")
    except Exception as e:
        logger.error(f"Error processing URL: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing URL: {str(e)}")

async def save_html_from_url(url: str) -> tuple[str, str]:
    """Fetch HTML from URL and save it."""
    try:
        # Make request with proper headers
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Get HTML content
        html_content = response.text
        
        # Create filename from URL
        filename = sanitize_url_to_filename(url)
        
        # Ensure uploads directory exists
        uploads_dir = "uploads"
        os.makedirs(uploads_dir, exist_ok=True)
        
        # Save HTML file
        file_path = os.path.join(uploads_dir, f"{filename}.html")
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        
        return file_path, html_content
    except requests.RequestException as e:
        logger.error(f"Failed to fetch URL: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {str(e)}")
    except Exception as e:
        logger.error(f"Error saving HTML: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving HTML: {str(e)}")

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Read and decode HTML content
        html_content = (await file.read()).decode('utf-8')
        
        try:
            # Generate test file
            test_file_content = generate_test_file({}, html_content)
            
            # Save test file
            test_file_path = f"static/test_{Path(file.filename).stem}.spec.ts"
            os.makedirs(os.path.dirname(test_file_path), exist_ok=True)
            
            with open(test_file_path, "w") as f:
                f.write(test_file_content)
            
            return {
                "message": "Test file generated successfully",
                "test_file": test_file_path
            }
        except Exception as e:
            logger.error(f"Error generating test file: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error generating test file: {str(e)}")
    except Exception as e:
        logger.error(f"Error processing upload: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing upload: {str(e)}")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Test Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    </head>
    <body class="bg-gray-100 min-h-screen">
        <div id="app" class="container mx-auto px-4 py-8">
            <div class="max-w-3xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-800 mb-4">AI Test Generator</h1>
                    <p class="text-gray-600">Generate Playwright tests from URLs or HTML files</p>
                </div>

                <!-- URL Input Section -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Generate from URL</h2>
                    <form @submit.prevent="generateFromUrl" class="space-y-4">
                        <div class="relative">
                            <input 
                                type="url" 
                                v-model="url" 
                                placeholder="https://example.com/form"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                        </div>
                        <button 
                            type="submit" 
                            :disabled="loading"
                            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                        >
                            <span v-if="!loading">Generate Tests</span>
                            <span v-else class="flex items-center justify-center">
                                <i class="fas fa-spinner fa-spin mr-2"></i> Generating...
                            </span>
                        </button>
                    </form>
                </div>

                <!-- File Upload Section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Upload HTML File</h2>
                    <form @submit.prevent="uploadFile" class="space-y-4">
                        <div class="relative">
                            <input 
                                type="file" 
                                ref="fileInput"
                                accept=".html,.htm"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                        </div>
                        <button 
                            type="submit" 
                            :disabled="loading"
                            class="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                        >
                            <span v-if="!loading">Upload & Generate</span>
                            <span v-else class="flex items-center justify-center">
                                <i class="fas fa-spinner fa-spin mr-2"></i> Processing...
                            </span>
                        </button>
                    </form>
                </div>

                <!-- Result Section -->
                <div v-if="result" class="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Generated Files</h2>
                    <div class="space-y-4">
                        <div v-if="result.source_html" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">Source HTML:</span>
                            <code class="text-sm text-blue-600">{{ result.source_html }}</code>
                        </div>
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">Test File:</span>
                            <code class="text-sm text-green-600">{{ result.test_file }}</code>
                        </div>
                    </div>
                    <div class="mt-6">
                        <h3 class="font-semibold text-gray-800 mb-2">Run Tests:</h3>
                        <div class="bg-gray-800 text-white p-4 rounded-lg">
                            <code>npx playwright test {{ result.test_file }}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            const { createApp } = Vue

            createApp({
                data() {
                    return {
                        url: '',
                        loading: false,
                        result: null
                    }
                },
                methods: {
                    async generateFromUrl() {
                        this.loading = true
                        this.result = null
                        
                        try {
                            const formData = new FormData()
                            formData.append('url', this.url)
                            
                            const response = await fetch('/generate-from-url/', {
                                method: 'POST',
                                body: formData
                            })
                            
                            if (!response.ok) throw new Error('Generation failed')
                            
                            this.result = await response.json()
                        } catch (error) {
                            alert('Failed to generate tests: ' + error.message)
                        } finally {
                            this.loading = false
                        }
                    },
                    async uploadFile() {
                        this.loading = true
                        this.result = null
                        
                        try {
                            const formData = new FormData()
                            formData.append('file', this.$refs.fileInput.files[0])
                            
                            const response = await fetch('/upload/', {
                                method: 'POST',
                                body: formData
                            })
                            
                            if (!response.ok) throw new Error('Upload failed')
                            
                            this.result = await response.json()
                        } catch (error) {
                            alert('Failed to upload file: ' + error.message)
                        } finally {
                            this.loading = false
                        }
                    }
                }
            }).mount('#app')
        </script>
    </body>
    </html>
    """

def camel_case(s):
    """Convert string to camelCase."""
    s = re.sub(r'[^a-zA-Z0-9]', ' ', s)
    words = s.split()
    return words[0].lower() + ''.join(word.title() for word in words[1:])

def sanitize_url_to_filename(url):
    """Convert URL to a safe filename."""
    # Parse URL and get domain and path
    parsed = urlparse(url)
    domain = parsed.netloc
    path = parsed.path.strip('/')
    
    # Replace special characters
    filename = f"{domain}-{path}".replace('/', '-').replace('.', '-')
    
    # Remove any other special characters and convert to lowercase
    filename = ''.join(c.lower() for c in filename if c.isalnum() or c == '-')
    
    # Add timestamp to ensure uniqueness
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    return f"{filename}-{timestamp}"
