import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { FormField, Select } from "../../../Ui";

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
                    <Select
                        id="eCatPackage"
                        placeholder="Select package level"
                        value={formData.eCatPackage || ""}
                        onChange={(e) => handleChange("eCatPackage", e.target.value)}
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
                    <Select
                        id="eCatAdhocPackage"
                        placeholder="Select adhoc access"
                        value={formData.eCatAdhocPackage || ""}
                        onChange={(e) => handleChange("eCatAdhocPackage", e.target.value)}
                        options={[
                            { value: "enabled", label: "✅ Enabled" },
                            { value: "disabled", label: "❌ Disabled" },
                        ]}
                    />
                </FormField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Policy Terms" tooltip="Duration of the pricing policy">
                    <Select
                        id="eCatPolicyDuration"
                        placeholder="Select policy duration"
                        value={formData.eCatPolicyDuration || ""}
                        onChange={(e) => handleChange("eCatPolicyDuration", e.target.value)}
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