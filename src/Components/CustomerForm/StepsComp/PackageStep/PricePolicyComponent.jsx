import React, { useState, useEffect } from 'react';
import { FormField, InputWithIcon } from '../../../Ui';
import { DollarSign } from 'lucide-react';
import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';

const PricePolicyComponent = ({ formData, errors, onUpdate }) => {
    const [pricePolicy, setPricePolicy] = useState({
        diamondPrice: "",
        colorStonePrice: "",
        labourCharges: "",
        settingCharges: "",
        excludePremium: false,
    });

    useEffect(() => {
        setPricePolicy(formData);
    }, [formData]);

    const handleBlur = (e) => {
        const { id, value } = e.target;
        const updatedPolicy = { ...pricePolicy, [id]: value };
        onUpdate(updatedPolicy);
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        const updatedPolicy = { ...pricePolicy, [id]: checked };
        setPricePolicy(updatedPolicy);
        onUpdate(updatedPolicy);
    };

    return (
        <div>
            <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid size={{xs:12, sm:6}}>
                    <FormField label="Diamond Price" tooltip="Base price per carat for diamonds">
                        <InputWithIcon
                            id="diamondPrice"
                            icon={DollarSign}
                            placeholder="0.00"
                            value={pricePolicy.diamondPrice || ""}
                            onChange={(e) => setPricePolicy(prev => ({ ...prev, diamondPrice: e.target.value }))}
                            onBlur={handleBlur}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                    <FormField label="Color Stone Price" tooltip="Price per carat for colored gemstones">
                        <InputWithIcon
                            id="colorStonePrice"
                            icon={DollarSign}
                            placeholder="0.00"
                            value={pricePolicy.colorStonePrice || ""}
                            onChange={(e) => setPricePolicy(prev => ({ ...prev, colorStonePrice: e.target.value }))}
                            onBlur={handleBlur}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                    <FormField label="Labour Charges" tooltip="Manufacturing and crafting charges">
                        <InputWithIcon
                            id="labourCharges"
                            icon={DollarSign}
                            placeholder="0.00"
                            value={pricePolicy.labourCharges || ""}
                            onChange={(e) => setPricePolicy(prev => ({ ...prev, labourCharges: e.target.value }))}
                            onBlur={handleBlur}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                    <FormField label="Setting Charges" tooltip="Stone setting and mounting charges">
                        <InputWithIcon
                            id="settingCharges"
                            icon={DollarSign}
                            placeholder="0.00"
                            value={pricePolicy.settingCharges || ""}
                            onChange={(e) => setPricePolicy(prev => ({ ...prev, settingCharges: e.target.value }))}
                            onBlur={handleBlur}
                        />
                    </FormField>
                </Grid>
                <Grid size={{xs:12}}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        p={2}
                        border={1}
                        borderColor="grey.300"
                        borderRadius={2}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    id="excludePremium" 
                                    checked={pricePolicy.excludePremium || false}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                        Exclude Premium Design Charges
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Skip additional charges for premium or designer pieces
                                    </Typography>
                                </Box>
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default PricePolicyComponent;