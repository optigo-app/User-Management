import React from 'react';
import { Award } from 'lucide-react';
import { Box, Card, CardContent, Chip, Stack, Typography, useTheme } from '@mui/material';

const AllowancesSelectionCard = ({ 
    selectedAllowances = [], 
    onAllowancesChange,
    allowancesOptions 
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
                        <Award size={20} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="600" color="text.primary">
                            Allowances & Perks
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Additional compensation and perks
                        </Typography>
                    </Box>
                </Stack>
            </Box>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {allowancesOptions.map((allowance) => (
                        <Chip
                            key={allowance.value}
                            label={allowance.label}
                            clickable
                            variant={selectedAllowances.includes(allowance.value) ? "filled" : "outlined"}
                            color={selectedAllowances.includes(allowance.value) ? theme.palette.primary.main : theme.palette.primary.light}
                            onClick={() => {
                                const updatedAllowances = selectedAllowances.includes(allowance.value)
                                    ? selectedAllowances.filter(a => a !== allowance.value)
                                    : [...selectedAllowances, allowance.value];
                                onAllowancesChange(updatedAllowances);
                            }}
                            sx={{
                                height: 36,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                borderColor: selectedAllowances.includes(allowance.value) ? theme.palette.primary.main : theme.palette.primary.light,
                                backgroundColor: selectedAllowances.includes(allowance.value) ? theme.palette.primary.main : 'transparent',
                                color: selectedAllowances.includes(allowance.value) ? 'white' : theme.palette.primary.light,
                                '&:hover': {
                                    backgroundColor: selectedAllowances.includes(allowance.value) ? theme.palette.primary.main : theme.palette.primary.light,
                                    borderColor: selectedAllowances.includes(allowance.value) ? theme.palette.primary.main : theme.palette.primary.light
                                }
                            }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default AllowancesSelectionCard;
