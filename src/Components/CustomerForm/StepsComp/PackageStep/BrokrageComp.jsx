import React, { useState, useEffect } from "react";
import { Box, Checkbox, Collapse, Divider, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography, useTheme } from "@mui/material";
import { FormField, InputWithIcon, OptionGrid, Select } from "../../../Ui";
import { ChevronRight, DollarSign, Percent } from "lucide-react";

const initialBrokerageConfig = {
    assignBroker: "",
    commissionStructure: "fixed",
    fixedAmount: "",
    percentageRate: "",
    commissionApplicableOn: [],
};

export default function BrokerageComp({ formData, errors, onUpdate }) {
    const theme = useTheme();
    const [brokerageConfig, setBrokerageConfig] = useState(initialBrokerageConfig);
    const [showCommissionCalculation, setShowCommissionCalculation] = useState(false);

    useEffect(() => {
        setBrokerageConfig(formData);
    }, [])

    const handleBlur = (e) => {
        const { id, value } = e.target;
        const updatedConfig = { ...brokerageConfig, [id]: value };
        onUpdate(updatedConfig);
    };

    const handleBrokerageChange = (e) => {
        const { id, value } = e.target;
        setBrokerageConfig(prev => ({ ...prev, [id]: value }));
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

    const calculateCommission = () => {
        const { commissionStructure, fixedAmount, percentageRate } = brokerageConfig;
        const transactionAmount = 1000;
        if (commissionStructure === "fixed") {
            return `$${parseFloat(fixedAmount || "0").toFixed(2)}`;
        } else if (commissionStructure === "percentage") {
            const calculatedValue = (transactionAmount * parseFloat(percentageRate || "0")) / 100;
            return `$${calculatedValue.toFixed(2)}`;
        }
        return "$0.00";
    };

    return (
        <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid size={{ xs: 12 }}>
                <FormField label="Assign Broker" tooltip="Select the broker for this customer">
                    <Select
                        id="assignBroker"
                        placeholder="Choose broker"
                        value={brokerageConfig.assignBroker || ""}
                        onChange={handleBrokerageChange}
                        onBlur={handleBlur}
                    >
                        <option value="john">John Smith</option>
                        <option value="sarah">Sarah Johnson</option>
                        <option value="jenis">Jenis</option>
                        <option value="shivam">Shivam</option>
                    </Select>
                </FormField>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Box>
                    <FormField label="Commission Type" tooltip="Select the type of commission calculation">
                        <RadioGroup
                            value={brokerageConfig.commissionStructure}
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
                        onChange={handleBrokerageChange}
                        onBlur={handleBlur}
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
                        onChange={handleBrokerageChange}
                        onBlur={handleBlur}
                    />
                </FormField>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <button
                        type="button"
                        onClick={() => setShowCommissionCalculation(!showCommissionCalculation)}
                        className="toggle-button"
                        style={{ marginBottom: '15px' }}
                    >
                        <ChevronRight
                            className={`toggle-icon ${showCommissionCalculation ? "rotate" : ""}`}
                        />
                        <span>Commission Calculation</span>
                        <span className="toggle-subtext">
                            (Click to {showCommissionCalculation ? "hide" : "show"})
                        </span>
                    </button>
                    <Collapse in={showCommissionCalculation}>
                        <Box
                            sx={{
                                mt: 1,
                                p: 2,
                                bgcolor: theme.palette.action.hover,
                                borderRadius: 1,
                                fontSize: "0.875rem",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                }}
                            >
                                <Typography variant="body2">Transaction Amount:</Typography>
                                <Typography variant="body2" fontWeight="medium">$1,000.00</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 1,
                                    textTransform: "capitalize",
                                }}
                            >
                                <Typography variant="body2">Commission Structure:</Typography>
                                <Typography variant="body2" fontWeight="medium">{brokerageConfig.commissionStructure}</Typography>
                            </Box>
                            {brokerageConfig.commissionStructure === "fixed" && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2">Fixed Amount:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        ${brokerageConfig.fixedAmount || "0.00"}
                                    </Typography>
                                </Box>
                            )}
                            {brokerageConfig.commissionStructure === "percentage" && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2">Commission Rate:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {brokerageConfig.percentageRate || "0"}%
                                    </Typography>
                                </Box>
                            )}
                            <Divider sx={{ my: 1 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: theme.palette.success.main,
                                    fontWeight: "medium",
                                }}
                            >
                                <Typography variant="body2">Final Commission:</Typography>
                                <Typography variant="body2">
                                    {calculateCommission()}
                                </Typography>
                            </Box>
                        </Box>
                    </Collapse>
                </Box>
            </Grid>
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
        </Grid>
    );
}