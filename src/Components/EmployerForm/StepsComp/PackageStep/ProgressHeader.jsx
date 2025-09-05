import React from 'react';
import { Calculator } from 'lucide-react';
import { Box, Paper, Stack, Typography, LinearProgress } from '@mui/material';

const ProgressHeader = ({ completionPercentage }) => {
    return (
        <Paper 
            elevation={1} 
            sx={{ 
                p: 3, 
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 2
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                        bgcolor: '#3b82f6', 
                        color: 'white',
                        width: 48, 
                        height: 48,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Calculator size={24} />
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight="600" color="text.primary">
                            Payroll Configuration
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Set up comprehensive compensation package
                        </Typography>
                    </Box>
                </Box>
                <Box textAlign="right">
                    <Typography variant="h4" fontWeight="700" color="text.primary">
                        {completionPercentage}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Complete</Typography>
                </Box>
            </Stack>
            <LinearProgress 
                variant="determinate" 
                value={completionPercentage} 
                sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#3b82f6'
                    }
                }} 
            />
        </Paper>
    );
};

export default ProgressHeader;
