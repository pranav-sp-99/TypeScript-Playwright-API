# Technical Documentation: TypeScript Playwright API Testing Framework

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Technical Stack](#technical-stack)
5. [Core Components](#core-components)
6. [Test Implementation](#test-implementation)
7. [Best Practices](#best-practices)
8. [Troubleshooting Guide](#troubleshooting-guide)

## Introduction

This document provides a comprehensive technical overview of the TypeScript Playwright API Testing Framework. The framework is designed for robust API testing using modern tools and practices, with a focus on type safety, maintainability, and efficient test execution.

## Architecture Overview

The framework follows a modular architecture with clear separation of concerns:

```
TypeScript Playwright API Testing Framework
├── API Helper Layer (Reusable API Methods)
├── Test Data Management Layer (JSON + Fixtures)
├── Type System Layer (TypeScript Interfaces)
├── Test Execution Layer (Playwright)
├── Reporting Layer (Monocart + Mochawesome)
└── CI/CD Layer (GitHub Actions)
```

## Project Structure

```
project-root/
├── src/
│   ├── fixtures/
│   │   ├── data/              # JSON test data files
│   │   ├── post-data-helper.ts   # POST request data generator
│   │   ├── patch-data-helper.ts  # PATCH request data generator
│   │   └── token-generator.ts    # Authentication token generator
│   ├── interface/
│   │   └── booking-api.interface.ts  # TypeScript interfaces
│   └── utils/
│       └── api-helper.ts      # Core API helper class
├── tests/
│   ├── example.spec.ts        # Basic API test examples
│   └── sample-test-parameterization.spec.ts  # Parameterized tests
└── config files...
```

## Technical Stack

### Core Technologies

1. **TypeScript** (v5.8.2)
   - Provides static typing and interface definitions
   - Enhances code maintainability through type safety
   - Enables better IDE support and code navigation
   - Supports modern ECMAScript features
   - Facilitates object-oriented programming patterns

2. **Playwright** (v1.51.0)
   - Handles API requests with built-in retry mechanisms
   - Provides powerful test runner with parallel execution
   - Manages test fixtures and test isolation
   - Supports multiple assertion styles
   - Offers comprehensive test reporting capabilities

3. **Chance.js** (v1.1.12)
   - Generates random test data with consistent patterns
   - Ensures test data variety and edge cases
   - Supports multiple data types and formats
   - Provides localized data generation
   - Enables repeatable random data through seeding

4. **dotenv** (v16.4.7)
   - Manages environment variables securely
   - Supports multiple environment configurations
   - Enables easy local development setup
   - Prevents sensitive data exposure
   - Facilitates CI/CD pipeline configuration

### Reporting Tools

1. **Monocart Reporter**
   - Primary reporting tool with HTML output
   - Provides detailed test execution reports
   - Supports visual test results and screenshots
   - Offers timeline view of test execution
   - Includes failure analysis and retry information
   - Features customizable report styling
   - Supports parallel execution reporting
   - Provides test execution metrics and trends

2. **Mochawesome**
   - Alternative HTML report generation
   - Test execution statistics and metrics
   - Failure screenshots and error details
   - Interactive report navigation
   - Support for test filtering and search
   - Custom report theming options
   - Integration with CI/CD pipelines
   - Historical test execution data

### Development Tools

1. **TypeScript Compiler** (v5.8.2)
   - Static type checking
   - Code transpilation
   - Modern JavaScript features
   - Declaration file generation
   - Project configuration management

2. **Node.js** (v14+)
   - Runtime environment
   - Package management
   - Dependency resolution
   - Script execution
   - Environment management

## Core Components

### 1. ApiHelper Class
The `ApiHelper` class serves as the main interface for API interactions:

```typescript
export class ApiHelper {
    constructor(private request: APIRequestContext) {}

    // Core API Methods
    async createBooking(postRequestBody?: Booking): Promise<BookingResponse>
    async getBooking(bookingId: number): Promise<Booking>
    async updateBooking(bookingId: number, token: string, putRequestBody?: Booking)
    async patchBooking(bookingId: number, token: string, fieldsToUpdate: Fieldname[])
    async deleteBooking(bookingId: number, token: string)
    async generateToken(): Promise<string>
}
```

### 2. Interface Definitions
```typescript
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

interface BookingResponse {
    bookingid: number;
    booking: Booking;
}
```

### 3. Test Data Management
```typescript
// Example test data structure
{
  "testCases": [
    {
      "description": "Update specific fields",
      "fieldsToUpdate": ["firstname", "lastname"],
      "expectedStatus": 200
    }
  ]
}
```

## Test Implementation

### 1. Basic API Tests
```typescript
test('POST API request - Create Booking', async ({ request }) => {
    const {postResponse, bookingData} = await apiHelper.createBooking();
    expect(postResponse.status()).toBe(200);
});
```

### 2. Parameterized Tests
```typescript
for (const testCase of testCases) {
    test(`PATCH API - ${testCase.description}`, async ({ request }) => {
        const {bookingData} = await apiHelper.createBooking();
        const token = await apiHelper.generateToken();
        const {patchResponse} = await apiHelper.patchBooking(
            bookingData.bookingid, 
            token, 
            testCase.fieldsToUpdate
        );
    });
}
```

## Best Practices

### 1. API Helper Pattern
- Centralize API calls in the ApiHelper class
- Use strong typing for request/response data
- Implement reusable methods for common operations

```typescript
// Example of reusable method
async generateToken(): Promise<string> {
    const response = await this.request.post('/auth', {
        data: tokenGenerator()
    });
    return (await response.json()).token;
}
```

### 2. Test Data Organization
- Use JSON files for test data
- Implement data helpers for data generation
- Maintain fixture isolation
- Use TypeScript interfaces for type safety

### 3. Error Handling
```typescript
async patchBooking(bookingId: number, token: string, fieldsToUpdate: Fieldname[]): Promise<{
    patchResponse: any,
    responseData: Booking,
    patchData: Partial<Booking>
}> {
    let responseData = {} as Booking;
    if(patchResponse.status() === 200){
        responseData = await patchResponse.json();
    }
    return {patchResponse, responseData, patchData};
}
```

### 4. Type Safety
- Use TypeScript interfaces for all data structures
- Implement proper type assertions
- Utilize generic types where appropriate

## Troubleshooting Guide

### Common Issues

1. **Type Errors**
   ```typescript
   // Incorrect
   const responseData = await response.json();
   
   // Correct
   const responseData = await response.json() as Booking;
   ```

2. **API Response Handling**
   ```typescript
   // Always check status before accessing response
   if (response.status() === 200) {
       const data = await response.json();
   }
   ```

3. **Test Data Issues**
   - Verify JSON file paths
   - Check data structure matches interfaces
   - Ensure proper type assertions

## Additional Resources

1. [Playwright API Testing Guide](https://playwright.dev/docs/api-testing)
2. [TypeScript Documentation](https://www.typescriptlang.org/docs/)
3. [Monocart Reporter Documentation](https://github.com/cenfun/monocart-reporter)

---

*Last Updated: March 2025*

 