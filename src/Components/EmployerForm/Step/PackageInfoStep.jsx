import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/employerFormSlice';
import {
    ProgressHeader,
    SalaryInformationCard,
    BenefitsSelectionCard,
    AllowancesSelectionCard,
    PayrollScheduleCard,
    PackageSummaryCard
} from '../StepsComp/PackageStep';

export default function PackageInfoStep({
    formData,
    errors,
}) {
    const dispatch = useDispatch();

    const [localFormData, setLocalFormData] = useState({
        baseSalary: "",
        salaryFrequency: "",
        currency: "USD",
        allowances: [],
        benefits: [],
        payrollSchedule: "",
        overtimeRate: "",
        bonusStructure: "",
        ...formData
    });

    useEffect(() => {
        if (formData) {
            setLocalFormData({
                baseSalary: formData.baseSalary || "",
                salaryFrequency: formData.salaryFrequency || "",
                currency: formData.currency || "INR",
                allowances: formData.allowances || [],
                benefits: formData.benefits || [],
                payrollSchedule: formData.payrollSchedule || "",
                overtimeRate: formData.overtimeRate || "",
                bonusStructure: formData.bonusStructure || "",
                ...formData
            });
        }
    }, [formData]);

    // Options data
    const salaryFrequencyOptions = [
        { value: "monthly", label: "Monthly" },
        { value: "bi-weekly", label: "Bi-Weekly" },
        { value: "weekly", label: "Weekly" },
        { value: "annually", label: "Annually" },
    ];

    const currencyOptions = [
        { value: "USD", label: "USD - US Dollar" },
        { value: "EUR", label: "EUR - Euro" },
        { value: "GBP", label: "GBP - British Pound" },
        { value: "INR", label: "INR - Indian Rupee" },
        { value: "CAD", label: "CAD - Canadian Dollar" },
    ];

    const payrollScheduleOptions = [
        { value: "1st", label: "1st of every month" },
        { value: "15th", label: "15th of every month" },
        { value: "last", label: "Last working day" },
        { value: "bi-monthly", label: "1st and 15th" },
    ];

    const benefitsOptions = [
        { value: "health", label: "Health Insurance" },
        { value: "dental", label: "Dental Insurance" },
        { value: "vision", label: "Vision Insurance" },
        { value: "retirement", label: "Retirement Plan" },
        { value: "life", label: "Life Insurance" },
        { value: "disability", label: "Disability Insurance" },
        { value: "vacation", label: "Paid Vacation" },
        { value: "sick", label: "Sick Leave" },
    ];

    const allowancesOptions = [
        { value: "transport", label: "Transportation Allowance" },
        { value: "meal", label: "Meal Allowance" },
        { value: "medical", label: "Medical Allowance" },
        { value: "festive", label: "Festival Allowance" },
        { value: "housing", label: "Housing Allowance" },
        { value: "phone", label: "Phone Allowance" },
        { value: "internet", label: "Internet Allowance" },
        { value: "education", label: "Education Allowance" },
        { value: "other", label: "Other Allowance" },
    ];

    // Event handlers
    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step6",
            formData: data
        }));
    };

    const handleInputChange = (field, value) => {
        setLocalFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleBlur = (field) => {
        handleUpdate({ [field]: localFormData[field] });
    };

    const handleSelectChange = (field, value) => {
        const updatedData = { ...localFormData, [field]: value };
        setLocalFormData(updatedData);
        handleUpdate({ [field]: value });
    };

    const handleBenefitsChange = (selectedBenefits) => {
        const updatedData = { ...localFormData, benefits: selectedBenefits };
        setLocalFormData(updatedData);
        handleUpdate({ benefits: selectedBenefits });
    };

    const handleAllowancesChange = (selectedAllowances) => {
        const updatedData = { ...localFormData, allowances: selectedAllowances };
        setLocalFormData(updatedData);
        handleUpdate({ allowances: selectedAllowances });
    };

    // Calculations
    const calculateTotalCompensation = () => {
        const base = parseFloat(localFormData.baseSalary) || 0;
        const benefitsCount = localFormData.benefits?.length || 0;
        const allowancesCount = localFormData.allowances?.length || 0;

        const estimatedBenefitsValue = benefitsCount * 2000;
        const estimatedAllowancesValue = allowancesCount * 500;

        return base + estimatedBenefitsValue + estimatedAllowancesValue;
    };

    const totalCompensation = calculateTotalCompensation();
    const completionPercentage = Math.min(
        ((localFormData.baseSalary ? 25 : 0) +
            (localFormData.salaryFrequency ? 25 : 0) +
            (localFormData.payrollSchedule ? 25 : 0) +
            ((localFormData.benefits?.length || 0) > 0 ? 25 : 0)), 100
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ProgressHeader completionPercentage={completionPercentage} />

            <Grid container spacing={3}>
                {/* Left Column - Forms */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Stack spacing={3}>
                        <SalaryInformationCard
                            formData={localFormData}
                            errors={errors}
                            onInputChange={handleInputChange}
                            onBlur={handleBlur}
                            onSelectChange={handleSelectChange}
                            currencyOptions={currencyOptions}
                            salaryFrequencyOptions={salaryFrequencyOptions}
                        />

                        <BenefitsSelectionCard
                            selectedBenefits={localFormData.benefits || []}
                            onBenefitsChange={handleBenefitsChange}
                            benefitsOptions={benefitsOptions}
                        />

                        <AllowancesSelectionCard
                            selectedAllowances={localFormData.allowances || []}
                            onAllowancesChange={handleAllowancesChange}
                            allowancesOptions={allowancesOptions}
                        />

                        <PayrollScheduleCard
                            formData={localFormData}
                            onInputChange={handleInputChange}
                            onBlur={handleBlur}
                            onSelectChange={handleSelectChange}
                            payrollScheduleOptions={payrollScheduleOptions}
                        />
                    </Stack>
                </Grid>

                {/* Right Column - Summary */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <PackageSummaryCard
                        formData={localFormData}
                        totalCompensation={totalCompensation}
                        selectedBenefits={localFormData.benefits || []}
                        selectedAllowances={localFormData.allowances || []}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
