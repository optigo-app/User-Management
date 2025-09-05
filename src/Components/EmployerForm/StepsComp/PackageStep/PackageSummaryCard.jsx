import React from 'react';
import { Package } from 'lucide-react';
import { Box, Card, CardContent, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';

const PackageSummaryCard = ({
    formData,
    totalCompensation,
    selectedBenefits = [],
    selectedAllowances = []
}) => {
    const theme = useTheme();
    return (
        <Card
            elevation={1}
            sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                position: 'sticky',
                top: 20
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                    <Box sx={{
                        textAlign: 'center',
                        p: 2,
                        backgroundColor: '#f8fafc',
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}>
                        <Box sx={{
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2
                        }}>
                            <Package size={24} />
                        </Box>
                        <Typography variant="h5" fontWeight="600" color="text.primary" gutterBottom>
                            Package Summary
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total compensation overview
                        </Typography>
                    </Box>

                    <Box sx={{
                        textAlign: 'center',
                        p: 2,
                        backgroundColor: '#f1f5f9',
                        borderRadius: 2
                    }}>
                        <Typography variant="h4" fontWeight="700" color={theme.palette.primary.main} gutterBottom>
                            {formData.currency} {totalCompensation.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Estimated Annual Value
                        </Typography>
                    </Box>

                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Base Salary</Typography>
                            <Typography variant="h6" fontWeight="600" color="text.primary">
                                {formData.currency} {formData.baseSalary || '0'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Pay Frequency</Typography>
                            <Typography variant="body1" color="text.primary">
                                {formData.salaryFrequency || 'Not set'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Benefits</Typography>
                            <Chip
                                label={`${selectedBenefits.length} selected`}
                                size="small"
                                sx={{
                                    bgcolor: selectedBenefits.length > 0 ? theme.palette.primary.main : theme.palette.primary.extraLight,
                                    color: selectedBenefits.length > 0 ? 'white' : theme.palette.primary.title,
                                    fontWeight: 500
                                }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Allowances</Typography>
                            <Chip
                                label={`${selectedAllowances.length} selected`}
                                size="small"
                                sx={{
                                    bgcolor: selectedAllowances.length > 0 ? theme.palette.primary.main : theme.palette.primary.extraLight,
                                    color: selectedAllowances.length > 0 ? 'white' : theme.palette.primary.title,
                                    fontWeight: 500
                                }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Payroll Schedule</Typography>
                            <Typography variant="body1" color="text.primary">
                                {formData.payrollSchedule || 'Not set'}
                            </Typography>
                        </Box>
                    </Stack>

                    {formData.overtimeRate && (
                        <>
                            <Divider sx={{ borderColor: '#e2e8f0' }} />
                            <Box sx={{
                                textAlign: 'center',
                                p: 2,
                                backgroundColor: '#f1f5f9',
                                borderRadius: 2
                            }}>
                                <Typography variant="body2" color="text.secondary">Overtime Rate</Typography>
                                <Typography variant="h6" fontWeight="600" color="text.primary">
                                    {formData.currency} {formData.overtimeRate}/hour
                                </Typography>
                            </Box>
                        </>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default PackageSummaryCard;
