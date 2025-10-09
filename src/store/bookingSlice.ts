import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Passenger } from '../components/types/Passenger';


// Define the slice state type
export type PassengerState = {
  passengers: Passenger[];
};

const initialState: PassengerState = {
  passengers: [],
};

export const passengerSlice = createSlice({
  name: 'updatePax',
  initialState,
  reducers: {
    passengerDetails: (state, action: PayloadAction<Passenger[]>) => {
      state.passengers = action.payload;
    },
  },
});

export const { passengerDetails } = passengerSlice.actions;

export default passengerSlice.reducer;