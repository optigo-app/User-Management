import React, { useState, useEffect } from "react";
import { Box, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { FormField, InputWithIcon, OptionGrid, Select } from "../../../Ui";
import { DollarSign, Percent } from "lucide-react";

const initialBrokerageConfig = {
    assignBroker: "",
    commissionStructure: "fixed",
    fixedAmount: "",
    percentageRate: "",
    commissionApplicableOn: [],
};

export default function BrokerageComp({ formData, errors, onUpdate }) {
    const [brokerageConfig, setBrokerageConfig] = useState(initialBrokerageConfig);

    useEffect(() => {
        setBrokerageConfig(formData);
    }, [])

    const handleBlur = (key, value) => {
        const updatedConfig = { ...brokerageConfig, [key]: value };
        onUpdate(updatedConfig);
    };

    const handleBrokerageChange = (key, value) => {
        setBrokerageConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleCommissionStructureChange = (e) => {
        const value = e.target.value;
        const updatedConfig = { ...brokerageConfig, commissionStructure: value };
        setBrokerageConfig(updatedConfig);
        onUpdate(updatedConfig);
    };

    const handleCommissionApplicableChange = (option) => {
        setBrokerageConfig((prevState) => {
            const prevSelections = prevState.commissionApplicableOn || [];

            let updatedSelections;
            if (prevSelections.includes(option)) {
                updatedSelections = prevSelections.filter(item => item !== option);
            } else {
                updatedSelections = [...prevSelections, option];
            }
            onUpdate({ commissionApplicableOn: updatedSelections });
            return { ...prevState, commissionApplicableOn: updatedSelections };
        });
    };

    const options = [
        { id: "diamond", label: "Diamond Value", icon: "💎" },
        { id: "stone", label: "Stone Value", icon: "🔮" },
        { id: "metal", label: "Metal Value", icon: "🥇" },
        { id: "labour", label: "Labour Charges", icon: "🔨" },
        { id: "total", label: "Total Amount", icon: "💰" },
    ];

    return (
        <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid size={{ xs: 12 }}>
                <FormField label="Assign Broker" tooltip="Select the broker for this customer">
                    <Select
                        id="assignBroker"
                        placeholder="Choose broker"
                        value={formData.assignBroker || ""}
                        onChange={(e) => handleBrokerageChange("assignBroker", e.target.value)}
                        options={[
                            { value: "john", label: "John Smith" },
                            { value: "sarah", label: "Sarah Johnson" },
                            { value: "jenis", label: "Jenis" },
                            { value: "shivam", label: "Shivam" },
                        ]}
                    />
                </FormField>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Box>
                    <FormField label="Commission Type" tooltip="Select the type of commission calculation">
                        <RadioGroup
                            value={brokerageConfig.commissionStructure || "fixed"}
                            onChange={handleCommissionStructureChange}
                        >
                            <Grid container spacing={2}>
                                {[
                                    {
                                        value: "fixed",
                                        label: "Fixed Amount",
                                        description: "Set dollar amount per transaction",
                                    },
                                    {
                                        value: "percentage",
                                        label: "Percentage",
                                        description: "Percentage of transaction value",
                                    },
                                    {
                                        value: "criteria",
                                        label: "Criteria-based",
                                        description: "Based on specific conditions",
                                    },
                                ]?.map(({ value, label, description }) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={value}>
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                cursor: "pointer",
                                                transition: "all 0.2s",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                    borderColor: "primary.main"
                                                },
                                                ...(brokerageConfig.commissionStructure === value && {
                                                    borderColor: "primary.main",
                                                    bgcolor: "primary.50",
                                                }),
                                            }}
                                            onClick={() => handleCommissionStructureChange({ target: { value } })}
                                        >
                                            <FormControlLabel
                                                value={value}
                                                control={<Radio />}
                                                label={
                                                    <Box>
                                                        <Typography variant="body1" fontWeight="medium">
                                                            {label}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {description}
                                                        </Typography>
                                                    </Box>
                                                }
                                                sx={{
                                                    m: 0,
                                                    p: 2,
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    "& .MuiFormControlLabel-label": { pl: 1, width: "100%" }
                                                }}
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroup>
                    </FormField>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Fixed Commission Amount" tooltip="Fixed dollar amount per transaction">
                    <InputWithIcon
                        id="fixedAmount"
                        type="number"
                        icon={DollarSign}
                        placeholder="0.00"
                        disabled={brokerageConfig.commissionStructure !== "fixed"}
                        value={brokerageConfig.fixedAmount || ""}
                        onChange={(e) => handleBrokerageChange("fixedAmount", e.target.value)}
                        onBlur={(e) => handleBlur("fixedAmount", e.target.value)}
                    />
                </FormField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormField label="Percentage Commission Rate" tooltip="Percentage rate for commission calculation">
                    <InputWithIcon
                        id="percentageRate"
                        type="number"
                        icon={Percent}
                        placeholder="0.00"
                        disabled={brokerageConfig.commissionStructure !== "percentage"}
                        value={brokerageConfig.percentageRate || ""}
                        onChange={(e) => handleBrokerageChange("percentageRate", e.target.value)}
                        onBlur={(e) => handleBlur("percentageRate", e.target.value)}
                    />
                </FormField>
            </Grid>
            {brokerageConfig.commissionStructure === "criteria" && (
                <Grid item xs={12}>
                    <FormField label="Commission Applicable On" tooltip="Select transaction components for commission calculation">
                        <Grid container spacing={2}>
                            <OptionGrid
                                options={options}
                                selected={brokerageConfig.commissionApplicableOn}
                                onChange={(value) => handleCommissionApplicableChange(value)}
                            />
                        </Grid>
                    </FormField>
                </Grid>
            )}
        </Grid>
    );
}