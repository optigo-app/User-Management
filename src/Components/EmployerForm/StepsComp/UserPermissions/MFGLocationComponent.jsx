import React from 'react';
import { 
    Box, 
    Paper, 
    Typography
} from '@mui/material';
import { MapPin } from 'lucide-react';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const MFGLocationComponent = ({ formData, onPermissionChange, color = "#7367f0" }) => {
    // Theme colors from theme.js
    const themeColors = {
        primary: '#7367f0',
        title: '#424242',
        subtitle: '#9CA3AF',
        light: '#e5e7eb',
        dark: '#6B7280'
    };
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
                    borderColor: themeColors.primary,
                    boxShadow: `0 2px 8px ${themeColors.primary}20`,
                    transform: 'translateY(-1px)'
                }
            }}>
                <MapPin 
                    size={24} 
                    color={getCheckboxValue('mfgLocation') ? themeColors.primary : themeColors.subtitle} 
                    style={{ marginRight: '16px' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{
                        fontWeight: getCheckboxValue('mfgLocation') ? 600 : 500,
                        color: getCheckboxValue('mfgLocation') ? themeColors.title : themeColors.subtitle,
                        fontSize: '16px'
                    }}>
                        Enable MFG Location
                    </Typography>
                    <ToggleSwitch
                        checked={getCheckboxValue('mfgLocation')}
                        onChange={(checked) => handleChange('mfgLocation', checked)}
                        color={themeColors.primary}
                        size="medium"
                    />
                </Box>
            </Box>
        </Paper>
    );
};

export default MFGLocationComponent;
