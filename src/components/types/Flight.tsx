export interface Flight {
    flightNumber: string ,
    from: string,
    to: string,
    departureTime: Date,
    arrivalTime: Date,
    duration: string,
    price: number,
    seats: number
}

export const createNewFlight = (): Flight => ({ 
    flightNumber: "",
    from: "",
    to: "",
    departureTime: new Date(),
    arrivalTime: new Date(),
    duration: "",
    price: 0,
    seats: 0
}); 