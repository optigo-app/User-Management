import React from "react";
import BusinessForm from "../Common/BusinessForm/BusinessForm";
import { supplierSteps } from "./Data/constants";

const SupplierForm = () => {
  return (
    <BusinessForm
      formType="supplier"
      steps={supplierSteps}
      sliceSelector="supplierForm"
    />
  );
};

export default SupplierForm;
