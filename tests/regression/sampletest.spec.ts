import { test, expect } from "@playwright/test";

test.use({
    actionTimeout: 10000,
    contextOptions: {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        bypassCSP: true,
        permissions: ['notifications'],
        acceptDownloads: true,
        storageState: {
            cookies: [],
            origins: []
        }
    }
});

test.beforeEach(async ({ page }) => {
    // Navigate to page first
    await page.goto("https://www.leasingmarkt.de/register", {
        waitUntil: 'networkidle',
        timeout: 30000
    });

    // Wait for page load and ensure it's stable
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Handle cookie consent popup
    await page.evaluate(() => {
        // Remove cookie consent elements
        const selectors = [
            '#usercentrics-root',
            '[class*="consent"]',
            '[id*="consent"]',
            '#as24-cmp-popup',
            '.uc-embedding-accept',
            '[data-testid="uc-accept-all-button"]',
            '[class*="overlay"]',
            '[class*="modal"]',
            '[class*="popup"]',
            '[class*="dialog"]'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                console.log('Removing element:', selector);
                el.remove();
            });
        });

        // Remove fixed positioning and overflow hidden from body and html
        document.body.style.position = 'static';
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        // Clear cookies and storage
        document.cookie.split(';').forEach(cookie => {
            document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
        localStorage.clear();
        sessionStorage.clear();
    });

    // Click any cookie accept buttons if they exist
    try {
        await Promise.race([
            page.click('button:has-text("Alle akzeptieren")'),
            page.click('button:has-text("Accept all")'),
            page.click('[data-testid="uc-accept-all-button"]'),
            page.click('.uc-embedding-accept')
        ]);
    } catch (e) {
        console.log('No cookie buttons found or clickable');
    }
});

test.describe("Registrierung - LeasingMarkt.de Page Test", () => {
    test("should validate input field behavior and constraints", async ({ page }) => {
        try {
            // Log the current page URL to verify we're on the right page
            console.log('Current page URL:', await page.url());
            
            // Wait for any form to be present with a longer timeout
            const form = await page.waitForSelector('form, .registration-form, [class*="register"]', { 
                timeout: 10000,
                state: 'attached'
            });
            
            console.log('Form element found on page');

            // Get a locator for the registration form's email input
            const emailLocator = page.getByPlaceholder('E-Mail-Adresse*');
            
            // Wait for the email input to be visible and enabled
            await emailLocator.waitFor({ state: 'visible', timeout: 10000 });
            console.log('Email input is visible');

            // Test email input validation
            await emailLocator.click();
            await emailLocator.fill("test@example.com");
            await expect(emailLocator).toHaveValue("test@example.com");

            // Clear the field
            await emailLocator.clear();
            await expect(emailLocator).toHaveValue("");

            // Test invalid email
            await emailLocator.fill("invalid-email");
            await emailLocator.evaluate(e => e.blur());
            await page.waitForTimeout(500);

        } catch (e) {
            console.error("Error in test:", e);
            // Take a screenshot on failure
            await page.screenshot({ path: 'test-failure.png', fullPage: true });
            throw e;
        }
    });
});
