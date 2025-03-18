import { Token } from '../interface/booking-api.interface.js'
import tokenData from '../test-data/token-gen.json' with { type: 'json' }


export function tokenGenerator():Token{
    return tokenData
}   
