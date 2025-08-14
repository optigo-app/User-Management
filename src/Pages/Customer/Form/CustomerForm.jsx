"use client";

import React, { useState, useEffect, lazy, useMemo } from "react";
import { Box, Card, CardContent, Typography, Container, Paper } from "@mui/material";
import { FormHeaderSection } from "../../../Components/CustomerForm/Home/FormHeaderSection";
import Steppers from "../../../Components/CustomerForm/Stepper/StepperComp";
import { FormHeader } from "../../../Components/CustomerForm/Home/form-header";
import FormNavigation from "../../../Components/CustomerForm/Home/form-navigation";
import FormFooter from "../../../Components/CustomerForm/Home/form-footer";
import { steps } from "../../../Components/CustomerForm/Data/constants";
import { useDispatch, useSelector } from "react-redux";
// Import the action creators directly
import { setErrors, nextStep as nextStepAction, prevStep as prevStepAction, goToStep as goToStepAction } from "../../../Redux/customerFormSlice";
import { useNavigate } from "react-router-dom";


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

const validateStep = (step, formData) => {
    const errors = {};
    switch (step) {
        case 1:
            // Correctly access the data for step1
            if (!formData.step1?.companyName) {
                errors.companyName = "Company Name is required.";
            }
            break;
        case 2:
            if (!formData.step2?.userEmail) {
                errors.userEmail = "User Email is required.";
            }
            if (!formData.step2?.firstName) {
                errors.firstName = "First Name is required.";
            }
            if (!formData.step2?.lastName) {
                errors.lastName = "Last Name is required.";
            }
            if (!formData.step2?.mobileNumber) {
                errors.mobileNumber = "Mobile Number is required.";
            }
            break;
        default:
            break;
    }
    return errors;
};

export default function CustomerForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentStep, data: formData, errors } = useSelector(
        (state) => state.customerForm
    );
    console.log('formData: ', formData);

    const [expandedSections, setExpandedSections] = useState({
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
        additionalDocuments: false,
        emailNotifications: true,
        smsNotifications: true,
        notificationPreferences: true,
        pricePolicy: true,
        termsPackages: true,
        brokerageConfig: true,
        shippingConfig: true,
        currencyRegional: true,
        completionSummary: true,
    });
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [showHelp, setShowHelp] = useState(false);
    const [animatingStep, setAnimatingStep] = useState(null);

    const currentStepInfo = steps[currentStep - 1];

    // Auto-save effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAutoSaving(true);
            setTimeout(() => {
                setIsAutoSaving(false);
                setLastSaved(new Date());
            }, 1500);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Toggle expand
    const toggleSection = (section) =>
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

    // Step Navigation Handlers
    const handleGoToStep = (stepId) => {
        setAnimatingStep(currentStep);
        setTimeout(() => {
            dispatch(goToStepAction(stepId)); // Dispatch the correct action
            setAnimatingStep(null);
        }, 300);
    };

    const handleNextStep = () => {
        const currentStepData = formData[`step${currentStep}`];
        const validationErrors = validateStep(currentStep, formData);

        if (Object.keys(validationErrors).length > 0) {
            dispatch(setErrors(validationErrors));
        } else {
            dispatch(setErrors({}));
            setAnimatingStep(currentStep);
            setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
            setTimeout(() => {
                if (currentStep < steps.length) {
                    dispatch(nextStepAction());
                }
                setAnimatingStep(null);
            }, 300);
        }
    };

    const handlePrevStep = () => {
        setAnimatingStep(currentStep);
        setTimeout(() => {
            if (currentStep > 1) {
                dispatch(prevStepAction()); // Dispatch the correct action
            }
            setAnimatingStep(null);
        }, 300);
    };

    const hanldeFinalSubmit = () => {
        const currentStepData = formData[`step${currentStep}`];
        const validationErrors = validateStep(currentStep, formData);
        navigate("/");

        if (Object.keys(validationErrors).length > 0) {
            dispatch(setErrors(validationErrors));
        } else {
            dispatch(setErrors({}));
            setAnimatingStep(currentStep);
            setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
            setTimeout(() => {
                if (currentStep < steps.length) {
                    dispatch(nextStepAction());
                }
                setAnimatingStep(null);
            }, 300);
        }
    }


    // Transition style memoized
    const transitionStyle = useMemo(
        () => ({
            transition: "all 0.3s ease",
            opacity: animatingStep === currentStep ? 0 : 1,
            transform: animatingStep === currentStep ? "translateX(10px)" : "translateX(0)",
        }),
        [animatingStep, currentStep]
    );

    // Render Step
    const renderStepContent = () => {
        const StepComponent = StepComponents[currentStep];
        if (!StepComponent) {
            return (
                <Typography variant="h4" sx={{ fontWeight: 500, color: "#1f2937" }}>
                    Thank you for your registration!
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
        <Box
            sx={{
                minHeight: "100vh",
                position: "relative",
            }}
        >
            <Container sx={{ py: 6 }}>
                <FormHeaderSection isAutoSaving={isAutoSaving} lastSaved={lastSaved}/>
                <Box mt={4}>
                    <Steppers
                        steps={steps}
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        onStepClick={handleGoToStep}
                    />
                </Box>

                <Card sx={{ minHeight: 700, boxShadow: 4 }}>
                    <FormHeader
                        currentStepInfo={currentStepInfo}
                        currentStep={currentStep}
                        showHelp={showHelp}
                        onToggleHelp={() => setShowHelp((prev) => !prev)}
                    />
                    <CardContent>{renderStepContent()}</CardContent>
                </Card>

                <Box mt={4}>
                    <FormNavigation
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        onPrevious={handlePrevStep}
                        onNext={handleNextStep}
                        onSaveDraft={() => console.log("Saving draft...")}
                        onComplete={hanldeFinalSubmit}
                    />
                </Box>

                <Box mt={4}>
                    <FormFooter />
                </Box>
            </Container>
        </Box>
    );
}