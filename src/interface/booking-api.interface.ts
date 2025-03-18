export type BookingDates = {
    checkin: string |Date;
    checkout: string | Date;
}

export interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
}

export interface BookingResponse{
    "bookingid": number,
    "booking": Booking
}

export interface Token{
    "username":string | undefined
    "password":string | undefined
}

export type BookingNumberDetails = {
    bookingid:number
}

export type TokenResponse ={
    "token":string
}

export type Fieldname = 'firstname' | 'lastname' | 'totalprice' | 'depositpaid' | 'bookingdates' | 'bookingdates.checkin' | 'bookingdates.checkout' | 'additionalneeds' | 'all'

export interface PatchTestCase{
    'description':string,
    'fieldsToUpdate':Fieldname[]
    'expectedStatus':number
}

export type PatchData = {
    firstname?: string;
    lastname?: string;
    totalprice?: number;
    depositpaid?: boolean;
    bookingdates?: BookingDates;
    additionalneeds?: string;
}
