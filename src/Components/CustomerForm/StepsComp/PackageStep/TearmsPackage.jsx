import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { FormField, Select } from "../../../Ui";
import CustomAutocomplete from "../../../Ui/ReusableAutocomplete";

export default function TearmsPackage({ formData, errors, onUpdate }) {
    const [termsPackage, setTermsPackage] = useState({
        eCatalogPackage: "",
        adhocAccess: "",
        policyDuration: "",
    });

    useEffect(() => {
        setTermsPackage(formData);
    }, [formData]);

    const handleChange = (field, value) => {
        setTermsPackage(prev => {
            const updatedPackage = { ...prev, [field]: value };
            onUpdate(updatedPackage);
            return updatedPackage;
        });
    };


    return (
        <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Ecat Package" tooltip="Digital catalog access level">
                    <CustomAutocomplete
                        id="eCatPackage"
                        placeholder="Select package level"
                        value={formData.eCatPackage || ""}
                        onChange={(e, newValue) => handleChange("eCatPackage", newValue)}
                        options={[
                            { value: "basic", label: "📦 Basic Package" },
                            { value: "premium", label: "⭐ Premium Package" },
                            { value: "enterprise", label: "🏢 Enterprise Package" },
                            { value: "custom", label: "🎯 Custom Package" },
                        ]}
                    />
                </FormField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Ecat Adhoc Package" tooltip="Allow one-time catalog purchases">
                    <CustomAutocomplete
                        id="eCatAdhocPackage"
                        placeholder="Select adhoc access"
                        value={formData.eCatAdhocPackage || ""}
                        onChange={(e, newValue) => handleChange("eCatAdhocPackage", newValue)}
                        options={[
                            { value: "enabled", label: "✅ Enabled" },
                            { value: "disabled", label: "❌ Disabled" },
                        ]}
                    />
                </FormField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Policy Terms" tooltip="Duration of the pricing policy">
                    <CustomAutocomplete
                        id="eCatPolicyDuration"
                        placeholder="Select policy duration"
                        value={formData.eCatPolicyDuration || ""}
                        onChange={(e, newValue) => handleChange("eCatPolicyDuration", newValue)}
                        options={[
                            { value: "monthly", label: "📅 Monthly (30 days)" },
                            { value: "quarterly", label: "📊 Quarterly (90 days)" },
                            { value: "half-yearly", label: "📈 Half-Yearly (180 days)" },
                            { value: "yearly", label: "🗓️ Yearly (365 days)" },
                        ]}
                    />
                </FormField>
            </Grid>
        </Grid>
    );
}