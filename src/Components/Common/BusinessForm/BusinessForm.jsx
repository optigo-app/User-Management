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
};

// Supplier-specific step components
const SupplierStepComponents = {
  5: lazy(() => import("../../SupplierForm/Step/SupplierPackagesStep")), // Supplier-specific packages step
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

  return errors;
};

const BusinessForm = ({ formType, steps, sliceSelector }) => {
  // Filter step components based on form type
  const getStepComponents = () => {
    if (formType === "supplier") {
      // Supplier doesn't have documents step, so we skip step 4
      return {
        1: BusinessStepComponents[1], // Company
        2: BusinessStepComponents[2], // User Info
        3: BusinessStepComponents[3], // Banking
        4: BusinessStepComponents[5], // Notifications (mapped to step 5 component)
        5: SupplierStepComponents[5], // Supplier-specific packages step (shipping address only)
      };
    }
    
    // Manufacturer has all steps
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
