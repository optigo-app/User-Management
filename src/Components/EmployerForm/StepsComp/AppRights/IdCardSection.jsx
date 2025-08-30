import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { CreditCard, Printer, Eye } from 'lucide-react';
import { FormField, CustomInput, CustomAutocomplete } from '../../../Ui';
import { IdCard, IdCardPreview } from '../../../Common/IdCard';

const IdCardSection = ({ formData, errors, onUpdate }) => {
    const [showPreview, setShowPreview] = useState(false);

    const cardStatusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
        { value: 'expired', label: 'Expired' }
    ];

    const cardTypeOptions = [
        { value: 'employee', label: 'Employee Card' },
        { value: 'contractor', label: 'Contractor Card' },
        { value: 'visitor', label: 'Visitor Card' },
        { value: 'temporary', label: 'Temporary Card' }
    ];

    const handleInputChange = (field, value) => {
        onUpdate({
            ...formData,
            idCard: {
                ...formData?.idCard,
                [field]: value
            }
        });
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handlePrint = () => {
        window.print();
    };

    // Prepare employee data for ID card
    const employeeData = {
        name: formData?.userInfo?.fullName || formData?.step1?.fullName || "Employee Name",
        employeeId: formData?.idCard?.cardNumber || "EMP001",
        position: formData?.idCard?.designation || "Employee",
        joiningDate: formData?.userInfo?.joiningDate || formData?.step1?.joiningDate || new Date().toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        }).toUpperCase(),
        company: "Classmate Corporation Pvt Ltd",
        address: "G20, Ground floor, ITC building, Surat -999077, Gujarat(India)",
        website: "WWW.OPTIGO.COM",
        phone: "T:+91-261-4890777",
        avatar: formData?.userInfo?.profilePhoto || formData?.step1?.profilePhoto
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <CreditCard size={24} color="#3498db" />
                <Typography variant="h6" sx={{ color: '#374151', fontWeight: 600 }}>
                    ID Card Information
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormField
                        label="Card Number"
                        required
                        tooltip="Unique identifier for the employee ID card"
                    >
                        <CustomInput
                            placeholder="Enter card number (e.g., EMP001)"
                            value={formData?.idCard?.cardNumber || ''}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            error={!!errors?.idCard?.cardNumber}
                        />
                    </FormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormField
                        label="Card Status"
                        required
                        tooltip="Current status of the ID card"
                    >
                        <CustomAutocomplete
                            options={cardStatusOptions}
                            value={cardStatusOptions.find(option => option.value === formData?.idCard?.status) || null}
                            onChange={(event, newValue) => handleInputChange('status', newValue?.value || '')}
                            placeholder="Select card status"
                            error={!!errors?.idCard?.status}
                        />
                    </FormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormField
                        label="Card Type"
                        required
                        tooltip="Type of ID card being issued"
                    >
                        <CustomAutocomplete
                            options={cardTypeOptions}
                            value={cardTypeOptions.find(option => option.value === formData?.idCard?.cardType) || null}
                            onChange={(event, newValue) => handleInputChange('cardType', newValue?.value || '')}
                            placeholder="Select card type"
                            error={!!errors?.idCard?.cardType}
                        />
                    </FormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormField
                        label="Designation"
                        required
                        tooltip="Employee designation to display on card"
                    >
                        <CustomInput
                            placeholder="Enter designation"
                            value={formData?.idCard?.designation || ''}
                            onChange={(e) => handleInputChange('designation', e.target.value)}
                            error={!!errors?.idCard?.designation}
                        />
                    </FormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormField
                        label="Issue Date"
                        tooltip="Date when the card was issued"
                    >
                        <CustomInput
                            type="date"
                            value={formData?.idCard?.issueDate || ''}
                            onChange={(e) => handleInputChange('issueDate', e.target.value)}
                            error={!!errors?.idCard?.issueDate}
                        />
                    </FormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormField
                        label="Expiry Date"
                        tooltip="Date when the card expires"
                    >
                        <CustomInput
                            type="date"
                            value={formData?.idCard?.expiryDate || ''}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            error={!!errors?.idCard?.expiryDate}
                        />
                    </FormField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <FormField
                        label="Special Instructions"
                        tooltip="Any special instructions or notes for the ID card"
                    >
                        <CustomInput
                            multiline
                            rows={3}
                            placeholder="Enter any special instructions or notes"
                            value={formData?.idCard?.instructions || ''}
                            onChange={(e) => handleInputChange('instructions', e.target.value)}
                            error={!!errors?.idCard?.instructions}
                        />
                    </FormField>
                </Grid>

                {/* ID Card Actions */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mt: 2,
                        p: 2,
                        backgroundColor: '#f8fafc',
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}>
                        <Button
                            variant="outlined"
                            startIcon={<Eye size={16} />}
                            onClick={handlePreview}
                            sx={{
                                borderColor: '#3498db',
                                color: '#3498db',
                                '&:hover': {
                                    borderColor: '#2980b9',
                                    backgroundColor: 'rgba(52, 152, 219, 0.05)'
                                }
                            }}
                        >
                            Preview Card
                        </Button>
                        
                        <Button
                            variant="contained"
                            startIcon={<Printer size={16} />}
                            onClick={handlePrint}
                            sx={{
                                backgroundColor: '#3498db',
                                '&:hover': {
                                    backgroundColor: '#2980b9'
                                }
                            }}
                        >
                            Print Card
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* ID Card Preview Dialog */}
            <IdCardPreview
                open={showPreview}
                onClose={() => setShowPreview(false)}
                employeeData={employeeData}
                onPrint={handlePrint}
            />
        </Box>
    );
};

export default IdCardSection;
