import dotenv from 'dotenv'
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { BookingRequestBody } from '../src/utils/post-api-helper.js';
import { Booking, BookingNumberDetails, BookingResponse, Token, TokenResponse } from '../src/interface/booking-api.interface.js';
import { tokenGenerator } from '../src/utils/token-generator.js';
import { log } from 'console';


dotenv.config();


test.describe('Sample test cases for all basic HTTP/HTTPS requests',() => {
    test.use({
        baseURL: process.env.BASE_API_URL,
    })

    test('Post API request - Create Booking', async ({ request }) => {

        const requestBody: Booking = BookingRequestBody()
        const postResponse = await request.post(`/booking`, { data: requestBody })

        const postResponseData = await postResponse.json()
        console.log(`The POST response: ${JSON.stringify(postResponseData, null, 2)}`)

        expect(postResponse.status()).toBe(200)
        expect(postResponse.statusText()).toBe('OK')

        expect(postResponse.headers()['content-type']).toContain('application/json');
        expect(postResponseData.booking).toHaveProperty('firstname')

        expect(postResponseData.booking.firstname).toEqual(requestBody.firstname)
        expect(postResponseData.booking.depositpaid).toEqual(requestBody.depositpaid)
    })

    test('GET API request - Get the Booking', async ({ request }) => {

        const requestBody: Booking = BookingRequestBody()
        const postResponse = await request.post(`/booking`, { data: requestBody })
        const postResponseData: BookingResponse = await postResponse.json()
        expect(postResponse.status()).toBe(200)

        const bookingId: number = postResponseData.bookingid
        const getResponse = await request.get(`/booking/${bookingId}`)

        const getResponseData = await getResponse.json()
        console.log(`The GET response: ${JSON.stringify(getResponseData, null, 2)}`)

        expect(getResponse.status()).toBe(200)
        expect(getResponse.statusText()).toBe('OK')
        expect(getResponse.headers()['content-type']).toContain('application/json')

        expect(getResponseData).toHaveProperty('firstname')
        expect(getResponseData).toHaveProperty('bookingdates')

        expect(getResponseData.firstname).toEqual(requestBody.firstname)
        expect(getResponseData.depositpaid).toEqual(requestBody.depositpaid)
    })

    test('GET API Request with query params - Get the Booking using the values yused in the booking', async ({request}) => {
        
        const requestBody = BookingRequestBody()
        const postResponse = await request.post(`/booking`,{data:requestBody})
        const postResponseData: BookingResponse= await postResponse.json()

        console.log(`The POST response: ${JSON.stringify([postResponseData,null,2])}`)

        expect(postResponse.status()).toBe(200)

        const bookingId :number = postResponseData.bookingid
        const getResponse = await request.get(`/booking`,{params:{
            firstname:requestBody.firstname,
            lastname:requestBody.lastname
        }})
        const getResponseData : BookingNumberDetails[] = await getResponse.json()
        console.log(`The GET reponse: ${JSON.stringify(getResponseData,null,2)}`)

        expect(getResponse.status()).toBe(200)
        const booking = getResponseData.find((booking:BookingNumberDetails) => booking.bookingid===bookingId)
        expect(booking).toBeDefined()
    })

    test('PUT API request - Update the booking details', async ({ request }) => {
        const requestBody: Booking = BookingRequestBody()
        const postResponse = await request.post(`/booking`, { data: requestBody })

        const postResponseData:BookingResponse = await postResponse.json()
        console.log(`The POST response: ${JSON.stringify(postResponseData, null, 2)}`)

        expect(postResponse.status()).toBe(200)
        const bookingId: number = postResponseData.bookingid

        const tokenResponse = await request.post(`/auth`, {
            data: tokenGenerator()
        })
        const tokenResponseData: TokenResponse = await tokenResponse.json()
        console.log(`TOKEN POST: ${JSON.stringify(tokenResponseData, null, 2)}`)
        expect(tokenResponse.status()).toBe(200);

        const token: string = tokenResponseData.token;
        console.log(`Token: ${token}`)

        const putRequestBody = BookingRequestBody();
        const putAPIResponse = await request.put(`/booking/${bookingId}`, {
            headers: {
                "Content-Type":"application/json",
                "Cookie":`token=${token}`
            }, data: putRequestBody,
        });

        expect (putAPIResponse.status()).toBe(200)
    
        const putAPIBody = await putAPIResponse.json()
        console.log(`PUT API response is" ${JSON.stringify(putAPIBody, null, 2)}`)
    
        
        expect (putAPIResponse.statusText()).toBe('OK')
    
        expect (putAPIBody.firstname).toBe(putRequestBody.firstname)
        expect (putAPIBody.lastname).toBe(putRequestBody.lastname)
    });

    test('DELETE API Request - Deleting a booking', async ({request}) => {
        const requestBody: Booking = BookingRequestBody()
        const postResponse = await request.post(`/booking`, { data: requestBody })

        const postResponseData:BookingResponse = await postResponse.json()
        console.log(`The POST response: ${JSON.stringify(postResponseData, null, 2)}`)

        expect(postResponse.status()).toBe(200)
        const bookingId: number = postResponseData.bookingid

        const tokenResponse = await request.post(`/auth`, {
            data: tokenGenerator()
        })
        const tokenResponseData: TokenResponse = await tokenResponse.json()
        console.log(`TOKEN POST: ${JSON.stringify(tokenResponseData, null, 2)}`)
        expect(tokenResponse.status()).toBe(200);

        const token: string = tokenResponseData.token;
        console.log(`Token: ${token}`)

        const deleteResponse = await request.delete(`/booking/${bookingId}`,{
            headers:{
                "Content-Type":"application/json",
                "Cookie":`token=${token}`
            }
        })

        expect (deleteResponse.status()).toBe(201)
        expect (deleteResponse.statusText()).toBe('Created')
    })
})

