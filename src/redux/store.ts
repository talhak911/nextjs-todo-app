import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import signUpReducer from "./slices/signUpSlice"
export const store = configureStore({
  reducer: {
    auth:authReducer,
    signUp:signUpReducer
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
