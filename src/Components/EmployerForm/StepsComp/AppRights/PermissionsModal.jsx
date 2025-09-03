import React, { useState, useMemo } from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Button,
    Paper,
    Divider,
    Fade,
    Card,
    CardContent,
    TextField,
    InputAdornment
} from '@mui/material';
import { X, User, Shield, Settings, Search } from 'lucide-react';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const PermissionsModal = ({ 
    open, 
    onClose, 
    selectedApp, 
    appRights, 
    onPermissionChange 
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const getAppPermissions = () => {
        if (!selectedApp) return { sections: [] };
        const appKey = selectedApp.key;
        const permissionStructures = {
            user: {
                sections: [
                    {
                        title: 'User Menu',
                        permissions: []
                    },
                    {
                        title: 'COMPANY',
                        permissions: [
                            { key: 'company', label: 'Company' },
                            { key: 'companyType', label: 'Company Type' }
                        ]
                    },
                    {
                        title: 'CUSTOMER',
                        permissions: [
                            { key: 'customer', label: 'Customer' },
                            { key: 'leadToCustomer', label: 'Lead To Customer' },
                            { key: 'leadCustomer', label: 'Lead Customer' }
                        ]
                    },
                    {
                        title: 'STAFF',
                        permissions: [
                            { key: 'admin', label: 'Admin' }
                        ]
                    }
                ]
            },
            mastersPolicy: {
                sections: [
                    {
                        title: 'Masters & Policy Menu',
                        permissions: []
                    },
                    {
                        title: 'CUSTOMER',
                        permissions: [
                            { key: 'customer', label: 'Customer' },
                            { key: 'leadToCustomer', label: 'Lead To Customer' },
                            { key: 'leadCustomer', label: 'Lead Customer' }
                        ]
                    }
                ]
            },
            salesCrm: {
                sections: [
                    {
                        title: 'Sales CRM Menu',
                        permissions: []
                    },
                    {
                        title: 'ADMIN',
                        permissions: [
                            { key: 'admin', label: 'Admin' }
                        ]
                    }
                ]
            }
        };

        return permissionStructures[appKey] || { sections: [] };
    };

    const appPermissions = getAppPermissions();
    const currentAppRights = selectedApp ? (appRights[selectedApp.key] || { mainright: false, subrights: {} }) : { mainright: false, subrights: {} };

    // Filter permissions based on search query
    const filteredPermissions = useMemo(() => {
        if (!searchQuery.trim()) return appPermissions;
        
        const filtered = {
            sections: appPermissions.sections.map(section => ({
                ...section,
                permissions: section.permissions.filter(permission =>
                    permission.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (permission.description && permission.description.toLowerCase().includes(searchQuery.toLowerCase()))
                )
            })).filter(section => section.permissions.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase()))
        };
        
        return filtered;
    }, [appPermissions, searchQuery]);

    const handlePermissionToggle = (permissionKey, checked) => {
        if (!selectedApp) return;
        onPermissionChange(permissionKey, checked);
    };

    if (!selectedApp) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { 
                    borderRadius: 3,
                    maxHeight: '85vh',
                    bgcolor: '#fafafa',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)'
                }
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                {/* Modern Header */}
                <Box sx={{
                    background: `linear-gradient(135deg, ${selectedApp.color}15 0%, ${selectedApp.color}25 100%)`,
                    borderBottom: `3px solid ${selectedApp.color}`,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background Pattern */}
                    <Box sx={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        bgcolor: `${selectedApp.color}10`,
                        opacity: 0.3
                    }} />
                    
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 2,
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                bgcolor: selectedApp.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 4px 16px ${selectedApp.color}40`
                            }}>
                                <selectedApp.icon size={24} color="white" />
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    mb: 0,
                                    letterSpacing: '-0.01em'
                                }}>
                                    {selectedApp.name} Rights
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontWeight: 500
                                }}>
                                    Configure permissions
                                </Typography>
                            </Box>
                        </Box>
                        
                        <IconButton 
                            onClick={onClose}
                            sx={{ 
                                bgcolor: 'rgba(0,0,0,0.05)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': { 
                                    bgcolor: 'rgba(0,0,0,0.1)',
                                    transform: 'scale(1.05)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                            size="large"
                        >
                            <X size={24} />
                        </IconButton>
                    </Box>
                </Box>

                {/* User Info Card - Compact */}
                <Box sx={{ p: 2, pb: 1 }}>
                    <Card sx={{ 
                        borderRadius: 2,
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                        mb: 2
                    }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2
                            }}>
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <User size={16} color="#666" />
                                        <Box>
                                            <Typography variant="caption" sx={{ 
                                                color: '#888',
                                                textTransform: 'uppercase',
                                                fontWeight: 600,
                                                fontSize: '10px'
                                            }}>
                                                Designation
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                                                Account Executive
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Shield size={16} color="#666" />
                                        <Box>
                                            <Typography variant="caption" sx={{ 
                                                color: '#888',
                                                textTransform: 'uppercase',
                                                fontWeight: 600,
                                                fontSize: '10px'
                                            }}>
                                                User
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                                                training2@eg.com
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Button 
                                    variant="contained" 
                                    size="small"
                                    sx={{ 
                                        bgcolor: selectedApp.color,
                                        '&:hover': { bgcolor: selectedApp.color + 'dd' },
                                        borderRadius: 1.5,
                                        px: 2,
                                        py: 0.5,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        fontSize: '12px'
                                    }}
                                >
                                    Apply Now
                                </Button>
                            </Box>
                            
                            {/* Search Filter */}
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search permissions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search size={16} color="#666" />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: 2,
                                        bgcolor: '#f8fafc',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#e5e7eb'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: selectedApp.color
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: selectedApp.color
                                        }
                                    }
                                }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '13px',
                                        fontWeight: 500
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </Box>

                {/* Permissions Sections - Compact & Scrollable */}
                <Box sx={{ 
                    px: 2, 
                    pb: 2,
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '6px'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '3px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#c1c1c1',
                        borderRadius: '3px',
                        '&:hover': {
                            background: '#a1a1a1'
                        }
                    }
                }}>
                    {filteredPermissions.sections.map((section, sectionIndex) => (
                        <Card sx={{ 
                            mb: 1.5,
                            borderRadius: 2,
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            '&:hover': {
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            },
                            transition: 'box-shadow 0.2s ease'
                        }} key={sectionIndex}>
                            {/* Section Header - Compact */}
                            <Box sx={{
                                bgcolor: section.permissions.length === 0 
                                    ? `${selectedApp.color}15` 
                                    : '#f8fafc',
                                borderBottom: section.permissions.length > 0 ? '1px solid #e5e7eb' : 'none',
                                p: 1.5
                            }}>
                                <Typography variant="subtitle2" sx={{ 
                                    fontWeight: 700,
                                    color: '#1f2937',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    fontSize: '14px'
                                }}>
                                    <Settings size={16} color={selectedApp.color} />
                                    {section.title}
                                </Typography>
                            </Box>
                            
                            {/* Section Permissions - Compact */}
                            {section.permissions.length > 0 && (
                                <Box>
                                    {section.permissions.map((permission, permIndex) => (
                                        <Box 
                                            key={permission.key}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                p: 2,
                                                borderBottom: permIndex < section.permissions.length - 1 
                                                    ? '1px solid #f1f5f9' 
                                                    : 'none',
                                                '&:hover': {
                                                    bgcolor: '#f8fafc'
                                                },
                                                transition: 'background-color 0.2s ease'
                                            }}
                                        >
                                            <Box sx={{ flex: 1, pr: 2 }}>
                                                <Typography variant="body2" sx={{
                                                    fontWeight: 600,
                                                    color: '#374151',
                                                    mb: 0.25,
                                                    fontSize: '13px'
                                                }}>
                                                    {permission.label}
                                                </Typography>
                                                <Typography variant="caption" sx={{
                                                    color: '#6b7280',
                                                    fontSize: '11px',
                                                    lineHeight: 1.3
                                                }}>
                                                    {permission.description || 'Manage access permissions'}
                                                </Typography>
                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                flexShrink: 0
                                            }}>
                                                <Typography variant="caption" sx={{
                                                    color: currentAppRights.subrights[permission.key] 
                                                        ? '#10b981' 
                                                        : '#ef4444',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    fontSize: '10px',
                                                    letterSpacing: '0.5px',
                                                    minWidth: '50px',
                                                    textAlign: 'center'
                                                }}>
                                                    {currentAppRights.subrights[permission.key] ? 'ON' : 'OFF'}
                                                </Typography>
                                                <ToggleSwitch
                                                    checked={currentAppRights.subrights[permission.key] || false}
                                                    onChange={() => handlePermissionToggle(
                                                        permission.key, 
                                                        !currentAppRights.subrights[permission.key]
                                                    )}
                                                    activeColor="#10b981"
                                                    inactiveColor="#ef4444"
                                                    width={36}
                                                    height={20}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Card>
                    ))}
                </Box>

                {/* Compact Footer */}
                <Box sx={{ 
                    bgcolor: '#f8fafc',
                    borderTop: '1px solid #e5e7eb',
                    p: 1.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="caption" sx={{ 
                        color: '#6b7280',
                        fontWeight: 500,
                        fontSize: '11px'
                    }}>
                        Press <kbd style={{
                            background: '#e5e7eb',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            fontFamily: 'monospace',
                            fontSize: '10px'
                        }}>ESC</kbd> to close
                    </Typography>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        size="small"
                        sx={{
                            borderColor: selectedApp.color,
                            color: selectedApp.color,
                            '&:hover': {
                                bgcolor: `${selectedApp.color}10`,
                                borderColor: selectedApp.color
                            },
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '12px',
                            py: 0.5,
                            px: 2
                        }}
                    >
                        Save & Close
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PermissionsModal;
