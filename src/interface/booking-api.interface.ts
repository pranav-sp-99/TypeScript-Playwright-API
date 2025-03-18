export interface BookingDates {
    checkin: string;
    checkout: string;
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