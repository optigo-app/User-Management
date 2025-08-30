import React from 'react';
import { 
    Box, 
    Grid, 
    Typography, 
    FormControlLabel,
    Switch,
    Card,
    CardContent,
    Chip
} from '@mui/material';
import { FormField } from '../../../Ui';
import CustomInput from '../../../Ui/CustomInput';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';

const SystemAccessSection = ({ formData, errors, onUpdate }) => {
    const handleChange = (field, value) => {
        onUpdate({
            ...formData,
            [field]: value
        });
    };

    const accessLevels = [
        { value: 'basic', label: 'Basic User', description: 'Limited access to core features' },
        { value: 'advanced', label: 'Advanced User', description: 'Extended access with additional features' },
        { value: 'admin', label: 'Administrator', description: 'Full system access and management' },
        { value: 'super_admin', label: 'Super Administrator', description: 'Complete system control' }
    ];

    const timeRestrictions = [
        { value: 'none', label: 'No Restrictions' },
        { value: 'business_hours', label: 'Business Hours Only (9 AM - 6 PM)' },
        { value: 'extended_hours', label: 'Extended Hours (7 AM - 10 PM)' },
        { value: 'custom', label: 'Custom Time Range' }
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#374151', fontWeight: 600 }}>
                System Access Configuration
            </Typography>
            
            <Grid container spacing={3}>
                {/* Access Level */}
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Access Level" required>
                        <CustomAutocomplete
                            placeholder="Select access level"
                            value={accessLevels.find(level => level.value === formData?.accessLevel) || null}
                            onChange={(e, newValue) => handleChange('accessLevel', newValue?.value || '')}
                            options={accessLevels}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.accessLevel}
                            helperText={errors?.accessLevel}
                        />
                    </FormField>
                </Grid>

                {/* Time Restrictions */}
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Time Restrictions">
                        <CustomAutocomplete
                            placeholder="Select time restrictions"
                            value={timeRestrictions.find(restriction => restriction.value === (formData?.timeRestrictions || 'none')) || null}
                            onChange={(e, newValue) => handleChange('timeRestrictions', newValue?.value || 'none')}
                            options={timeRestrictions}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.timeRestrictions}
                            helperText={errors?.timeRestrictions}
                        />
                    </FormField>
                </Grid>

                {/* Custom Time Range - Show only if custom is selected */}
                {formData?.timeRestrictions === 'custom' && (
                    <>
                        <Grid size={{xs: 12, md: 6}}>
                            <FormField label="Start Time">
                                <CustomInput
                                    type="time"
                                    value={formData?.customStartTime || ''}
                                    onChange={(e) => handleChange('customStartTime', e.target.value)}
                                    error={!!errors?.customStartTime}
                                    helperText={errors?.customStartTime}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <FormField label="End Time">
                                <CustomInput
                                    type="time"
                                    value={formData?.customEndTime || ''}
                                    onChange={(e) => handleChange('customEndTime', e.target.value)}
                                    error={!!errors?.customEndTime}
                                    helperText={errors?.customEndTime}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormField>
                        </Grid>
                    </>
                )}

                {/* System Features */}
                <Grid size={{xs: 12}}>
                    <Card sx={{ border: '1px solid #e5e7eb' }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
                                System Features Access
                            </Typography>
                            
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, md: 6}}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData?.canExportData || false}
                                                onChange={(e) => handleChange('canExportData', e.target.checked)}
                                            />
                                        }
                                        label="Data Export Permission"
                                    />
                                </Grid>
                                
                                <Grid size={{xs: 12, md: 6}}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData?.canImportData || false}
                                                onChange={(e) => handleChange('canImportData', e.target.checked)}
                                            />
                                        }
                                        label="Data Import Permission"
                                    />
                                </Grid>
                                
                                <Grid size={{xs: 12, md: 6}}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData?.canDeleteRecords || false}
                                                onChange={(e) => handleChange('canDeleteRecords', e.target.checked)}
                                            />
                                        }
                                        label="Delete Records Permission"
                                    />
                                </Grid>
                                
                                <Grid size={{xs: 12, md: 6}}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData?.canViewAuditLogs || false}
                                                onChange={(e) => handleChange('canViewAuditLogs', e.target.checked)}
                                            />
                                        }
                                        label="View Audit Logs"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* IP Restrictions */}
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Allowed IP Addresses" tooltip="Comma-separated IP addresses (optional)">
                        <CustomInput
                            placeholder="192.168.1.1, 10.0.0.1"
                            value={formData?.allowedIPs || ''}
                            onChange={(e) => handleChange('allowedIPs', e.target.value)}
                            error={!!errors?.allowedIPs}
                            helperText={errors?.allowedIPs}
                        />
                    </FormField>
                </Grid>

                {/* Session Timeout */}
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Session Timeout (minutes)" tooltip="Session timeout in minutes (5-480)">
                        <CustomInput
                            type="number"
                            value={formData?.sessionTimeout || '30'}
                            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                            error={!!errors?.sessionTimeout}
                            helperText={errors?.sessionTimeout}
                            inputProps={{ min: 5, max: 480 }}
                        />
                    </FormField>
                </Grid>

                {/* Account Status */}
                <Grid size={{xs: 12}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Account Status:
                        </Typography>
                        <Chip 
                            label={formData?.accountStatus || 'Active'} 
                            color={formData?.accountStatus === 'Active' ? 'success' : 'default'}
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData?.accountStatus === 'Active'}
                                    onChange={(e) => handleChange('accountStatus', e.target.checked ? 'Active' : 'Inactive')}
                                />
                            }
                            label="Active Account"
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SystemAccessSection;
