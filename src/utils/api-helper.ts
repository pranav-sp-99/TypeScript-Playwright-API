import { APIRequestContext, APIResponse } from "@playwright/test";
import {
  Booking,
  BookingResponse,
  TokenResponse,
  BookingNumberDetails,
  Fieldname,
} from "../interface/booking-api.interface";
import { BookingRequestBody } from "../test-data/post-data-helper";
import { tokenGenerator } from "../test-data/token-generator";
import { createPatchRequest } from "../test-data/patch-data-helper";

// Main API helper class that handles all API interactions with the booking system
export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Creates a new booking with optional custom request body or generates random data if not provided
  async createBooking(
    postRequestBody: Booking = BookingRequestBody()
  ): Promise<{
    postResponse: APIResponse;
    bookingData: BookingResponse;
    postRequestBody: Booking;
  }> {
    const postResponse = await this.request.post(`/booking`, {
      data: postRequestBody,
    });
    const bookingData = await postResponse.json();
    // Log response for debugging purposes
    console.log(`POST response: ${JSON.stringify(bookingData, null, 2)}`);
    return { postResponse, bookingData, postRequestBody };
  }

  // Retrieves a specific booking by its ID
  async getBooking(
    bookingId: number
  ): Promise<{ response: any; responseData: Booking }> {
    const response = await this.request.get(`/booking/${bookingId}`);
    const responseData = await response.json();
    console.log(`GET reponse: ${JSON.stringify(responseData, null, 2)}`);
    return { response, responseData };
  }

  // Searches for bookings by firstname and lastname using query parameters
  async getBookingByName(
    firstname: string,
    lastname: string
  ): Promise<{ response: any; responseData: BookingNumberDetails[] }> {
    const response = await this.request.get(`/booking`, {
      params: { firstname, lastname },
    });
    const responseData = await response.json();
    console.log(`POST response: ${JSON.stringify(responseData, null, 2)}`);
    return { response, responseData };
  }

  // Generates an authentication token for protected endpoints
  async generateToken(): Promise<string> {
    const response = await this.request.post(`/auth`, {
      data: tokenGenerator(),
    });
    const tokenData: TokenResponse = await response.json();
    console.log(`TOKEN POST: ${JSON.stringify(tokenData, null, 2)}`);
    return tokenData.token;
  }

  // Updates all fields of a booking using PUT request
  async updateBooking(
    bookingId: number,
    token: string,
    putRequestBody: Booking = BookingRequestBody()
  ): Promise<{
    response: APIResponse;
    updatedData: Booking;
    putRequestBody: Booking;
  }> {
    const response = await this.request.put(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      data: putRequestBody,
    });
    const updatedData = await response.json();
    console.log(`PUT response: ${JSON.stringify(updatedData, null, 2)}`);
    return { response, updatedData, putRequestBody };
  }

  // Deletes a booking by its ID
  async deleteBooking(
    bookingId: number,
    token: string
  ): Promise<{ response: APIResponse }> {
    const response = await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    return { response };
  }

  // Updates specific fields of a booking using PATCH request
  async patchBooking(
    bookingId: number,
    token: string,
    fieldsToUpdate: Fieldname[] = []
  ): Promise<{
    patchResponse: APIResponse;
    responseData: Booking;
    patchData: Partial<Booking>;
  }> {
    // Generate patch data based on fields to update
    const patchData = createPatchRequest(fieldsToUpdate);
    console.log(`PATCH data: ${JSON.stringify(patchData, null, 2)}`);

    const patchResponse = await this.request.patch(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      data: patchData,
    });

    // Initialize empty response data object with type assertion
    let responseData = {} as Booking;
    if (patchResponse.status() === 200) {
      responseData = await patchResponse.json();
      console.log(`PATCH response: ${JSON.stringify(responseData, null, 2)}`);
    }
    return { patchResponse, responseData, patchData };
  }
}
