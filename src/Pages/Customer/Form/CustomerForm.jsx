"use client";

import React, { useState, useEffect, lazy, useMemo, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { FormHeaderSection } from "../../../Components/CustomerForm/Home/FormHeaderSection";
import Steppers from "../../../Components/CustomerForm/Stepper/StepperComp";
import { FormHeader } from "../../../Components/CustomerForm/Home/form-header";
import FormNavigation from "../../../Components/CustomerForm/Home/form-navigation";
import FormFooter from "../../../Components/CustomerForm/Home/form-footer";
import { steps } from "../../../Components/CustomerForm/Data/constants";

import {
  setErrors,
  nextStep as nextStepAction,
  prevStep as prevStepAction,
  goToStep as goToStepAction,
  setFormData,
  setStep,
} from "../../../Redux/customerFormSlice";

// ✅ Lazy-loaded step components
const StepComponents = {
  1: lazy(() => import("../../../Components/CustomerForm/Step/CompanyStep")),
  2: lazy(() => import("../../../Components/CustomerForm/Step/UserInfoStep")),
  3: lazy(() => import("../../../Components/CustomerForm/Step/BankingStep")),
  4: lazy(() => import("../../../Components/CustomerForm/Step/PreferencesStep")),
  5: lazy(() => import("../../../Components/CustomerForm/Step/DocumentsStep")),
  6: lazy(() => import("../../../Components/CustomerForm/Step/NotificationsStep")),
  7: lazy(() => import("../../../Components/CustomerForm/Step/PackagesStep")),
  8: lazy(() => import("../../../Components/CustomerForm/Step/ShippingStep")),
};

// ✅ Centralized validation
const validateStep = (step, formData) => {
  const errors = {};
  const stepData = formData[`step${step}`] || {};

  if (step === 1 && !stepData.companyName) {
    errors.companyName = "Company Name is required.";
  }

  if (step === 2) {
    if (!stepData.userEmail) errors.userEmail = "User Email is required.";
    if (!stepData.firstName) errors.firstName = "First Name is required.";
    if (!stepData.lastName) errors.lastName = "Last Name is required.";
    if (!stepData.mobileNumber) errors.mobileNumber = "Mobile Number is required.";
  }

  return errors;
};

const defaultExpandedSections = {
  accountInfo: true,
  personalInfo: true,
  companySelection: true,
  basicCompanyInfo: true,
  companyAddress: true,
  taxRegistration: true,
  bankingInfo: true,
  shippingPreferences: true,
  qualityCertification: true,
  specialInstructions: true,
  requiredDocuments: true,
  optionalDocuments: true,
  additionalDocuments: true,
  emailNotifications: true,
  smsNotifications: true,
  notificationPreferences: true,
  pricePolicy: true,
  termsPackages: true,
  brokerageConfig: true,
  shippingConfig: true,
  currencyRegional: true,
  completionSummary: true,
};

export default function CustomerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentStep, data: formData, errors } = useSelector(
    (state) => state.customerForm
  );
  console.log('formData: ', formData);

  const [expandedSections, setExpandedSections] = useState(defaultExpandedSections);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [animating, setAnimating] = useState(false);

  const currentStepInfo = steps[currentStep - 1];

  // ✅ Restore state if redirected
  useEffect(() => {
    if (location.state) {
      dispatch(setFormData(location.state.data));
      dispatch(setStep(location.state.step));
    }
  }, [location.state, dispatch]);

  // ✅ Auto-save with debounce
  useEffect(() => {
    if (!formData) return;
    const timer = setTimeout(() => {
      setIsAutoSaving(true);
      setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [formData]);

  // ✅ Toggle section expand/collapse
  const toggleSection = useCallback(
    (section) =>
      setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] })),
    []
  );

  // ✅ Navigate to specific step
  const navigateStep = useCallback(
    (stepId) => {
      setAnimating(true);
      setTimeout(() => {
        dispatch(goToStepAction(stepId));
        setAnimating(false);
      }, 250);
    },
    [dispatch]
  );

  // ✅ Handle Next, Prev, Final Submit in one function
  const handleStepChange = useCallback(
    (direction) => {
      const validationErrors = validateStep(currentStep, formData);

      if (Object.keys(validationErrors).length > 0) {
        dispatch(setErrors(validationErrors));
        return;
      }

      dispatch(setErrors({}));
      setAnimating(true);

      setTimeout(() => {
        if (direction === "next" && currentStep < steps.length) {
          dispatch(nextStepAction());
        } else if (direction === "prev" && currentStep > 1) {
          dispatch(prevStepAction());
        } else if (direction === "final") {
          navigate("/");
        }
        setAnimating(false);
      }, 250);
    },
    [currentStep, formData, dispatch, navigate]
  );

  // ✅ Transition animation
  const transitionStyle = useMemo(
    () => ({
      transition: "all 0.25s ease",
      opacity: animating ? 0 : 1,
      transform: animating ? "translateX(10px)" : "translateX(0)",
    }),
    [animating]
  );

  // ✅ Step renderer
  const renderStepContent = () => {
    const StepComponent = StepComponents[currentStep];
    if (!StepComponent) {
      return (
        <Typography variant="h4" sx={{ fontWeight: 500, color: "#1f2937" }}>
          🎉 Thank you for your registration!
        </Typography>
      );
    }
    return (
      <Box sx={transitionStyle}>
        <StepComponent
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
          formData={formData[`step${currentStep}`]}
          errors={errors}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Container sx={{ py: 6 }}>
        {/* ✅ Header with auto-save info */}
        <FormHeaderSection isAutoSaving={isAutoSaving} lastSaved={lastSaved} />

        {/* ✅ Stepper Navigation */}
        <Box mt={4}>
          <Steppers
            steps={steps}
            currentStep={currentStep}
            completedSteps={Array.from({ length: currentStep - 1 }, (_, i) => i + 1)}
            onStepClick={navigateStep}
          />
        </Box>

        {/* ✅ Card with form content */}
        <Card sx={{ minHeight: 700, boxShadow: 4 }}>
          <FormHeader
            currentStepInfo={currentStepInfo}
            currentStep={currentStep}
            showHelp={showHelp}
            onToggleHelp={() => setShowHelp((prev) => !prev)}
          />
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* ✅ Navigation Buttons */}
        <Box mt={4}>
          <FormNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={() => handleStepChange("prev")}
            onNext={() => handleStepChange("next")}
            onSaveDraft={() => console.log("Draft saved")}
            onComplete={() => handleStepChange("final")}
          />
        </Box>

        {/* ✅ Footer */}
        <Box mt={4}>
          <FormFooter />
        </Box>
      </Container>
    </Box>
  );
}
