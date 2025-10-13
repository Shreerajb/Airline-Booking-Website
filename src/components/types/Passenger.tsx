export type Passenger = {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  seatNumber: string;
};

const createNewEmptyPassenger = (): Passenger => ({
  age: 0,
  email: "",
  gender: "",
  id: "",
  name: "",
  phone: "",
  seatNumber: "",
});

export const createListOfEmptyPassengers = (numberOfPax: number): Passenger[] => {
   let passengers: Passenger[] = [];
   for (let index = 0; index < numberOfPax; index += 1) {
    passengers.push(createNewEmptyPassenger());
   }
   return passengers;
}