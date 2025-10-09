import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Passenger } from '../components/types/Passenger';
import { createNewFlight, Flight } from '../components/types/Flight';


// Define the slice state type
export type PassengerState = {
  passengers: Passenger[];
  flightDetails: Flight;
};

const initialState: PassengerState = {
  passengers: [],
  flightDetails: createNewFlight(),
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    passengerDetails: (state, action: PayloadAction<Passenger[]>) => {
      state.passengers = action.payload;
    },
    flightDetails: (state, action: PayloadAction<Flight>) => {
      state.flightDetails = action.payload;
    },
  },
});

export const { passengerDetails, flightDetails } = bookingSlice.actions;

export default bookingSlice.reducer;