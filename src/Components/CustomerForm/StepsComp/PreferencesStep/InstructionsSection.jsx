import React, { useState, useEffect } from "react";
import { Box, Grid, FormHelperText } from "@mui/material";
import { FormField, Textarea } from "../../../Ui";

const InstructionsSection = ({ formData, errors, onUpdate }) => {
    console.log('formData: ', formData);
    const [instructions, setInstructions] = useState({
        officeInstructions: "",
        userInstructions: "",
        customerInstructions: "",
        adminInstructions: "",
        otherInstructions: "",
    });
    
    useEffect(() => {
        if (formData) {
            setInstructions({
                officeInstructions: formData.officeInstructions || "",
                userInstructions: formData.userInstructions || "",
                customerInstructions: formData.customerInstructions || "",
                adminInstructions: formData.adminInstructions || "",
                otherInstructions: formData.otherInstructions || "",
            });
        }
    }, [formData]);

    const handleLocalChange = (field, value) => {
        setInstructions((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBlur = (field) => {
        onUpdate({ [field]: instructions[field] });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid size={{sx:12, sm:6}}>
                    <FormField
                        label="Office Instructions"
                        tooltip="Instructions for office staff"
                        error={!!errors?.officeInstructions}
                    >
                        <Textarea
                            id="officeInstructions"
                            placeholder="Special handling instructions for office staff..."
                            rows={3}
                            value={instructions.officeInstructions}
                            onChange={(e) => handleLocalChange("officeInstructions", e.target.value)}
                            onBlur={() => handleBlur("officeInstructions")}
                        />
                        {errors?.officeInstructions && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.officeInstructions}</FormHelperText>}
                    </FormField>
                </Grid>

                <Grid size={{sx:12, sm:6}}>
                    <FormField
                        label="User Instructions"
                        tooltip="Instructions for system users"
                        error={!!errors?.userInstructions}
                    >
                        <Textarea
                            id="userInstructions"
                            placeholder="Guidelines for system users..."
                            rows={3}
                            value={instructions.userInstructions}
                            onChange={(e) => handleLocalChange("userInstructions", e.target.value)}
                            onBlur={() => handleBlur("userInstructions")}
                        />
                        {errors?.userInstructions && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.userInstructions}</FormHelperText>}
                    </FormField>
                </Grid>

                <Grid size={{sx:12, sm:6}}>
                    <FormField
                        label="Customer Instructions"
                        tooltip="Instructions visible to customer"
                        error={!!errors?.customerInstructions}
                    >
                        <Textarea
                            id="customerInstructions"
                            placeholder="Information to display to customer..."
                            rows={3}
                            value={instructions.customerInstructions}
                            onChange={(e) => handleLocalChange("customerInstructions", e.target.value)}
                            onBlur={() => handleBlur("customerInstructions")}
                        />
                        {errors?.customerInstructions && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.customerInstructions}</FormHelperText>}
                    </FormField>
                </Grid>

                <Grid size={{sx:12, sm:6}}>
                    <FormField
                        label="Admin Instructions"
                        tooltip="Instructions for administrators"
                        error={!!errors?.adminInstructions}
                    >
                        <Textarea
                            id="adminInstructions"
                            placeholder="Administrative notes and instructions..."
                            rows={3}
                            value={instructions.adminInstructions}
                            onChange={(e) => handleLocalChange("adminInstructions", e.target.value)}
                            onBlur={() => handleBlur("adminInstructions")}
                        />
                        {errors?.adminInstructions && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.adminInstructions}</FormHelperText>}
                    </FormField>
                </Grid>

                <Grid size={{sx:12, sm:12}}>
                    <FormField
                        label="General Notes"
                        tooltip="Any other important information"
                        error={!!errors?.otherInstructions}
                    >
                        <Textarea
                            id="otherInstructions"
                            placeholder="Additional notes, special requirements, or important information..."
                            rows={4}
                            value={instructions.otherInstructions}
                            onChange={(e) => handleLocalChange("otherInstructions", e.target.value)}
                            onBlur={() => handleBlur("otherInstructions")}
                        />
                        {errors?.otherInstructions && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.otherInstructions}</FormHelperText>}
                    </FormField>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InstructionsSection;