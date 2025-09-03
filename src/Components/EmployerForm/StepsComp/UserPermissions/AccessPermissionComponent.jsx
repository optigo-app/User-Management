import React from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    FormControlLabel, 
    Checkbox
} from '@mui/material';
import { Shield } from 'lucide-react';

const AccessPermissionComponent = ({ formData, onPermissionChange, color = "#84cc16" }) => {
    const handleChange = (key, checked) => {
        onPermissionChange(key, checked);
    };

    const getCheckboxValue = (key) => {
        return formData?.userPermissions?.[key] || false;
    };

    return (
        <Paper sx={{ 
            p: 3, 
            borderRadius: 2, 
            border: '1px solid #e5e7eb',
            bgcolor: '#fafafa'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                borderRadius: 2,
                border: '1px solid #e5e7eb',
                bgcolor: 'white',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: color,
                    boxShadow: `0 2px 8px ${color}20`,
                    transform: 'translateY(-1px)'
                }
            }}>
                <Shield 
                    size={24} 
                    color={getCheckboxValue('accessPermission') ? color : '#9ca3af'} 
                    style={{ marginRight: '16px' }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={getCheckboxValue('accessPermission')}
                            onChange={(e) => handleChange('accessPermission', e.target.checked)}
                            sx={{
                                color: '#9ca3af',
                                '&.Mui-checked': {
                                    color: color
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: 24
                                }
                            }}
                        />
                    }
                    label={
                        <Typography variant="body1" sx={{
                            fontWeight: getCheckboxValue('accessPermission') ? 600 : 500,
                            color: getCheckboxValue('accessPermission') ? '#374151' : '#6b7280',
                            fontSize: '16px'
                        }}>
                            Enable Access Permission
                        </Typography>
                    }
                    sx={{ margin: 0, flex: 1 }}
                />
            </Box>
        </Paper>
    );
};

export default AccessPermissionComponent;
