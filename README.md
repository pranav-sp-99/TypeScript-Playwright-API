# 🎭 TypeScript Playwright API Testing Framework

Welcome to our awesome API testing playground! This project is like a Swiss Army knife for API testing, built with TypeScript and Playwright. It's not just another testing framework - it's a testing framework with style! 🎨

## 🚀 What's This All About?

This project is a modern API testing framework that helps you test REST APIs with style and confidence. It's built using:
- TypeScript (because we're fancy like that)
- Playwright (for all the heavy lifting)
- Chance.js (for generating random test data)
- Monocart Reporter (for beautiful test reports)

## 🛠️ Tech Stack

- **TypeScript** - Because we love type safety
- **Playwright** - For powerful API testing capabilities
- **Chance.js** - For generating random test data
- **Monocart Reporter** - For beautiful test reports
- **dotenv** - For managing environment variables
- **Mochawesome** - For additional reporting options

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