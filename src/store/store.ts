import { configureStore } from '@reduxjs/toolkit';
import passengerReducer from './bookingSlice';

export const store = configureStore({
  reducer: {
    passengers: passengerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;