import React from 'react';
import { DollarSign } from 'lucide-react';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FormField } from '../../../Ui';
import CustomInput from '../../../Ui/CustomInput';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';

const SalaryInformationCard = ({ 
    formData, 
    errors, 
    onInputChange, 
    onBlur, 
    onSelectChange,
    currencyOptions,
    salaryFrequencyOptions 
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
                        bgcolor: '#3b82f6', 
                        color: 'white',
                        width: 40, 
                        height: 40,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <DollarSign size={20} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="600" color="text.primary">
                            Salary Information
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Base compensation and pay structure
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid size={{xs:12,lg:6}}>
                        <FormField label="Base Salary" required>
                            <CustomInput
                                type="number"
                                placeholder="Enter base salary"
                                value={formData.baseSalary}
                                onChange={(e) => onInputChange("baseSalary", e.target.value)}
                                onBlur={() => onBlur("baseSalary")}
                                error={errors?.baseSalary}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{xs:12,lg:6}}>
                        <FormField label="Currency">
                            <CustomAutocomplete
                                placeholder="Select currency"
                                value={currencyOptions.find(option => option.value === formData.currency) || null}
                                onChange={(e, newValue) => onSelectChange("currency", newValue?.value || "")}
                                options={currencyOptions}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{xs:12,lg:6}}>
                        <FormField label="Pay Frequency" required>
                            <CustomAutocomplete
                                placeholder="How often is salary paid?"
                                value={salaryFrequencyOptions.find(option => option.value === formData.salaryFrequency) || null}
                                onChange={(e, newValue) => onSelectChange("salaryFrequency", newValue?.value || "")}
                                options={salaryFrequencyOptions}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{xs:12,lg:6}}>
                        <FormField label="Overtime Rate">
                            <CustomInput
                                type="number"
                                placeholder="Hourly overtime rate"
                                value={formData.overtimeRate}
                                onChange={(e) => onInputChange("overtimeRate", e.target.value)}
                                onBlur={() => onBlur("overtimeRate")}
                            />
                        </FormField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SalaryInformationCard;
