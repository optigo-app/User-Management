import React, { lazy } from "react";
import BaseForm from "../../../Components/Common/BaseForm/BaseForm";
import { manufacturerSteps } from "../../../Components/ManufacturerForm/Data/constants";

// Lazy-loaded step components - using manufacturer-specific components that dispatch to correct Redux slice
const ManufacturerStepComponents = {
  1: lazy(() => import("../../../Components/ManufacturerForm/Step/CompanyStep")),
  2: lazy(() => import("../../../Components/ManufacturerForm/Step/UserInfoStep")),
  3: lazy(() => import("../../../Components/ManufacturerForm/Step/BankingStep")),
  4: lazy(() => import("../../../Components/CustomerForm/Step/DocumentsStep")),
  5: lazy(() => import("../../../Components/ManufacturerForm/Step/NotificationsStep")),
  6: lazy(() => import("../../../Components/ManufacturerForm/Step/PackagesStep")),
  7: lazy(() => import("../../../Components/ManufacturerForm/Step/ShippingStep")),
};

// Manufacturer-specific validation
const validateManufacturerStep = (step, formData) => {
  const errors = {};
  const stepData = formData[`step${step}`] || {};

  if (step === 1) {
    // Company validation
    if (!stepData.companyName) errors.companyName = "Company Name is required.";
    if (!stepData.businessType) errors.businessType = "Business Type is required.";
    if (!stepData.registrationNumber) errors.registrationNumber = "Registration Number is required.";
    if (!stepData.address) errors.address = "Company Address is required.";
  }

  if (step === 2) {
    // User info validation
    if (!stepData.userEmail) errors.userEmail = "User Email is required.";
    if (!stepData.firstName) errors.firstName = "First Name is required.";
    if (!stepData.lastName) errors.lastName = "Last Name is required.";
    if (!stepData.mobileNumber) errors.mobileNumber = "Mobile Number is required.";
    if (!stepData.designation) errors.designation = "Designation is required.";
  }

  if (step === 3) {
    // Banking validation
    if (!stepData.bankAccounts || stepData.bankAccounts.length === 0) {
      errors.bankAccounts = "At least one bank account is required.";
    }
  }

  if (step === 4) {
    // Documents validation
    if (!stepData.requiredDocuments) {
      errors.requiredDocuments = "Required documents must be uploaded.";
    }
  }

  if (step === 6) {
    // Package validation
    if (!stepData.manufacturingPlan) errors.manufacturingPlan = "Manufacturing plan is required.";
    if (!stepData.pricingTier) errors.pricingTier = "Pricing tier is required.";
  }

  return errors;
};

export default function ManufacturerForm() {
  return (
    <BaseForm
      formType="manufacturer"
      steps={manufacturerSteps}
      stepComponents={ManufacturerStepComponents}
      validateStep={validateManufacturerStep}
      sliceSelector="manufacturerForm" // Using dedicated manufacturer Redux slice
    />
  );
}
