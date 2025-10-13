import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Passenger } from '../components/types/Passenger';
import { createNewFlight, Flight } from '../components/types/Flight';


// Define the slice state type
export type PassengerState = {
  passengers: Passenger[];
  flightDetails: Flight;
  isReadyToBook: boolean;
  selectedAddOns: string[];
  passengerCount: number;

  
  
};

const initialState: PassengerState = {
  passengers: [],
  flightDetails: createNewFlight(),
  isReadyToBook: false,
  selectedAddOns: [],
  passengerCount: 1,
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
      state.isReadyToBook = true;
    },
    resetBookingFlow: (state) => {
      state.passengers =[];
      state.flightDetails = createNewFlight();
      state.isReadyToBook = false;
    },
     addAddOn: (state, action) => {
    if (!state.selectedAddOns.includes(action.payload)) {
      state.selectedAddOns.push(action.payload);
    }
     },
     setPassengerCount: (state, action: PayloadAction<number>) =>  {
      state.passengerCount = action.payload;
     }
  },
});

export const { passengerDetails, flightDetails, resetBookingFlow, addAddOn, setPassengerCount} = bookingSlice.actions;

export default bookingSlice.reducer;