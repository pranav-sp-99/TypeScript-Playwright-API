import dotenv from 'dotenv'
import { test, expect, request } from '@playwright/test';
import { BookingRequestBody } from '../src/fixtures/post-data-helper.js';
import { ApiHelper } from '../src/utils/api-helper.js';



dotenv.config();


test.describe('Sample test cases for all basic HTTP/HTTPS requests',() => {
    let apiHelper : ApiHelper

    test.beforeEach(async ({request})=>{
        apiHelper = new ApiHelper(request)
    })

    test.use({
        baseURL: process.env.BASE_API_URL,
    })

    test('Post API request - Create Booking', async ({ request }) => {

        const {postResponse,bookingData,postRequestBody} = await apiHelper.createBooking()

        //Assertions
        expect(postResponse.status()).toBe(200)
        expect(postResponse.statusText()).toBe('OK')
        expect(postResponse.headers()['content-type']).toContain('application/json');
        expect(bookingData.booking).toHaveProperty('firstname')
        expect(bookingData.booking.firstname).toEqual(postRequestBody.firstname)
        expect(bookingData.booking.depositpaid).toEqual(postRequestBody.depositpaid)
    })

    test('GET API request - Get the Booking', async ({ request }) => {

        const {bookingData,postRequestBody} = await apiHelper.createBooking()
        const {response,responseData} = await apiHelper.getBooking(bookingData.bookingid)

        //Assertions
        expect(response.status()).toBe(200)
        expect(response.statusText()).toBe('OK')
        expect(response.headers()['content-type']).toContain('application/json')
        expect(responseData).toHaveProperty('firstname')
        expect(responseData).toHaveProperty('bookingdates')
        expect(responseData.firstname).toEqual(postRequestBody.firstname)
        expect(responseData.depositpaid).toEqual(postRequestBody.depositpaid)
    })

    test('GET API Request with query params - Get the Booking using the values used in the booking', async ({request}) => {
        const {bookingData,postRequestBody} = await apiHelper.createBooking()
        const {response, responseData} = await apiHelper.getBookingByName(postRequestBody.firstname, postRequestBody.lastname)

        // Assertions
        expect(response.status()).toBe(200)
        const booking = responseData.find((booking) => booking.bookingid === bookingData.bookingid)
        expect(booking).toBeDefined()
    })

    test('PUT API request - Update the booking details', async ({ request }) => {
        
        const {bookingData} = await apiHelper.createBooking()
        const token = await apiHelper.generateToken()
        
        const {response, updatedData,putRequestBody} = await apiHelper.updateBooking(bookingData.bookingid, token, BookingRequestBody())
        
        expect (response.statusText()).toBe('OK')
        expect (updatedData.firstname).toBe(putRequestBody.firstname)
        expect (updatedData.lastname).toBe(putRequestBody.lastname)
    });

    test('DELETE API Request - Deleting a booking', async ({request}) => {
        
        const{bookingData} = await apiHelper.createBooking()
        const token = await apiHelper.generateToken()
        const {response} = await apiHelper.deleteBooking(bookingData.bookingid , token)

        expect (response.status()).toBe(201)
        expect (response.statusText()).toBe('Created')
    })
})

