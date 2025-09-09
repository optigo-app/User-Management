import React from "react";
import BusinessForm from "../Common/BusinessForm/BusinessForm";
import { manufacturerSteps } from "./Data/constants";

export default function ManufacturerForm() {
  return (
    <BusinessForm
      formType="manufacturer"
      steps={manufacturerSteps}
      sliceSelector="manufacturerForm"
    />
  );
}
