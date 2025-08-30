import { createSlice } from "@reduxjs/toolkit";
import { employerInitialState } from "./formInitialState";

const initialState = {
  data: { ...employerInitialState },
  errors: {},
  currentStep: 1,
};

const employerFormSlice = createSlice({
  name: "employerForm",
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
      if (state.currentStep < 7) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetForm: () => initialState,
    setFormData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
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
  setStep 
} = employerFormSlice.actions;

export default employerFormSlice.reducer;
