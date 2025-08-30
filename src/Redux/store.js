import { configureStore } from "@reduxjs/toolkit";
import customerFormReducer from "./customerFormSlice";
import employerFormReducer from "./employerFormSlice";

export const store = configureStore({
  reducer: {
    customerForm: customerFormReducer,
    employerForm: employerFormReducer,
  },
});
