import { createSlice } from "@reduxjs/toolkit";
import { supplierInitialState } from "./formInitialState";

const initialState = {
  data: { ...supplierInitialState },
  errors: {},
  currentStep: 1,
};

const supplierFormSlice = createSlice({
  name: "supplierForm",
  initialState,
  reducers: {
    updateStepData: (state, action) => {
      const { stepName, formData } = action.payload;
      state.data[stepName] = { ...state.data[stepName], ...formData };
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action) => {
      const step = action.payload;
      if (step >= 1 && step <= 5) {
        state.currentStep = step;
      }
    },
    resetForm: (state) => {
      state.data = { ...supplierInitialState };
      state.errors = {};
      state.currentStep = 1;
    },
    setFormData: (state, action) => {
      state.data = { ...supplierInitialState, ...action.payload };
    },
    setStep: (state, action) => {
      const step = action.payload;
      if (step >= 1 && step <= 5) {
        state.currentStep = step;
      }
    },
  },
});

export const {
  updateStepData,
  setErrors,
  nextStep,
  prevStep,
  goToStep,
  resetForm,
  setFormData,
  setStep,
} = supplierFormSlice.actions;

export const supplierFormActions = supplierFormSlice.actions;
export default supplierFormSlice.reducer;
