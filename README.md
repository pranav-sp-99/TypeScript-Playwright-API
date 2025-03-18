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
- 🎭 Fixture-based test organization
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
│   ├── fixtures/     # Test fixtures and shared test data
│   │   └── data/     # JSON test data files
│   ├── interface/    # TypeScript interfaces
│   └── utils/        # Utility functions and helpers
├── tests/            # Test files
├── .env              # Environment variables
└── playwright.config.ts  # Playwright configuration
```

## 🎭 Test Examples

### Parameterized Tests with Test Data
```typescript
import { test } from '@playwright/test';
import { PatchDataHelper } from '../src/utils/patch-data-helper';

// Load test data from JSON
const helper = new PatchDataHelper('./src/fixtures/data/patch-test-data.json');
const testCases = helper.getPatchTestCases();

test.describe('Patch Test Suite', () => {
    test.use({ baseURL: process.env.BASE_API_URL });

    for (const testCase of testCases) {
        test(`PATCH API - ${testCase.description}`, async ({ request }) => {
            // Test implementation
            const response = await request.patch(`/booking/${bookingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`
                },
                data: patchData
            });
            
            expect(response.status()).toBe(testCase.expectedStatus);
        });
    }
});
```

### Fixture-based Tests with Token Authentication
```typescript
test('should create and update a booking', async ({ request }) => {
    // Create booking
    const requestBody = BookingRequestBody();
    const createResponse = await request.post('/booking', { 
        data: requestBody 
    });
    
    // Get auth token
    const tokenResponse = await request.post('/auth', {
        data: tokenGenerator()
    });
    const token = (await tokenResponse.json()).token;
    
    // Update booking
    const updateResponse = await request.patch(`/booking/${bookingId}`, {
        headers: { 'Cookie': `token=${token}` },
        data: updateData
    });
});
```

## 📊 Test Data Structure

### Test Data Organization
Our test data is organized in JSON files under `src/fixtures/data/`. Here's an example structure:

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

### Test Data Interfaces
We use TypeScript interfaces to ensure type safety:

```typescript
interface PatchTestCase {
    description: string;
    fieldsToUpdate: string[];
    expectedStatus: number;
}

interface BookingResponse {
    bookingid: number;
    booking: Booking;
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
   - Ensure file path is correct in PatchDataHelper

2. **Authentication Failures**
   - Verify .env file contains correct credentials
   - Check if token is included in request headers
   - Ensure token hasn't expired

3. **Request Failures**
   - Verify baseURL in .env file
   - Check network connectivity
   - Validate request payload format

4. **Type Errors**
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

3. Use Playwright Inspector:
   ```bash
   npm test -- --debug
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