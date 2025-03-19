import Chance from 'chance'
import { Booking } from '../interface/booking-api.interface.js'

// Create a new instance of Chance to generate random data
const chance = new Chance()

// Function to generate a random API request payload
export function BookingRequestBody(){
    const postApiRequest : Booking = {
        firstname: chance.first(),
        lastname: chance.last(),
        totalprice: chance.integer({min: 500, max: 2000}),
        depositpaid:chance.bool(),
        bookingdates:{
            checkin : chance.date({year:2025,month:5}).toString(),
            checkout : chance.date({year:2025,month:6}).toString()
        },
        additionalneeds: chance.sentence({words:3})
    }
    return postApiRequest
}