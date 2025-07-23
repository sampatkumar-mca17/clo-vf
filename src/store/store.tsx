import { configureStore } from '@reduxjs/toolkit';
import fashionReducer from './fashionStore.slice'; 

export const store = configureStore({
  reducer: {
    fashion: fashionReducer,
    },
});