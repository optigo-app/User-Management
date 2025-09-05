import React from 'react';
import { Calendar } from 'lucide-react';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FormField } from '../../../Ui';
import CustomInput from '../../../Ui/CustomInput';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';
import { CustomTextArea } from '../../../Ui/CustomTextArea';

const PayrollScheduleCard = ({
    formData,
    onInputChange,
    onBlur,
    onSelectChange,
    payrollScheduleOptions
}) => {
    return (
        <Card elevation={1} sx={{ borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <Box sx={{
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                p: 2
            }}>
                <Stack direction="row" alignItems="center" gap={2}>
                    <Box sx={{
                        bgcolor: '#64748b',
                        color: 'white',
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Calendar size={20} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="600" color="text.primary">
                            Payroll Schedule
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Payment timing and bonus structure
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={1}>
                    <Grid size={{ xs: 12 }}>
                        <FormField label="Payroll Schedule" required>
                            <CustomAutocomplete
                                placeholder="Select payroll schedule"
                                value={payrollScheduleOptions.find(option => option.value === formData.payrollSchedule) || null}
                                onChange={(e, newValue) => onSelectChange("payrollSchedule", newValue?.value || "")}
                                options={payrollScheduleOptions}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormField label="Bonus Structure">
                            <CustomTextArea
                                placeholder="Describe bonus structure, performance incentives, etc."
                                value={formData.bonusStructure}
                                onChange={(e) => onInputChange("bonusStructure", e.target.value)}
                                onBlur={() => onBlur("bonusStructure")}
                                multiline
                                rows={2}
                            />
                        </FormField>
                    </Grid>

                    {/* Deduction Section */}
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h6" fontWeight="600" color="text.primary" sx={{ mb: 2 }}>
                            Deductions
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                        <FormField label="Deduction Type" required>
                            <CustomAutocomplete
                                placeholder="Select deduction type"
                                value={formData.deductionType ? { value: formData.deductionType, label: formData.deductionType } : null}
                                onChange={(e, newValue) => onSelectChange("deductionType", newValue?.value || "")}
                                options={[
                                    { value: "PF", label: "Provident Fund (PF)" },
                                    { value: "ESI", label: "Employee State Insurance (ESI)" },
                                    { value: "NPS", label: "National Pension Scheme (NPS)" },
                                    { value: "Other", label: "Other" }
                                ]}
                            />
                        </FormField>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                        <FormField label="Deduction Amount">
                            <CustomInput
                                type="number"
                                placeholder="Enter deduction amount"
                                value={formData.deductionAmount}
                                onChange={(e) => onInputChange("deductionAmount", e.target.value)}
                                onBlur={() => onBlur("deductionAmount")}
                            />
                        </FormField>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormField label="Deduction Notes">
                            <CustomTextArea
                                placeholder="Additional notes about deductions, special circumstances, etc."
                                value={formData.deductionNotes}
                                onChange={(e) => onInputChange("deductionNotes", e.target.value)}
                                onBlur={() => onBlur("deductionNotes")}
                                multiline
                                rows={2}
                            />
                        </FormField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PayrollScheduleCard;
