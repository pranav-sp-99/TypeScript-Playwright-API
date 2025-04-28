// Import required dependencies for random data generation
import Chance from 'chance'
import { Booking } from '../interface/booking-api.interface.js'

// Create a new instance of Chance to generate random data
const chance = new Chance()

// Function to generate a random booking request payload with realistic test data
export function BookingRequestBody(){
    const postApiRequest : Booking = {
        // Generate random first and last names
        firstname: chance.first(),
        lastname: chance.last(),
        // Generate random price between 500 and 2000
        totalprice: chance.integer({min: 500, max: 2000}),
        // Randomly set deposit status
        depositpaid:chance.bool(),
        // Generate future dates for booking
        bookingdates:{
            checkin : chance.date({year:2025,month:5}).toString(),
            checkout : chance.date({year:2025,month:6}).toString()
        },
        // Generate random additional needs
        additionalneeds: chance.sentence({words:3})
    }
    return postApiRequest
}