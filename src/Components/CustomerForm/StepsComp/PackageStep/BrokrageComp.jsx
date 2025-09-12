import React, { useState, useEffect } from "react";
import { Box, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { FormField, Select } from "../../../Ui";
import CustomAutocomplete from "../../../Ui/ReusableAutocomplete";
import CustomInput from "../../../Ui/CustomInput";
import { ToggleSwitch } from "../../../Ui/ToggleSwitch";

const initialBrokerageConfig = {
    assignBroker: "",
    commissionStructure: "fixed",
    fixedAmount: "",
    percentageRate: "",
    criteriaBasedEnabled: false,
    brokerageType: "Amount", // Amount or Percentage
    selectedCategory: "labour", // diamond, stone, metal, labour, total
    diamondCategory: "Ctw",
    stoneCategory: "",
    metalCategory: "",
    commissionValue: "0",
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

    const handleBrokerageTypeChange = (e) => {
        const updatedConfig = { ...brokerageConfig, brokerageType: e.target.value };
        setBrokerageConfig(updatedConfig);
        onUpdate(updatedConfig);
    };

    const handleCategorySelection = (category) => {
        const updatedConfig = { ...brokerageConfig, selectedCategory: category };
        setBrokerageConfig(updatedConfig);
        onUpdate(updatedConfig);
    };

    const handleCategoryDropdownChange = (categoryType, value) => {
        const updatedConfig = { ...brokerageConfig, [categoryType]: value };
        setBrokerageConfig(updatedConfig);
        onUpdate(updatedConfig);
    };

    return (
        <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid size={{ xs: 12 }}>
                <FormField label="Assign Broker" tooltip="Select the broker for this customer">
                    <CustomAutocomplete
                        id="assignBroker"
                        placeholder="Choose broker"
                        value={formData.assignBroker || ""}
                        onChange={(e, newValue) => handleBrokerageChange("assignBroker", newValue)}
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
            {brokerageConfig.commissionStructure !== "criteria" && (
                <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormField label="Fixed Commission Amount" tooltip="Fixed dollar amount per transaction">
                            <CustomInput
                                id="fixedAmount"
                                type="number"
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
                            <CustomInput
                                id="percentageRate"
                                type="number"
                                placeholder="0.00"
                                disabled={brokerageConfig.commissionStructure !== "percentage"}
                                value={brokerageConfig.percentageRate || ""}
                                onChange={(e) => handleBrokerageChange("percentageRate", e.target.value)}
                                onBlur={(e) => handleBlur("percentageRate", e.target.value)}
                            />
                        </FormField>
                    </Grid>
                </>
            )}
            {brokerageConfig.commissionStructure === "criteria" && (
                <Grid size={{ xs: 12 }}>
                    <Grid container spacing={1}>
                        {/* Top Row - Brokerage Type and Value */}
                        <Grid size={{ xs: 12 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormField
                                        label="Brokerage Type"
                                        tooltip="Select the type of brokerage"
                                    >
                                        <Select
                                            value={brokerageConfig.brokerageType}
                                            onChange={handleBrokerageTypeChange}
                                            options={[
                                                { value: "Amount", label: "Amount" },
                                                { value: "Percentage", label: "Percentage" }
                                            ]}
                                            style={{ minWidth: "120px" }}
                                        />
                                    </FormField>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormField label="Commission Value">
                                        <CustomInput
                                            type="number"
                                            placeholder={brokerageConfig.brokerageType === "Percentage" ? "0.00%" : "0.00"}
                                            value={brokerageConfig.commissionValue}
                                            onChange={(e) => handleBrokerageChange("commissionValue", e.target.value)}
                                            onBlur={(e) => handleBlur("commissionValue", e.target.value)}
                                        />
                                    </FormField>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Categories with Toggle Switches */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                Apply Commission On
                            </Typography>
                            <Grid container spacing={3}>
                                {/* Diamond */}
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderColor: brokerageConfig.selectedCategory === "diamond" ? "primary.main" : "grey.300",
                                            bgcolor: brokerageConfig.selectedCategory === "diamond" ? "primary.50" : "transparent",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                            <Typography variant="body2" fontWeight="500">💎 Diamond</Typography>
                                            <ToggleSwitch
                                                checked={brokerageConfig.selectedCategory === "diamond"}
                                                onChange={() => handleCategorySelection("diamond")}
                                                activeColor="#1976d2"
                                                inactiveColor="#e0e0e0"
                                            />
                                        </Box>
                                        {brokerageConfig.selectedCategory === "diamond" && (
                                            <Select
                                                value={brokerageConfig.diamondCategory}
                                                onChange={(e) => handleCategoryDropdownChange("diamondCategory", e.target.value)}
                                                options={[
                                                    { value: "Ctw", label: "Ctw" },
                                                    { value: "Piece", label: "Piece" },
                                                    { value: "Gram", label: "Gram" }
                                                ]}
                                                placeholder="Select unit"
                                            />
                                        )}
                                    </Paper>
                                </Grid>

                                {/* Stone */}
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderColor: brokerageConfig.selectedCategory === "stone" ? "primary.main" : "grey.300",
                                            bgcolor: brokerageConfig.selectedCategory === "stone" ? "primary.50" : "transparent",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                            <Typography variant="body2" fontWeight="500">🔮 Stone</Typography>
                                            <ToggleSwitch
                                                checked={brokerageConfig.selectedCategory === "stone"}
                                                onChange={() => handleCategorySelection("stone")}
                                                activeColor="#1976d2"
                                                inactiveColor="#e0e0e0"
                                            />
                                        </Box>
                                        {brokerageConfig.selectedCategory === "stone" && (
                                            <Select
                                                value={brokerageConfig.stoneCategory}
                                                onChange={(e) => handleCategoryDropdownChange("stoneCategory", e.target.value)}
                                                options={[
                                                    { value: "Ctw", label: "Ctw" },
                                                    { value: "Piece", label: "Piece" },
                                                    { value: "Gram", label: "Gram" }
                                                ]}
                                                placeholder="Select unit"
                                            />
                                        )}
                                    </Paper>
                                </Grid>

                                {/* Metal */}
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderColor: brokerageConfig.selectedCategory === "metal" ? "primary.main" : "grey.300",
                                            bgcolor: brokerageConfig.selectedCategory === "metal" ? "primary.50" : "transparent",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                            <Typography variant="body2" fontWeight="500">🥇 Metal</Typography>
                                            <ToggleSwitch
                                                checked={brokerageConfig.selectedCategory === "metal"}
                                                onChange={() => handleCategorySelection("metal")}
                                                activeColor="#1976d2"
                                                inactiveColor="#e0e0e0"
                                            />
                                        </Box>
                                        {brokerageConfig.selectedCategory === "metal" && (
                                            <Select
                                                value={brokerageConfig.metalCategory}
                                                onChange={(e) => handleCategoryDropdownChange("metalCategory", e.target.value)}
                                                options={[
                                                    { value: "Gram", label: "Gram" },
                                                    { value: "Kg", label: "Kg" },
                                                    { value: "Tola", label: "Tola" }
                                                ]}
                                                placeholder="Select unit"
                                            />
                                        )}
                                    </Paper>
                                </Grid>

                                {/* Labour Amount */}
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderColor: brokerageConfig.selectedCategory === "labour" ? "primary.main" : "grey.300",
                                            bgcolor: brokerageConfig.selectedCategory === "labour" ? "primary.50" : "transparent",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Typography variant="body2" fontWeight="500">🔨 Labour Amount</Typography>
                                            <ToggleSwitch
                                                checked={brokerageConfig.selectedCategory === "labour"}
                                                onChange={() => handleCategorySelection("labour")}
                                                activeColor="#1976d2"
                                                inactiveColor="#e0e0e0"
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>

                                {/* Total Amount */}
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderColor: brokerageConfig.selectedCategory === "total" ? "primary.main" : "grey.300",
                                            bgcolor: brokerageConfig.selectedCategory === "total" ? "primary.50" : "transparent",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Typography variant="body2" fontWeight="500">💰 Total Amount</Typography>
                                            <ToggleSwitch
                                                checked={brokerageConfig.selectedCategory === "total"}
                                                onChange={() => handleCategorySelection("total")}
                                                activeColor="#1976d2"
                                                inactiveColor="#e0e0e0"
                                            />
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}