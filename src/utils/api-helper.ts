import { APIRequestContext } from "@playwright/test";
import { Booking, BookingResponse, TokenResponse, BookingNumberDetails, Fieldname } from "../interface/booking-api.interface";
import { BookingRequestBody } from "../fixtures/post-data-helper";
import { tokenGenerator } from "../fixtures/token-generator";
import { createPatchRequest } from "../fixtures/patch-data-helper";


export class ApiHelper{
    private request: APIRequestContext

    constructor(request:APIRequestContext){
        this.request = request
    }

    async createBooking(postRequestBody:Booking = BookingRequestBody()):Promise<{postResponse:any,bookingData:BookingResponse,postRequestBody:Booking}>{
        const postResponse = await this.request.post(`/booking`,{data:postRequestBody})
        const bookingData = await postResponse.json()
        console.log(`POST response: ${JSON.stringify(bookingData,null,2)}`)
    return {postResponse,bookingData,postRequestBody}
    }

    async getBooking(bookingId:number):Promise<{response:any,responseData:Booking}>{
        const response = await this.request.get(`/booking/${bookingId}`)
        const responseData = await response.json()
        console.log(`GET reponse: ${JSON.stringify(responseData,null,2)}`)
        return{response, responseData} 
    }

    async getBookingByName(firstname:string, lastname:string):Promise<{response:any,responseData:BookingNumberDetails[]}>{
        const response = await this.request.get(`/booking`,{
            params:{ firstname,lastname }
        })
        const responseData = await response.json()
        console.log(`POST response: ${JSON.stringify(responseData,null,2)}`)
        return{response,responseData}
    }

    async generateToken():Promise<string>{
        const response = await this.request.post(`/auth`,{data:tokenGenerator()})
        const tokenData : TokenResponse = await response.json()
        console.log(`TOKEN POST: ${JSON.stringify(tokenData,null,2)}`)
        return tokenData.token
    }

    async updateBooking(bookingId:number,token:string,putRequestBody:Booking=BookingRequestBody()):Promise<{response:any,updatedData:Booking,putRequestBody:Booking}>{
        const response = await this.request.put(`/booking/${bookingId}`,{
            headers:{
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            },data:putRequestBody
        })
        const updatedData = await response.json()
        console.log(`PUT response: ${JSON.stringify(updatedData,null,2)}`)
        return{response,updatedData,putRequestBody}
    }

    async deleteBooking(bookingId:number,token:string):Promise<{response:any}>{
        const response = await this.request.delete(`/booking/${bookingId}`,{
            headers:{
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            }
        })
        return{response}
    }

    async patchBooking(bookingId: number, token: string, fieldsToUpdate: Fieldname[] = []): Promise<{
        patchResponse: any,
        responseData: Booking,
        patchData: Partial<Booking>
    }> {
        const patchData = createPatchRequest(fieldsToUpdate)
        console.log(`PATCH data: ${JSON.stringify(patchData, null, 2)}`);

        const patchResponse = await this.request.patch(`/booking/${bookingId}`, {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            },
            data: patchData
        })

        let responseData = {} as Booking;
        if(patchResponse.status() === 200){
            responseData = await patchResponse.json()
            console.log(`PATCH response: ${JSON.stringify(responseData, null, 2)}`);
        }
        return {patchResponse, responseData, patchData}
    }
}

