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

import { FormHeaderSection } from "../../CustomerForm/Home/FormHeaderSection";
import Steppers from "../../CustomerForm/Stepper/StepperComp";
import { FormHeader } from "../../CustomerForm/Home/form-header";
import FormNavigation from "../../CustomerForm/Home/form-navigation";
import FormFooter from "../../CustomerForm/Home/form-footer";

import * as customerFormActions from "../../../Redux/customerFormSlice";
import * as employerFormActions from "../../../Redux/employerFormSlice";

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
  // Employer-specific sections
  idCardInfo: true,
  staffFamily: true,
  appRights: true,
  userPermissions: true,
};

export default function BaseForm({ 
  formType = "customer", 
  steps, 
  stepComponents, 
  validateStep,
  sliceSelector = "customerForm" 
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentStep, data: formData, errors } = useSelector(
    (state) => state[sliceSelector]
  );
  console.log('employerFormData: ', formData);
  // Get the correct actions based on slice selector
  const actions = sliceSelector === "employerForm" ? employerFormActions : customerFormActions;

  const [expandedSections, setExpandedSections] = useState(defaultExpandedSections);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [animating, setAnimating] = useState(false);

  const currentStepInfo = steps[currentStep - 1];

  // Restore state if redirected
  useEffect(() => {
    if (location.state) {
      dispatch(actions.setFormData(location.state.data));
      dispatch(actions.setStep(location.state.step));
    }
  }, [location.state, dispatch, actions]);

  // Auto-save with debounce
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

  // Toggle section expand/collapse
  const toggleSection = useCallback(
    (section) =>
      setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] })),
    []
  );

  // Navigate to specific step
  const navigateStep = useCallback(
    (stepId) => {
      setAnimating(true);
      setTimeout(() => {
        dispatch(actions.goToStep(stepId));
        setAnimating(false);
      }, 250);
    },
    [dispatch, actions]
  );

  // Handle Next, Prev, Final Submit
  const handleStepChange = useCallback(
    (direction) => {
      const validationErrors = validateStep(currentStep, formData);

      if (Object.keys(validationErrors).length > 0) {
        dispatch(actions.setErrors(validationErrors));
        return;
      }

      dispatch(actions.setErrors({}));
      setAnimating(true);

      setTimeout(() => {
        if (direction === "next" && currentStep < steps.length) {
          dispatch(actions.nextStep());
        } else if (direction === "prev" && currentStep > 1) {
          dispatch(actions.prevStep());
        } else if (direction === "final") {
          navigate("/");
        }
        setAnimating(false);
      }, 250);
    },
    [currentStep, formData, dispatch, navigate, steps.length, validateStep, actions]
  );

  // Transition animation
  const transitionStyle = useMemo(
    () => ({
      transition: "all 0.25s ease",
      opacity: animating ? 0 : 1,
      transform: animating ? "translateX(10px)" : "translateX(0)",
    }),
    [animating]
  );

  // Step renderer
  const renderStepContent = () => {
    const StepComponent = stepComponents[currentStep];
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
          formType={formType}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Container sx={{ py: 6 }}>
        {/* Header with auto-save info */}
        <FormHeaderSection isAutoSaving={isAutoSaving} lastSaved={lastSaved} />

        {/* Stepper Navigation */}
        <Box mt={4}>
          <Steppers
            steps={steps}
            currentStep={currentStep}
            completedSteps={Array.from({ length: currentStep - 1 }, (_, i) => i + 1)}
            onStepClick={navigateStep}
          />
        </Box>

        {/* Card with form content */}
        <Card sx={{ minHeight: 700, boxShadow: 4 }}>
          <FormHeader
            currentStepInfo={currentStepInfo}
            currentStep={currentStep}
            showHelp={showHelp}
            onToggleHelp={() => setShowHelp((prev) => !prev)}
          />
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
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

        {/* Footer */}
        <Box mt={4}>
          <FormFooter />
        </Box>
      </Container>
    </Box>
  );
}
