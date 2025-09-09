import { configureStore } from "@reduxjs/toolkit";
import customerFormReducer from "./customerFormSlice";
import employerFormReducer from "./employerFormSlice";
import manufacturerFormReducer from "./manufacturerFormSlice";
import supplierFormReducer from "./supplierFormSlice";

export const store = configureStore({
  reducer: {
    customerForm: customerFormReducer,
    employerForm: employerFormReducer,
    manufacturerForm: manufacturerFormReducer,
    supplierForm: supplierFormReducer,
  },
});
