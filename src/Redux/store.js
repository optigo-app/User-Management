import { configureStore } from "@reduxjs/toolkit";
import customerFormReducer from "./customerFormSlice";

export const store = configureStore({
  reducer: {
    customerForm: customerFormReducer,
  },
});
