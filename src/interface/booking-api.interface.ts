// Type definition for booking dates with flexible date format
export type BookingDates = {
    checkin: string |Date;
    checkout: string | Date;
}

// Interface for the main booking object containing all booking details
export interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
}

// Interface for the response when creating a new booking
export interface BookingResponse{
    "bookingid": number,
    "booking": Booking
}

// Interface for authentication credentials
export interface Token{
    "username":string | undefined
    "password":string | undefined
}

// Type for minimal booking details containing only the ID
export type BookingNumberDetails = {
    bookingid:number
}

// Type for authentication token response
export type TokenResponse ={
    "token":string
}

// Union type of all possible fields that can be updated in a PATCH request
export type Fieldname = 'firstname' | 'lastname' | 'totalprice' | 'depositpaid' | 'bookingdates' | 'bookingdates.checkin' | 'bookingdates.checkout' | 'additionalneeds' | 'all'

// Interface for patch test case definition
export interface PatchTestCase{
    'description':string,
    'fieldsToUpdate':Fieldname[]
    'expectedStatus':number
}

// Type for partial booking data used in PATCH requests
export type PatchData = {
    firstname?: string;
    lastname?: string;
    totalprice?: number;
    depositpaid?: boolean;
    bookingdates?: BookingDates;
    additionalneeds?: string;
}
