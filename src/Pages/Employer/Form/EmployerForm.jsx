import React, { lazy } from "react";
import BaseForm from "../../../Components/Common/BaseForm/BaseForm";
import { employerSteps } from "../../../Components/EmployerForm/Data/constants";

// Lazy-loaded step components - reusing customer form components where possible
const EmployerStepComponents = {
  1: lazy(() => import("../../../Components/EmployerForm/Step/UserInfoStep")),
  2: lazy(() => import("../../../Components/CustomerForm/Step/BankingStep")),
  3: lazy(() => import("../../../Components/CustomerForm/Step/PreferencesStep")),
  4: lazy(() => import("../../../Components/CustomerForm/Step/DocumentsStep")),
  5: lazy(() => import("../../../Components/CustomerForm/Step/NotificationsStep")),
  6: lazy(() => import("../../../Components/EmployerForm/Step/AppRightsStep")),
  7: lazy(() => import("../../../Components/EmployerForm/Step/UserPermissionsStep")),
};

// Employer-specific validation
const validateEmployerStep = (step, formData) => {
  const errors = {};
  const stepData = formData[`step${step}`] || {};

  if (step === 1) {
    if (!stepData.userEmail) errors.userEmail = "User Email is required.";
    if (!stepData.firstName) errors.firstName = "First Name is required.";
    if (!stepData.lastName) errors.lastName = "Last Name is required.";
    if (!stepData.mobileNumber) errors.mobileNumber = "Mobile Number is required.";
    
    // Employer-specific validations
    if (!stepData.employeeId) errors.employeeId = "Employee ID is required.";
    if (!stepData.emergencyContactName) errors.emergencyContactName = "Emergency contact name is required.";
    if (!stepData.emergencyContactPhone) errors.emergencyContactPhone = "Emergency contact phone is required.";
  }

  if (step === 6) {
    if (!stepData.accessLevel) errors.accessLevel = "Access level is required.";
  }

  if (step === 7) {
    if (!stepData.primaryRole) errors.primaryRole = "Primary role is required.";
    if (!stepData.department) errors.department = "Department is required.";
  }

  return errors;
};

export default function EmployerForm() {
  return (
    <BaseForm
      formType="employer"
      steps={employerSteps}
      stepComponents={EmployerStepComponents}
      validateStep={validateEmployerStep}
      sliceSelector="employerForm" // Using dedicated employer Redux slice
    />
  );
}
