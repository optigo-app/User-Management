import React from 'react';
import { Box, Typography, Chip, useTheme } from '@mui/material';

const PermissionSectionHeader = ({ 
    title, 
    icon: Icon, 
    color, 
    subtitle, 
    itemCount,
    children 
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ 
            p: 2, 
            bgcolor: '#f8fafc', 
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '8px 8px 0 0'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: `${color}20`
                }}>
                    <Icon size={20} color={color} />
                    <Box>
                        <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: theme.palette.primary.title,
                            fontSize: '1rem',
                            lineHeight: 1.2
                        }}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" sx={{ 
                                color: theme.palette.primary.subtitle,
                                fontSize: '0.75rem',
                                mt: 0.25
                            }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Box>
                {itemCount !== undefined && (
                    <Chip
                        label={`${itemCount} items`}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(0, 0, 0, 0.1)',
                            color: theme.palette.primary.title,
                            fontSize: '0.7rem',
                            height: 20
                        }}
                    />
                )}
            </Box>
            {children && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
};

export default PermissionSectionHeader;
