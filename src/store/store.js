import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import learningSlice from './slices/learningSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    learning: learningSlice,
  },
});