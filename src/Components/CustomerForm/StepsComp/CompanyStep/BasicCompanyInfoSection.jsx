// src/Components/Step/BasicCompanyInfoSection.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, FormHelperText } from "@mui/material";
import { Building2 } from "lucide-react";
import { FormField, Input, Select, CollapsibleSection } from "../../../Ui";
import CustomAutocomplete from "../../../Ui/ReusableAutocomplete";
import CustomInput from "../../../Ui/CustomInput";

const BasicCompanyInfoSection = ({ expandedSections, onToggleSection, formData, errors, onUpdate }) => {
    const [basicCompanyInfo, setBasicCompanyInfo] = useState({
        companyName: "",
        businessType: "",
        taxType: "",
        taxScheme: "",
    });

    useEffect(() => {
        setBasicCompanyInfo({
            companyName: formData?.companyName || "",
            businessType: formData?.companyType || "",
            taxType: formData?.taxType || "",
            taxScheme: formData?.taxScheme || "",
        });
    }, [formData]);

    const handleLocalUpdate = (field, value) => {
        setBasicCompanyInfo((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleReduxUpdate = () => {
        onUpdate(basicCompanyInfo);
    };

    const handleSelectChange = (field, value) => {
        const updatedState = { ...basicCompanyInfo, [field]: value };
        setBasicCompanyInfo(updatedState);
        onUpdate(updatedState);
    };

    return (
        <CollapsibleSection
            isOpen={expandedSections.basicCompanyInfo}
            onToggle={() => onToggleSection("basicCompanyInfo")}
            icon={Building2}
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            title="Basic Company Information"
            subtitle="Company details and registration"
            fieldCount="4 fields"
        >
            <Box>
                <Grid container rowSpacing={0} columnSpacing={2}>
                    <Grid item size={{ sm: 12, md: 6 }}>
                        <FormField
                            label="Company Name"
                            required
                            error={!!errors.companyName}
                        >
                            <Input
                                placeholder="Enter company name"
                                value={basicCompanyInfo.companyName}
                                onChange={(e) => handleLocalUpdate("companyName", e.target.value)}
                                onBlur={handleReduxUpdate}
                                error={errors?.companyName}
                                helperText="Company name is required"
                            />
                            {/* <CustomInput
                                placeholder="Enter company name"
                                value={basicCompanyInfo.companyName}
                                onChange={(e) => handleLocalUpdate("companyName", e.target.value)}
                                error={errors?.companyName}
                                helperText="Company name is required"
                            /> */}
                        </FormField>
                    </Grid>
                    <Grid item size={{ sm: 12, md: 6 }}>
                        <FormField label="Company Type">
                            <Select
                                placeholder="Select type"
                                value={basicCompanyInfo.companyType}
                                onChange={(e) => handleSelectChange("businessType", e.target.value)}
                                options={[
                                    { value: "pvt", label: "Private Limited Company" },
                                    { value: "llp", label: "Limited Liability Partnership" },
                                    { value: "partnership", label: "Partnership Firm" },
                                    { value: "sole", label: "Sole Proprietorship" },
                                ]}
                            />
                            {/* <CustomAutocomplete
                                label="Company Type"
                                options={[
                                    { value: "pvt", label: "Private Limited Company" },
                                    { value: "llp", label: "Limited Liability Partnership" },
                                    { value: "partnership", label: "Partnership Firm" },
                                    { value: "sole", label: "Sole Proprietorship" },
                                ]}
                                value={basicCompanyInfo.companyType}
                                onChange={(e, newValue) => handleSelectChange("businessType", newValue?.value)}
                            /> */}
                        </FormField>
                    </Grid>
                    <Grid item size={{ sm: 12, md: 6 }}>
                        <FormField label="Tax Type">
                            <Select
                                placeholder="Select tax type"
                                value={basicCompanyInfo.taxType}
                                onChange={(e) => handleSelectChange("taxType", e.target.value)}
                                options={[
                                    { value: "gst", label: "GST Registered" },
                                    { value: "vat", label: "VAT Registered" },
                                    { value: "none", label: "Not Registered" },
                                ]}
                            />
                        </FormField>
                    </Grid>
                    <Grid item size={{ sm: 12, md: 6 }}>
                        <FormField label="Tax Scheme">
                            <Select
                                placeholder="Select scheme"
                                value={basicCompanyInfo.taxScheme}
                                onChange={(e) => handleSelectChange("taxScheme", e.target.value)}
                                options={[
                                    { value: "regular", label: "Regular Scheme" },
                                    { value: "composition", label: "Composition Scheme" },
                                ]}
                            />
                        </FormField>
                    </Grid>
                </Grid>
            </Box>
        </CollapsibleSection>
    );
};

export default BasicCompanyInfoSection;