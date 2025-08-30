import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { FormField } from '../../../Ui';
import CustomInput from '../../../Ui/CustomInput';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';

const StaffFamilySection = ({ formData, errors, onUpdate }) => {
    const handleChange = (field, value) => {
        onUpdate({
            ...formData,
            [field]: value
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#374151', fontWeight: 600 }}>
                Staff & Family Information
            </Typography>
            
            <Grid container spacing={3}>
                {/* Emergency Contact */}
                <Grid size={{xs: 12}}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#6b7280' }}>
                        Emergency Contact
                    </Typography>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Emergency Contact Name" required>
                        <CustomInput
                            placeholder="Enter emergency contact name"
                            value={formData?.emergencyContactName || ''}
                            onChange={(e) => handleChange('emergencyContactName', e.target.value)}
                            error={!!errors?.emergencyContactName}
                            helperText={errors?.emergencyContactName}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Emergency Contact Phone" required>
                        <CustomInput
                            placeholder="Enter emergency contact phone"
                            value={formData?.emergencyContactPhone || ''}
                            onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
                            error={!!errors?.emergencyContactPhone}
                            helperText={errors?.emergencyContactPhone}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Relationship">
                        <CustomAutocomplete
                            placeholder="Select relationship"
                            value={[{value: 'spouse', label: 'Spouse'}, {value: 'parent', label: 'Parent'}, {value: 'child', label: 'Child'}, {value: 'sibling', label: 'Sibling'}, {value: 'friend', label: 'Friend'}, {value: 'other', label: 'Other'}].find(rel => rel.value === formData?.emergencyContactRelation) || null}
                            onChange={(e, newValue) => handleChange('emergencyContactRelation', newValue?.value || '')}
                            options={[{value: 'spouse', label: 'Spouse'}, {value: 'parent', label: 'Parent'}, {value: 'child', label: 'Child'}, {value: 'sibling', label: 'Sibling'}, {value: 'friend', label: 'Friend'}, {value: 'other', label: 'Other'}]}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.emergencyContactRelation}
                            helperText={errors?.emergencyContactRelation}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Emergency Contact Address">
                        <CustomInput
                            placeholder="Enter emergency contact address"
                            value={formData?.emergencyContactAddress || ''}
                            onChange={(e) => handleChange('emergencyContactAddress', e.target.value)}
                            error={!!errors?.emergencyContactAddress}
                            helperText={errors?.emergencyContactAddress}
                            multiline
                            rows={2}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs: 12}}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#6b7280' }}>
                        Family Information
                    </Typography>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Marital Status">
                        <CustomAutocomplete
                            placeholder="Select marital status"
                            value={[{value: 'single', label: 'Single'}, {value: 'married', label: 'Married'}, {value: 'divorced', label: 'Divorced'}, {value: 'widowed', label: 'Widowed'}].find(status => status.value === formData?.maritalStatus) || null}
                            onChange={(e, newValue) => handleChange('maritalStatus', newValue?.value || '')}
                            options={[{value: 'single', label: 'Single'}, {value: 'married', label: 'Married'}, {value: 'divorced', label: 'Divorced'}, {value: 'widowed', label: 'Widowed'}]}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.maritalStatus}
                            helperText={errors?.maritalStatus}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Number of Dependents">
                        <CustomInput
                            type="number"
                            placeholder="0"
                            value={formData?.numberOfDependents || ''}
                            onChange={(e) => handleChange('numberOfDependents', e.target.value)}
                            error={!!errors?.numberOfDependents}
                            helperText={errors?.numberOfDependents}
                            inputProps={{ min: 0 }}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Spouse Name">
                        <CustomInput
                            placeholder="Enter spouse name"
                            value={formData?.spouseName || ''}
                            onChange={(e) => handleChange('spouseName', e.target.value)}
                            error={!!errors?.spouseName}
                            helperText={errors?.spouseName}
                            disabled={formData?.maritalStatus !== 'married'}
                        />
                    </FormField>
                </Grid>
                
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Spouse Occupation">
                        <CustomInput
                            placeholder="Enter spouse occupation"
                            value={formData?.spouseOccupation || ''}
                            onChange={(e) => handleChange('spouseOccupation', e.target.value)}
                            error={!!errors?.spouseOccupation}
                            helperText={errors?.spouseOccupation}
                            disabled={formData?.maritalStatus !== 'married'}
                        />
                    </FormField>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StaffFamilySection;
