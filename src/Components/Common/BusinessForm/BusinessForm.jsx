import React, { lazy } from "react";
import BaseForm from "../BaseForm/BaseForm";

// Lazy-loaded step components - reusing customer form components
const BusinessStepComponents = {
  1: lazy(() => import("../../CustomerForm/Step/CompanyStep")),
  2: lazy(() => import("../../CustomerForm/Step/UserInfoStep")),
  3: lazy(() => import("../../CustomerForm/Step/BankingStep")),
  4: lazy(() => import("../../CustomerForm/Step/DocumentsStep")),
  5: lazy(() => import("../../CustomerForm/Step/NotificationsStep")),
  6: lazy(() => import("../../CustomerForm/Step/PackagesStep")),
  7: lazy(() => import("../../ManufacturerForm/Step/ShippingStep")),
};

// Supplier-specific step components
const SupplierStepComponents = {
  5: lazy(() => import("../../SupplierForm/Step/SupplierPackagesStep")),
};

// Common validation logic for business forms
const validateBusinessStep = (step, formData, formType) => {
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
    // Documents validation (only for manufacturer)
    if (formType === "manufacturer") {
      if (!stepData.requiredDocuments) {
        errors.requiredDocuments = "Required documents must be uploaded.";
      }
    }
    // Notifications validation (for supplier - step 4)
    if (formType === "supplier") {
      if (!stepData.notificationPreferences) {
        errors.notificationPreferences = "Notification preferences are required.";
      }
    }
  }

  if (step === 5) {
    // Notifications validation (for manufacturer - step 5)
    if (formType === "manufacturer") {
      if (!stepData.notificationPreferences) {
        errors.notificationPreferences = "Notification preferences are required.";
      }
    }
    // Packages validation (for supplier - step 5)
    if (formType === "supplier") {
      if (!stepData.selectedPackage) {
        errors.selectedPackage = "Package selection is required.";
      }
    }
  }

  if (step === 6) {
    // Packages validation (for manufacturer - step 6)
    if (formType === "manufacturer") {
      if (!stepData.manufacturingPlan) errors.manufacturingPlan = "Manufacturing plan is required.";
      if (!stepData.pricingTier) errors.pricingTier = "Pricing tier is required.";
    }
  }

  if (step === 7) {
    if (formType === "manufacturer") {
      if (!stepData.addresses || stepData.addresses.length === 0) {
        errors.addresses = "At least one shipping address is required.";
      }
    }
  }

  return errors;
};

const BusinessForm = ({ formType, steps, sliceSelector }) => {
  const getStepComponents = () => {
    if (formType === "supplier") {
      return {
        1: BusinessStepComponents[1], 
        2: BusinessStepComponents[2], 
        3: BusinessStepComponents[3],
        4: BusinessStepComponents[5], 
        5: SupplierStepComponents[5], 
      };
    }
    return BusinessStepComponents;
  };

  const validateStep = (step, formData) => {
    return validateBusinessStep(step, formData, formType);
  };

  return (
    <BaseForm
      steps={steps}
      stepComponents={getStepComponents()}
      validateStep={validateStep}
      formType={formType}
      sliceSelector={sliceSelector}
    />
  );
};

export default BusinessForm;
