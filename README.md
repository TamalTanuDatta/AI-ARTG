# AI-Generated Test Cases (AI-ARTG)

A modern, AI-powered tool that automatically generates Playwright test cases from URLs or HTML files. The tool uses machine learning and advanced pattern recognition to analyze web pages and generate comprehensive test suites with meaningful assertions and interactions.

## Features

### Core Functionality
- **URL-Based Generation**: Generate tests directly from any web URL with intelligent HTML parsing
- **HTML File Upload**: Upload HTML files for test generation with automatic encoding detection
- **Smart Test Categories**: Automatic test categorization by purpose and element type
- **Duplicate Detection**: Intelligent removal of redundant test cases with semantic comparison
- **Modern UI**: Clean, responsive interface with real-time feedback and progress tracking
- **Error Handling**: Robust error handling for network issues, invalid HTML, and timeouts

### Test Categories
- **Link Validation Tests**: Verify all links are valid and accessible
- **Form Element Tests**:
  - Button interaction tests with state validation
  - Input field validation with type-specific test values
  - Checkbox interaction tests with keyboard support
  - Dropdown selection tests with option validation
- **Form Validation Tests**: Check field validation rules and constraints
- **Error Handling Tests**: Verify error message display and validation feedback
- **Element Visibility Tests**: Ensure proper element visibility and presence
- **Cookie Consent Tests**: Handle cookie consent popups automatically

### Generated Tests
- Organized by category for better maintainability
- Clear, descriptive test names and comments
- Proper setup and teardown with context isolation
- URL extraction and normalization
- Comprehensive assertions with meaningful error messages
- Automatic retry logic for flaky elements
- Cross-browser compatibility checks

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/AI-ARTG.git
cd AI-ARTG
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install Playwright:
```bash
npm install @playwright/test
npx playwright install
```

## Usage

### Starting the Server
```bash
python3.9 -m uvicorn TestCreator:app --reload
```

### Generating Tests
Visit `http://localhost:8000` in your browser and either:

1. **From URL**:
   - Paste your target URL in the input field
   - Click "Generate Tests"
   - Tests will be generated with automatic cookie consent handling

2. **From HTML File**:
   - Click "Choose File" to select your HTML file
   - Click "Upload & Generate"
   - Tests will be generated with automatic encoding detection

### Running Tests
```bash
# Run all tests
npx playwright test

# Run specific category
npx playwright test -g "Form Validation"

# Run specific test file
npx playwright test path/to/test.spec.ts

# Run tests in specific browsers
npx playwright test --browser=chromium,firefox,webkit
```

## Project Structure

```
AI-ARTG/
├── TestCreator.py        # FastAPI server and test generation logic
├── html_analyzer_model.py # ML model for HTML analysis and pattern recognition
├── static/              # Generated test files and assets
│   └── tests/           # Test files organized by domain and timestamp
├── uploads/             # Temporary storage for uploaded HTML files
└── playwright.config.ts # Playwright configuration with browser settings
```

## Test Generation Features

### Form Element Detection
- Intelligent label detection using multiple strategies:
  - Explicit label associations via 'for' attribute
  - Implicit label associations via parent elements
  - ARIA label attributes
  - Placeholder text fallback

### Button Detection
- Support for various button types:
  - Standard button elements
  - Input buttons
  - Submit buttons
  - Image buttons
- Text extraction from multiple sources:
  - Button text content
  - Value attribute
  - ARIA labels
  - Title attributes

### Input Field Handling
- Type-specific test values:
  - Email addresses for email fields
  - Strong passwords for password fields
  - Phone numbers for tel inputs
  - Numeric values for number inputs
- Required field validation
- Input constraints testing

### Error Prevention
- Duplicate variable name handling
- Special character normalization
- Cross-browser compatibility checks
- Proper error message logging

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
