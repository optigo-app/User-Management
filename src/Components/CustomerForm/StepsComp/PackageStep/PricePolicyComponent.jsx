import React, { useState, useEffect } from 'react';
import { FormField, Select } from '../../../Ui';
import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';

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

    const handleSelectChange = (id, value) => {
        const updatedPolicy = { ...pricePolicy, [id]: value };
        setPricePolicy(updatedPolicy);
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
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField label="Diamond Price" tooltip="Base price per carat for diamonds">
                        <CustomAutocomplete
                            id="diamondPrice"
                            value={pricePolicy.diamondPrice || ""}
                            onChange={(e, newValue) => handleSelectChange('diamondPrice', newValue)}
                            options={[
                                { label: "$100", value: "100" },
                                { label: "$200", value: "200" },
                                { label: "$300", value: "300" },
                            ]}
                            placeholder="Select price"
                        />
                    </FormField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField label="Color Stone Price" tooltip="Price per carat for colored gemstones">
                        <CustomAutocomplete
                            id="colorStonePrice"
                            value={pricePolicy.colorStonePrice || ""}
                            onChange={(e, newValue) => handleSelectChange('colorStonePrice', newValue)}
                            options={[
                                { label: "$50", value: "50" },
                                { label: "$100", value: "100" },
                                { label: "$150", value: "150" },
                            ]}
                            placeholder="Select price"
                        />
                    </FormField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField label="Labour Charges" tooltip="Manufacturing and crafting charges">
                        <CustomAutocomplete
                            id="labourCharges"
                            value={pricePolicy.labourCharges || ""}
                            onChange={(e, newValue) => handleSelectChange('labourCharges', newValue)}
                            options={[
                                { label: "$20", value: "20" },
                                { label: "$40", value: "40" },
                                { label: "$60", value: "60" },
                            ]}
                            placeholder="Select charges"
                        />
                    </FormField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <FormField label="Setting Charges" tooltip="Stone setting and mounting charges">
                        <CustomAutocomplete
                            id="settingCharges"
                            value={pricePolicy.settingCharges || ""}
                            onChange={(e, newValue) => handleSelectChange('settingCharges', newValue)}
                            options={[
                                { label: "$10", value: "10" },
                                { label: "$20", value: "20" },
                                { label: "$30", value: "30" },
                            ]}
                            placeholder="Select charges"
                        />
                    </FormField>
                </Grid>
                <Grid size={{ xs: 12 }}>
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