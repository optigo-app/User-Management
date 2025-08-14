import React, { useState, useEffect } from "react";
import { Box, Typography, FormHelperText } from "@mui/material";
import { FileText, Truck, Star } from "lucide-react";
import { FormField, Select, CollapsibleSection, OptionGrid } from "../../Ui";
import { useDispatch } from "react-redux";
import { updateStepData } from "../../../Redux/customerFormSlice";
import InstructionsSection from "../StepsComp/PreferencesStep/InstructionsSection";

const PreferenceStep = ({
    expandedSections,
    onToggleSection,
    formData,
    errors,
}) => {
    const dispatch = useDispatch();

    const [localFormData, setLocalFormData] = useState({
        shippingMethod: "",
        selectedCertifications: [],
        preferredCertification: "",
        instructions: {},
    });

    useEffect(() => {
        setLocalFormData({
            shippingMethod: formData.shippingMethod || "",
            selectedCertifications: formData.selectedCertifications || [],
            preferredCertification: formData.preferredCertification || "",
            instructions: formData.instructions || {},
        });
    }, [formData]);

    const handleSelectChange = (field, value) => {
        setLocalFormData((prevState) => ({ ...prevState, [field]: value }));
        handleUpdate({ [field]: value });
    };

    const handleOptionGridChange = (option) => {
        setLocalFormData((prevState) => {
            const prevSelections = prevState.selectedCertifications || [];

            let updatedSelections;
            if (prevSelections.includes(option)) {
                updatedSelections = prevSelections.filter(item => item !== option);
            } else {
                updatedSelections = [...prevSelections, option];
            }
            handleUpdate({ selectedCertifications: updatedSelections });
            return { ...prevState, selectedCertifications: updatedSelections };
        });
    };


    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step4",
            formData: data
        }));
    };

    const shippingOptions = [
        { value: "courier", label: "🚚 Courier Service" },
        { value: "hand", label: "🤝 Hand Delivery" },
        { value: "post", label: "📮 Postal Service" },
        { value: "express", label: "⚡ Express Delivery" },
    ];

    const certificationOptions = [
        { id: "hallmark", label: "Hallmark Certification", icon: "🏆" },
        { id: "diamondWt", label: "Diamond Weight", icon: "💎" },
        { id: "pcs", label: "Piece Count", icon: "🔢" },
        { id: "stamping", label: "Quality Stamping", icon: "✅" },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <CollapsibleSection
                isOpen={expandedSections.companySelection}
                onToggle={() => onToggleSection("companySelection")}
                icon={Truck}
                gradient="linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 100%)"
                title="Shipping Preferences"
                subtitle="Default shipping and delivery settings"
                fieldCount="1 field"
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <FormField
                        label="Default Shipping Method"
                        error={!!errors.shippingMethod}
                    >
                        <Select
                            options={shippingOptions}
                            placeholder="Select shipping method"
                            value={formData.shippingMethod}
                            onChange={(e) => handleSelectChange("shippingMethod", e.target.value)}
                        />
                        {errors.shippingMethod && <Typography sx={{ color: "error.main", mt: 1 }}>{errors.shippingMethod}</Typography>}
                    </FormField>
                </Box>
            </CollapsibleSection>

            <CollapsibleSection
                isOpen={expandedSections.qualityCertification}
                onToggle={() => onToggleSection("qualityCertification")}
                icon={Star}
                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                title="Quality & Certification"
                subtitle="Quality assurance and certification preferences"
                fieldCount="6 fields"
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <FormField label="Stamping & Hallmarking Preferences">
                        <OptionGrid
                            options={certificationOptions}
                            selected={formData.selectedCertifications}
                            onChange={(value) => handleOptionGridChange(value)}
                        />
                    </FormField>
                    <FormField
                        label="Preferred Certification"
                        error={!!errors.preferredCertification}
                    >
                        <Select
                            options={shippingOptions}
                            placeholder="Select certification authority"
                            value={localFormData.preferredCertification}
                            onChange={(e) => handleSelectChange("preferredCertification", e.target.value)}
                        />
                        {errors.preferredCertification && <Typography sx={{ color: "error.main", mt: 1 }}>{errors.preferredCertification}</Typography>}
                    </FormField>
                </Box>
            </CollapsibleSection>

            <CollapsibleSection
                isOpen={expandedSections.specialInstructions}
                onToggle={() => onToggleSection("specialInstructions")}
                icon={FileText}
                gradient="linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(124, 58, 237) 100%)"
                title="Special Instructions"
                subtitle="Department-specific instructions and notes"
                fieldCount="5 fields"
            >
                <InstructionsSection
                    formData={formData}
                    errors={errors.instructions}
                    onUpdate={handleUpdate}
                />
            </CollapsibleSection>
        </Box>
    );
};

export default PreferenceStep;