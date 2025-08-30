import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FormField } from '../../../Ui';
import CustomInput from '../../../Ui/CustomInput';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';

const IdCardSection = ({ formData, errors, onUpdate }) => {
    const handleChange = (field, value) => {
        onUpdate({
            ...formData,
            [field]: value
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#374151', fontWeight: 600 }}>
                Employee ID Card Details
            </Typography>
            
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Employee ID" required>
                        <CustomInput
                            placeholder="Enter employee ID"
                            value={formData?.employeeId || ''}
                            onChange={(e) => handleChange('employeeId', e.target.value)}
                            error={!!errors?.employeeId}
                            helperText={errors?.employeeId}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Card Number">
                        <CustomInput
                            placeholder="Enter card number"
                            value={formData?.cardNumber || ''}
                            onChange={(e) => handleChange('cardNumber', e.target.value)}
                            error={!!errors?.cardNumber}
                            helperText={errors?.cardNumber}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Issue Date">
                        <CustomInput
                            type="date"
                            value={formData?.issueDate || ''}
                            onChange={(e) => handleChange('issueDate', e.target.value)}
                            error={!!errors?.issueDate}
                            helperText={errors?.issueDate}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Expiry Date">
                        <CustomInput
                            type="date"
                            value={formData?.expiryDate || ''}
                            onChange={(e) => handleChange('expiryDate', e.target.value)}
                            error={!!errors?.expiryDate}
                            helperText={errors?.expiryDate}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Card Status">
                        <CustomAutocomplete
                            placeholder="Select card status"
                            value={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}, {value: 'suspended', label: 'Suspended'}].find(status => status.value === formData?.cardStatus) || null}
                            onChange={(e, newValue) => handleChange('cardStatus', newValue?.value || '')}
                            options={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}, {value: 'suspended', label: 'Suspended'}]}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.cardStatus}
                            helperText={errors?.cardStatus}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Access Level">
                        <CustomInput
                            placeholder="e.g., Level 1, Level 2, Admin"
                            value={formData?.accessLevel || ''}
                            onChange={(e) => handleChange('accessLevel', e.target.value)}
                            error={!!errors?.accessLevel}
                            helperText={errors?.accessLevel}
                        />
                    </FormField>
                </Grid>
            </Grid>
        </Box>
    );
};

export default IdCardSection;
