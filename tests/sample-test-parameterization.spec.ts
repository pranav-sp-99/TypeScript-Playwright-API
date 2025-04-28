import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { PatchDataHelper } from "../src/test-data/patch-data-helper";
import {
  Booking,
  BookingResponse,
} from "../src/interface/booking-api.interface";
import { ApiHelper } from "../src/utils/api-helper";

// Load environment variables
dotenv.config();

// Initialize test data from JSON file
const helper = new PatchDataHelper("./src/fixtures/data/patch-test-data.json");
const testCases = helper.getPatchTestCases();

test.describe("Patch Test Suite", () => {
  let apiHelper: ApiHelper;

  // Configure base URL for all tests in this suite
  test.use({
    baseURL: process.env.BASE_API_URL,
  });

  // Setup before each test
  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
    // Skip all tests if no test cases are found
    test.skip(
      !testCases || testCases.length === 0,
      "No test cases found in patch-test-data.json"
    );
  });

  // Generate parameterized tests for each test case
  for (const testCase of testCases) {
    test(`PATCH API - ${testCase.description}`, async () => {
      // Create a new booking for testing
      const { bookingData } = await apiHelper.createBooking();
      const bookingId = bookingData.bookingid;

      // Get authentication token
      const token = await apiHelper.generateToken();

      // Send PATCH request with test case data
      const { patchResponse, responseData } = await apiHelper.patchBooking(
        bookingId,
        token,
        testCase.fieldsToUpdate
      );

      // Verify response status matches expected status
      expect(patchResponse.status()).toBe(testCase.expectedStatus);

      // Additional verifications for successful responses
      if (patchResponse.status() === 200) {
        // Type assertion for response data
        const bookingResponse = responseData as Booking;

        // Verify each updated field exists in response
        for (const field of testCase.fieldsToUpdate) {
          if (field === "all") {
            // Verify all fields exist when updating everything
            expect(bookingResponse).toHaveProperty("firstname");
            expect(bookingResponse).toHaveProperty("lastname");
            expect(bookingResponse).toHaveProperty("totalprice");
            expect(bookingResponse).toHaveProperty("depositpaid");
            expect(bookingResponse).toHaveProperty("bookingdates");
            expect(bookingResponse.bookingdates).toHaveProperty("checkin");
            expect(bookingResponse.bookingdates).toHaveProperty("checkout");
            expect(bookingResponse).toHaveProperty("additionalneeds");
          } else if (field === "bookingdates") {
            // Verify both booking dates exist
            expect(bookingResponse).toHaveProperty("bookingdates");
            expect(bookingResponse.bookingdates).toHaveProperty("checkin");
            expect(bookingResponse.bookingdates).toHaveProperty("checkout");
          } else if (field === "bookingdates.checkin") {
            // Verify checkin date exists
            expect(bookingResponse).toHaveProperty("bookingdates");
            expect(bookingResponse.bookingdates).toHaveProperty("checkin");
          } else if (field === "bookingdates.checkout") {
            // Verify checkout date exists
            expect(bookingResponse).toHaveProperty("bookingdates");
            expect(bookingResponse.bookingdates).toHaveProperty("checkout");
          } else {
            // Verify individual field exists
            expect(bookingResponse).toHaveProperty(field);
          }
        }
      }
    });
  }
});
