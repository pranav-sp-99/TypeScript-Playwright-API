import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { PatchDataHelper } from '../src/fixtures/patch-data-helper';
import { Booking, BookingResponse } from '../src/interface/booking-api.interface';
import { ApiHelper } from '../src/utils/api-helper';

dotenv.config()

// Load test data
const helper = new PatchDataHelper('./src/fixtures/data/patch-test-data.json');
const testCases = helper.getPatchTestCases();

test.describe('Patch Test Suite', () => {

    let apiHelper : ApiHelper

    test.use({
        baseURL: process.env.BASE_API_URL
    });

    test.beforeEach(async ({ request }) => {
        apiHelper = new ApiHelper(request)
        test.skip(!testCases || testCases.length === 0, 'No test cases found in patch-test-data.json');
    });

    for (const testCase of testCases) {
        test(`PATCH API - ${testCase.description}`, async ({ request }) => {
            // Create a new booking
            const {bookingData} = await apiHelper.createBooking()
            const bookingId = bookingData.bookingid;

            // Get auth token
            const token = await apiHelper.generateToken()

            // Generate patch data based on test case
            const {patchResponse, responseData, patchData} = await apiHelper.patchBooking(bookingId, token, testCase.fieldsToUpdate)

            // Verify response
            expect(patchResponse.status()).toBe(testCase.expectedStatus);

            if (patchResponse.status() === 200) {
                // Type assertion to ensure TypeScript knows responseData is a Booking
                const bookingResponse = responseData as Booking;
                
                // Verify updated fields
                for (const field of testCase.fieldsToUpdate) {
                    if (field === 'all') {
                        expect(bookingResponse).toHaveProperty('firstname');
                        expect(bookingResponse).toHaveProperty('lastname');
                        expect(bookingResponse).toHaveProperty('totalprice');
                        expect(bookingResponse).toHaveProperty('depositpaid');
                        expect(bookingResponse).toHaveProperty('bookingdates');
                        expect(bookingResponse.bookingdates).toHaveProperty('checkin');
                        expect(bookingResponse.bookingdates).toHaveProperty('checkout');
                        expect(bookingResponse).toHaveProperty('additionalneeds');
                    } else if (field === 'bookingdates') {
                        expect(bookingResponse).toHaveProperty('bookingdates');
                        expect(bookingResponse.bookingdates).toHaveProperty('checkin');
                        expect(bookingResponse.bookingdates).toHaveProperty('checkout');
                    } else if (field === 'bookingdates.checkin') {
                        expect(bookingResponse).toHaveProperty('bookingdates');
                        expect(bookingResponse.bookingdates).toHaveProperty('checkin');
                    } else if (field === 'bookingdates.checkout') {
                        expect(bookingResponse).toHaveProperty('bookingdates');
                        expect(bookingResponse.bookingdates).toHaveProperty('checkout');
                    } else {
                        expect(bookingResponse).toHaveProperty(field);
                    }
                }
            }
        });
    }
});