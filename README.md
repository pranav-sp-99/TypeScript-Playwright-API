# 🎭 TypeScript Playwright API Testing Framework

Welcome to our awesome API testing playground! This project is like a Swiss Army knife for API testing, built with TypeScript and Playwright. It's not just another testing framework - it's a testing framework with style! 🎨

## 🚀 What's This All About?

This project is a modern API testing framework that helps you test REST APIs with style and confidence. It's built using:
- TypeScript (for type safety and maintainability)
- Playwright (for powerful API testing capabilities)
- Chance.js (for smart test data generation)
- Monocart Reporter (for beautiful test reports)

## 🛠️ Tech Stack

### Core Technologies
- **TypeScript** (v5.8.2)
  - Type safety and interface definitions
  - Enhanced code maintainability
  - Modern ECMAScript features
  - Object-oriented programming support

- **Playwright** (v1.51.0)
  - Powerful API testing capabilities
  - Built-in retry mechanisms
  - Parallel test execution
  - Comprehensive test reporting

- **Chance.js** (v1.1.12)
  - Smart random data generation
  - Consistent test data patterns
  - Multiple data type support
  - Localized data generation

- **dotenv** (v16.4.7)
  - Secure environment management
  - Multiple environment support
  - Local development configuration
  - CI/CD integration

### Reporting Tools
- **Monocart Reporter**
  - Beautiful HTML reports
  - Test execution timeline
  - Failure analysis
  - Execution metrics
  - Parallel test reporting

- **Mochawesome**
  - Alternative HTML reports
  - Interactive navigation
  - Custom theming
  - Historical data tracking

## 🎯 Features

- 📝 Type-safe API testing with TypeScript
- 🎲 Random test data generation
- 📊 Beautiful test reports with Monocart
- 🔄 Test parameterization support
- 🎭 API Helper pattern for clean test organization
- 🔐 Environment variable management
- 📈 Multiple reporting options

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/typescript-playwright-api.git
cd typescript-playwright-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with Monocart report
npm run test:report
```

## 📁 Project Structure

```
├── src/
│   ├── fixtures/          # Test fixtures and data generators
│   │   ├── data/         # JSON test data files
│   │   └── helpers/      # Data generation helpers
│   ├── interface/        # TypeScript interfaces
│   └── utils/           # Utility functions and API helper
├── tests/               # Test files
├── .env                # Environment variables
└── playwright.config.ts # Playwright configuration
```

## 🎭 Test Examples

### Using the API Helper
```typescript
test('Create and verify booking', async ({ request }) => {
    const apiHelper = new ApiHelper(request);
    
    // Create booking
    const { bookingData } = await apiHelper.createBooking();
    
    // Get auth token
    const token = await apiHelper.generateToken();
    
    // Update booking
    const { response } = await apiHelper.updateBooking(
        bookingData.bookingid,
        token,
        updatedData
    );
    
    expect(response.status()).toBe(200);
});
```

### Parameterized Tests
```typescript
for (const testCase of testCases) {
    test(`PATCH API - ${testCase.description}`, async ({ request }) => {
        const apiHelper = new ApiHelper(request);
        const { bookingData } = await apiHelper.createBooking();
        const token = await apiHelper.generateToken();
        
        const { patchResponse } = await apiHelper.patchBooking(
            bookingData.bookingid,
            token,
            testCase.fieldsToUpdate
        );
        
        expect(patchResponse.status()).toBe(testCase.expectedStatus);
    });
}
```

## 📊 Test Data Structure

### Test Data Organization
Our test data is organized in JSON files:

```json
{
  "testCases": [
    {
      "description": "Update all fields",
      "fieldsToUpdate": ["all"],
      "expectedStatus": 200
    },
    {
      "description": "Update first name only",
      "fieldsToUpdate": ["firstname"],
      "expectedStatus": 200
    }
  ]
}
```

## 🔧 Troubleshooting Tips

### Common Issues and Solutions

1. **Test Data Not Found**
   ```typescript
   test.skip(!testCases || testCases.length === 0, 'No test cases found');
   ```
   - Check if JSON file exists in the correct location
   - Verify JSON file has valid format
   - Ensure file path is correct in helper classes

2. **Authentication Issues**
   - Verify .env file contains correct credentials
   - Check if token is included in request headers
   - Ensure token hasn't expired

3. **Type Errors**
   - Run `tsc` to check for type issues
   - Ensure interfaces match API response structure
   - Check if all required properties are included

### Debugging Tips

1. Enable Playwright Debug Mode:
   ```bash
   PWDEBUG=1 npm test
   ```

2. Add Debug Logs:
   ```typescript
   console.log('Test case:', testCase);
   console.log('Response:', await response.json());
   ```

## 📊 Reports

We support multiple reporting options:
- Monocart Reports (default)
- Mochawesome Reports

To view reports:
```bash
npm run test:report
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Author

Created with ❤️ by Pranav S P

---

Made with 🎭 Playwright and 💙 TypeScript 