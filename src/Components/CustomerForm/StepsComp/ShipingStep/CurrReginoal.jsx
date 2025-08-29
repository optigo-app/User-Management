import React from "react";
import { Grid } from "@mui/material";
import { FormField, Select } from "../../../Ui";
import CustomAutocomplete from "../../../Ui/ReusableAutocomplete";

export default function CurrReginoal({ formData, onUpdate }) {
    const handleChange = (field, value) => {
        onUpdate({
            ...formData,
            [field]: value
        });
    };

    return (
        <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Primary Currency" tooltip="Main currency for transactions">
                    <CustomAutocomplete
                        placeholder="Select primary currency"
                        value={formData.primaryCurrency || ""}
                        onChange={(e, newValue) => handleChange("primaryCurrency", newValue)}
                        options={[
                            { value: "usd", label: "💵 USD - US Dollar" },
                            { value: "inr", label: "🇮🇳 INR - Indian Rupee" },
                            { value: "eur", label: "🇪🇺 EUR - Euro" },
                            { value: "gbp", label: "🇬🇧 GBP - British Pound" },
                        ]}
                    />
                </FormField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Secondary Currency" tooltip="Alternative currency for pricing">
                    <CustomAutocomplete
                        placeholder="Select secondary currency"
                        value={formData.secondaryCurrency || ""}
                        onChange={(e, newValue) => handleChange("secondaryCurrency", newValue)}
                        options={[
                            { value: "none", label: "❌ No Secondary Currency" },
                            { value: "usd", label: "💵 USD - US Dollar" },
                            { value: "inr", label: "🇮🇳 INR - Indian Rupee" },
                        ]}
                    />
                </FormField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Time Zone" tooltip="Customer's local time zone">
                    <CustomAutocomplete
                        placeholder="Select time zone"
                        value={formData.timeZone || ""}
                        onChange={(e, newValue) => handleChange("timeZone", newValue)}
                        options={[
                            { value: "est", label: "🇺🇸 EST - Eastern Time" },
                            { value: "pst", label: "🇺🇸 PST - Pacific Time" },
                            { value: "ist", label: "🇮🇳 IST - India Time" },
                            { value: "gmt", label: "🇬🇧 GMT - Greenwich Time" },
                        ]}
                    />
                </FormField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Date Format" tooltip="Preferred date display format">
                    <CustomAutocomplete
                        placeholder="Select date format"
                        value={formData.dateFormat || ""}
                        onChange={(e, newValue) => handleChange("dateFormat", newValue)}
                        options={[
                            { value: "mm/dd/yyyy", label: "📅 MM/DD/YYYY" },
                            { value: "dd/mm/yyyy", label: "📅 DD/MM/YYYY" },
                            { value: "yyyy-mm-dd", label: "📅 YYYY-MM-DD" },
                        ]}
                    />
                </FormField>
            </Grid>
        </Grid>
    );
}