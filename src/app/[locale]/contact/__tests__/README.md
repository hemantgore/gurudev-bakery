# Contact Form Tests

## Overview
Comprehensive test suite for the Contact Form component and captcha functionality.

## Test Files

### 1. `contact.test.tsx`
Integration tests for the Contact Page component covering:
- **Form Rendering**: All form fields, buttons, and contact information display correctly
- **Captcha Functionality**: 
  - Captcha generation on mount
  - Validation of correct answers
  - Error handling for incorrect answers
  - Refresh functionality to generate new questions
- **Form Validation**:
  - Name: minimum 2 characters
  - Email: valid email format
  - Phone: +91 format with 10 digits
  - Message: minimum 10 characters
  - Captcha: required field
- **Form Submission**:
  - Successful submission with valid data
  - Form reset after submission
  - Button disabled state during submission
  - Success message display

### 2. `captcha.test.ts`
Unit tests for captcha generation logic:
- **Captcha Generation**:
  - Returns question and answer
  - Uses + or - operators
  - Numbers between 1 and 10
  - Correct calculations for addition and subtraction
  - Never produces negative results
  - Proper question formatting
- **Captcha Validation**:
  - Validates correct integer answers
  - Rejects incorrect answers
  - Handles non-numeric input
  - Handles empty input
  - Handles decimal input
  - Rejects negative answers when inappropriate

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Watch mode (default)
Tests run in watch mode by default with Vitest, automatically re-running when files change.

## Test Coverage

The test suite ensures:
✅ Captcha correctly generates math problems (addition and subtraction)
✅ Captcha validation works properly - matching question to answer
✅ All form validations work as expected
✅ Form submission flow works correctly
✅ User feedback (success/error messages) displays properly
✅ Edge cases are handled (empty inputs, invalid formats, etc.)

## Key Validations Verified

### Captcha Security
- **Question Generation**: Random numbers 1-10 with + or - operator
- **Answer Validation**: Exact match required between calculated answer and user input
- **No Negatives**: Subtraction always uses larger - smaller to ensure positive results
- **Refresh Capability**: Users can generate new questions

### Form Validations
- **Name**: Must be at least 2 characters
- **Email**: Must be valid email format (e.g., user@domain.com)
- **Phone**: Must match pattern +91 XXXXXXXXXX (10 digits after +91)
- **Message**: Must be at least 10 characters
- **Captcha**: Must be filled and correct

## Example Test Cases

### Valid Submission
```typescript
Name: "John Doe"
Email: "john@example.com"
Phone: "+91 1234567890"
Message: "I would like to order a cake"
Captcha: Correct answer to displayed question
Result: ✅ Success message shown, form reset
```

### Invalid Captcha
```typescript
Captcha Question: "7 + 3" (Answer: 10)
User Input: "5"
Result: ❌ Error: "Incorrect answer. Please try again."
```

### Invalid Phone Format
```typescript
Phone: "1234567890" (missing +91)
Result: ❌ Error: "Phone must be in format: +91 XXXXXXXXXX"
```

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline:

```bash
# Run tests in CI mode (no watch)
npm test -- --run

# Generate coverage report
npm run test:coverage
```

## Troubleshooting

If tests fail:
1. Check that all dependencies are installed: `npm install`
2. Verify the captcha question format matches: `\d+ [\+\-] \d+`
3. Ensure translations are properly mocked
4. Check that form validation messages match translation keys

## Future Improvements

Potential test additions:
- [ ] Test form submission to actual API endpoint
- [ ] Test accessibility features
- [ ] Test mobile responsive behavior
- [ ] Test dark mode styling
- [ ] Test internationalization (English/Marathi)
- [ ] E2E tests with Playwright/Cypress
