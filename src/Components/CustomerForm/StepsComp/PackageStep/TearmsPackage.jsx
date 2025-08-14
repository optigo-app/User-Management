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
                <FormField label="E-Catalog Package" tooltip="Digital catalog access level">
                    <Select
                        id="eCatalogPackage"
                        placeholder="Select package level"
                        value={formData.eCatalogPackage || ""}
                        onChange={(e) => handleChange("eCatalogPackage", e.target.value)}
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
                <FormField label="Select adhoc access" tooltip="Allow one-time catalog purchases">
                    <Select
                        id="adhocAccess"
                        placeholder="Select adhoc access"
                        value={formData.adhocAccess || ""}
                        onChange={(e) => handleChange("adhocAccess", e.target.value)}
                        options={[
                            { value: "enabled", label: "✅ Enabled" },
                            { value: "disabled", label: "❌ Disabled" },
                        ]}
                    />
                </FormField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Select policy duration" tooltip="Duration of the pricing policy">
                    <Select
                        id="policyDuration"
                        placeholder="Select policy duration"
                        value={formData.policyDuration || ""}
                        onChange={(e) => handleChange("policyDuration", e.target.value)}
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