import React from 'react';
import { Shield } from 'lucide-react';
import { Box, Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';

const BenefitsSelectionCard = ({
    selectedBenefits = [],
    onBenefitsChange,
    benefitsOptions
}) => {
    const theme = useTheme();
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
                        <Shield size={20} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="600" color="text.primary">
                            Employee Benefits
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Health, insurance, and wellness benefits
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {benefitsOptions?.map((benefit) => (
                        <Chip
                            key={benefit.value}
                            label={benefit.label}
                            clickable
                            variant={selectedBenefits.includes(benefit.value) ? "filled" : "outlined"}
                            color={selectedBenefits.includes(benefit.value) ? theme.palette.primary.main : theme.palette.primary.light}
                            onClick={() => {
                                const updatedBenefits = selectedBenefits.includes(benefit.value)
                                    ? selectedBenefits.filter(b => b !== benefit.value)
                                    : [...selectedBenefits, benefit.value];
                                onBenefitsChange(updatedBenefits);
                            }}
                            sx={{
                                height: 36,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                borderColor: selectedBenefits.includes(benefit.value) ? theme.palette.primary.main : theme.palette.primary.light,
                                backgroundColor: selectedBenefits.includes(benefit.value) ? theme.palette.primary.main : 'transparent',
                                color: selectedBenefits.includes(benefit.value) ? 'white' : theme.palette.primary.light,
                                '&:hover': {
                                    backgroundColor: selectedBenefits.includes(benefit.value) ? theme.palette.primary.main : theme.palette.primary.light,
                                    borderColor: selectedBenefits.includes(benefit.value) ? theme.palette.primary.main : theme.palette.primary.light
                                }
                            }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default BenefitsSelectionCard;
