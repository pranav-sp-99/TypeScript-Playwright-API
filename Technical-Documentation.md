# Technical Documentation: TypeScript Playwright API Testing Framework

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Technical Stack](#technical-stack)
5. [Configuration Files](#configuration-files)
6. [Source Code Organization](#source-code-organization)
7. [Test Implementation](#test-implementation)
8. [CI/CD Pipeline](#cicd-pipeline)
9. [Reporting](#reporting)
10. [Best Practices](#best-practices)
11. [Troubleshooting Guide](#troubleshooting-guide)

## Introduction

This document provides a comprehensive technical overview of the TypeScript Playwright API Testing Framework. The framework is designed for robust API testing using modern tools and practices, with a focus on type safety, maintainability, and efficient test execution.

## Architecture Overview

The framework follows a modular architecture with clear separation of concerns:

```
TypeScript Playwright API Testing Framework
├── Test Execution Layer (Playwright)
├── Data Management Layer (JSON + Fixtures)
├── Utility Layer (Helper Functions)
├── Type System Layer (TypeScript Interfaces)
├── Reporting Layer (Monocart + Mochawesome)
└── CI/CD Layer (GitHub Actions)
```

### Key Components Interaction
1. Test files use Playwright's test runner
2. Test data is managed through JSON files and fixtures
3. Helper functions provide reusable functionality
4. TypeScript ensures type safety
5. Reports are generated after test execution
6. GitHub Actions automate the testing pipeline

## Project Structure

```
project-root/
├── .github/
│   └── workflows/          # CI/CD configuration
│       └── playwright.yml  # GitHub Actions workflow
├── src/
│   ├── fixtures/          # Test fixtures and data
│   ├── interface/         # TypeScript interfaces
│   └── utils/            # Helper functions
├── tests/                # Test implementation
├── .env                  # Environment configuration
├── playwright.config.ts  # Playwright configuration
└── tsconfig.json        # TypeScript configuration
```

## Technical Stack

### Core Technologies
1. **TypeScript** (v5.8.2)
   - Provides static typing
   - Enhances code maintainability
   - Enables better IDE support

2. **Playwright** (v1.51.0)
   - Handles API requests
   - Provides test runner
   - Manages test fixtures

3. **Chance.js** (v1.1.12)
   - Generates random test data
   - Ensures test data variety
   - Supports multiple data types

### Reporting Tools
1. **Monocart Reporter**
   - Primary reporting tool
   - Provides detailed test execution reports
   - Supports visual test results

2. **Mochawesome**
   - Alternative reporting option
   - HTML report generation
   - Test execution statistics

## Configuration Files

### playwright.config.ts
```typescript
// Key configuration options
{
  testDir: './tests',
  timeout: 30000,
  reporter: [['monocart-reporter', {
    name: 'My Test Report',
    outputFile: './monocart-report/index.html'
  }]]
}
```

### tsconfig.json
```typescript
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "strict": true
  }
}
```

### .env
```plaintext
BASE_API_URL=https://your-api-endpoint.com
```

## Source Code Organization

### 1. Interface Directory (src/interface/)
Contains TypeScript interfaces defining data structures:
```typescript
// Example: booking-api.interface.ts
interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
        checkin: string;
        checkout: string;
    };
    additionalneeds?: string;
}
```

### 2. Utils Directory (src/utils/)
Houses helper functions and utilities:
```typescript
// Example: token-generator.ts
export const tokenGenerator = () => ({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
});
```

### 3. Fixtures Directory (src/fixtures/)
Manages test data and fixtures:
```typescript
// Example: patch-test-fixture.ts
export const patchTestFixture = async ({ request }) => {
    // Fixture implementation
};
```

## Test Implementation

### Test File Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('API Test Suite', () => {
    test.beforeEach(async ({ request }) => {
        // Setup code
    });

    test('test case description', async ({ request }) => {
        // Test implementation
    });
});
```

### Test Data Management
1. JSON Test Data Files
```json
{
  "testCases": [
    {
      "description": "Test case description",
      "input": { },
      "expectedOutput": { }
    }
  ]
}
```

2. Data Helpers
```typescript
export class TestDataHelper {
    constructor(private filePath: string) {}
    
    getTestCases() {
        // Implementation
    }
}
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Run Playwright tests
        run: npm test
```

### Pipeline Stages
1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Execute tests
5. Generate reports
6. Upload artifacts

## Reporting

### 1. Monocart Reporter
- HTML report generation
- Test execution timeline
- Detailed error reporting
- Screenshot capture support

### 2. Mochawesome Reporter
- Alternative HTML reports
- Test statistics
- Failure analysis
- Custom report styling

## Best Practices

### 1. Code Organization
- Follow consistent file naming conventions
- Group related tests in test suites
- Maintain separate utility functions
- Use TypeScript interfaces for data structures

### 2. Test Data Management
- Use JSON files for test data
- Implement data helpers
- Maintain fixture isolation
- Use environment variables for sensitive data

### 3. Error Handling
```typescript
try {
    const response = await request.post('/endpoint');
    expect(response.status()).toBe(200);
} catch (error) {
    console.error('Request failed:', error);
    throw error;
}
```

### 4. Logging and Debugging
```typescript
test.beforeEach(async ({ request }, testInfo) => {
    console.log(`Running test: ${testInfo.title}`);
});
```

## Troubleshooting Guide

### Common Issues

1. **Test Data Loading Failures**
   - Verify file paths
   - Check JSON syntax
   - Validate data structure

2. **Authentication Issues**
   - Check environment variables
   - Verify token generation
   - Validate request headers

3. **Type Errors**
   - Run `tsc` for type checking
   - Update interfaces if needed
   - Check import statements

### Debugging Tools

1. **Playwright Debug Mode**
```bash
PWDEBUG=1 npm test
```

2. **VSCode Debug Configuration**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "program": "${workspaceFolder}/node_modules/@playwright/test/lib/cli/cli.js",
  "args": ["test"],
  "console": "integratedTerminal"
}
```

---

## Additional Resources

1. [Playwright Documentation](https://playwright.dev/docs/intro)
2. [TypeScript Handbook](https://www.typescriptlang.org/docs/)
3. [Chance.js Documentation](https://chancejs.com/)
4. [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

 