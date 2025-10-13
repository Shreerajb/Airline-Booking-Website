export interface Flight {
    flightNumber: string ,
    from: string,
    to: string,
    departureTime: string,
    arrivalTime: string,
    duration: string,
    price: number,
    seats: number
}

export const createNewFlight = (): Flight => ({ 
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: 0,
    seats: 0
}); 

export const compareFlight = (flightA: Flight, flightB: Flight) : boolean => {
    if(flightA && flightB){
        const flightAString =  JSON.stringify(flightA, Object.keys(flightA).sort());
        const flightBString = JSON.stringify(flightB, Object.keys(flightB).sort());
        return flightAString === flightBString;
    }
    return false;
}