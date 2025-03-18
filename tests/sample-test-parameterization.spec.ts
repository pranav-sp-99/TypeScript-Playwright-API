import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { PatchDataHelper } from '../src/utils/patch-data-helper';
import { Booking, BookingResponse, TokenResponse, PatchTestCase } from '../src/interface/booking-api.interface';
import { BookingRequestBody } from '../src/utils/post-api-helper';
import { tokenGenerator } from '../src/utils/token-generator';
import { createPatchRequest } from '../src/utils/patch-data-helper';

dotenv.config()

// Load test data
const helper = new PatchDataHelper('./src/test-data/patch-test-data.json');
const testCases = helper.getPatchTestCases();

test.describe('Patch Test Suite', () => {
    test.use({
        baseURL: process.env.BASE_API_URL
    });

    test.beforeEach(async ({ request }) => {
        test.skip(!testCases || testCases.length === 0, 'No test cases found in patch-test-data.json');
    });

    for (const testCase of testCases) {
        test(`PATCH API - ${testCase.description}`, async ({ request }) => {
            // Create a new booking
            const requestBody: Booking = BookingRequestBody();
            const postResponse = await request.post('/booking', { 
                data: requestBody 
            });
            
            const postResponseData: BookingResponse = await postResponse.json();
            console.log(`The POST response: ${JSON.stringify(postResponseData, null, 2)}`);

            const bookingId = postResponseData.bookingid;

            // Get auth token
            const tokenResponse = await request.post('/auth', {
                data: tokenGenerator()
            });
            const tokenResponseData: TokenResponse = await tokenResponse.json();
            const token: string = tokenResponseData.token;

            // Generate patch data based on test case
            const patchData = createPatchRequest(testCase.fieldsToUpdate);
            console.log('Test case:', testCase);
            console.log('Patch data:', patchData);

            // Make PATCH request
            const response = await request.patch(`/booking/${bookingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`
                },
                data: patchData
            });

            // Verify response
            expect(response.status()).toBe(testCase.expectedStatus);

            if (response.status() === 200) {
                const responseBody = await response.json();
                
                // Verify updated fields
                for (const field of testCase.fieldsToUpdate) {
                    if (field === 'all') {
                        expect(responseBody).toHaveProperty('firstname');
                        expect(responseBody).toHaveProperty('lastname');
                        expect(responseBody).toHaveProperty('totalprice');
                        expect(responseBody).toHaveProperty('depositpaid');
                        expect(responseBody).toHaveProperty('bookingdates');
                        expect(responseBody.bookingdates).toHaveProperty('checkin');
                        expect(responseBody.bookingdates).toHaveProperty('checkout');
                        expect(responseBody).toHaveProperty('additionalneeds');
                    } else if (field === 'bookingdates') {
                        expect(responseBody).toHaveProperty('bookingdates');
                        expect(responseBody.bookingdates).toHaveProperty('checkin');
                        expect(responseBody.bookingdates).toHaveProperty('checkout');
                    } else if (field === 'bookingdates.checkin') {
                        expect(responseBody).toHaveProperty('bookingdates');
                        expect(responseBody.bookingdates).toHaveProperty('checkin');
                    } else if (field === 'bookingdates.checkout') {
                        expect(responseBody).toHaveProperty('bookingdates');
                        expect(responseBody.bookingdates).toHaveProperty('checkout');
                    } else {
                        expect(responseBody).toHaveProperty(field);
                    }
                }
            }
        });
    }
});