import React from 'react';
import { 
    Box, 
    Grid, 
    Typography, 
    FormControlLabel, 
    Checkbox, 
    Card, 
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

const UserPermissionsSection = ({ formData, errors, onUpdate }) => {
    const permissionMatrix = [
        {
            module: 'Dashboard',
            permissions: ['view', 'customize']
        },
        {
            module: 'User Management',
            permissions: ['create', 'read', 'update', 'delete', 'assign_roles']
        },
        {
            module: 'Customer Management',
            permissions: ['create', 'read', 'update', 'delete', 'export']
        },
        {
            module: 'Reports',
            permissions: ['view', 'generate', 'export', 'schedule']
        },
        {
            module: 'Settings',
            permissions: ['view', 'modify', 'system_config']
        },
        {
            module: 'Audit Logs',
            permissions: ['view', 'export', 'purge']
        }
    ];

    const permissionLabels = {
        create: 'Create',
        read: 'Read',
        update: 'Update',
        delete: 'Delete',
        view: 'View',
        export: 'Export',
        customize: 'Customize',
        assign_roles: 'Assign Roles',
        generate: 'Generate',
        schedule: 'Schedule',
        modify: 'Modify',
        system_config: 'System Config',
        purge: 'Purge'
    };

    const handlePermissionChange = (module, permission, checked) => {
        const currentPermissions = formData?.userPermissions || {};
        const modulePermissions = currentPermissions[module] || {};
        
        onUpdate({
            ...formData,
            userPermissions: {
                ...currentPermissions,
                [module]: {
                    ...modulePermissions,
                    [permission]: checked
                }
            }
        });
    };

    const handleModuleToggle = (module, checked) => {
        const currentPermissions = formData?.userPermissions || {};
        const moduleConfig = permissionMatrix.find(m => m.module === module);
        
        if (moduleConfig) {
            const modulePermissions = {};
            moduleConfig.permissions.forEach(permission => {
                modulePermissions[permission] = checked;
            });
            
            onUpdate({
                ...formData,
                userPermissions: {
                    ...currentPermissions,
                    [module]: modulePermissions
                }
            });
        }
    };

    const isModuleFullyChecked = (module) => {
        const moduleConfig = permissionMatrix.find(m => m.module === module);
        const currentPermissions = formData?.userPermissions?.[module] || {};
        
        if (!moduleConfig) return false;
        
        return moduleConfig.permissions.every(permission => 
            currentPermissions[permission] === true
        );
    };

    const isModulePartiallyChecked = (module) => {
        const moduleConfig = permissionMatrix.find(m => m.module === module);
        const currentPermissions = formData?.userPermissions?.[module] || {};
        
        if (!moduleConfig) return false;
        
        const checkedCount = moduleConfig.permissions.filter(permission => 
            currentPermissions[permission] === true
        ).length;
        
        return checkedCount > 0 && checkedCount < moduleConfig.permissions.length;
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#374151', fontWeight: 600 }}>
                User Permissions Matrix
            </Typography>
            
            <Card sx={{ border: '1px solid #e5e7eb' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                                        Module
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                                        Permissions
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                                        Select All
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {permissionMatrix.map((moduleConfig) => (
                                    <TableRow key={moduleConfig.module}>
                                        <TableCell sx={{ fontWeight: 500, color: '#374151' }}>
                                            {moduleConfig.module}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {moduleConfig.permissions.map((permission) => (
                                                    <FormControlLabel
                                                        key={permission}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={
                                                                    formData?.userPermissions?.[moduleConfig.module]?.[permission] || false
                                                                }
                                                                onChange={(e) => 
                                                                    handlePermissionChange(
                                                                        moduleConfig.module, 
                                                                        permission, 
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                                                {permissionLabels[permission] || permission}
                                                            </Typography>
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={isModuleFullyChecked(moduleConfig.module)}
                                                indeterminate={isModulePartiallyChecked(moduleConfig.module)}
                                                onChange={(e) => 
                                                    handleModuleToggle(moduleConfig.module, e.target.checked)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Permission Summary */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: '#6b7280' }}>
                    Permission Summary
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {permissionMatrix.map((moduleConfig) => {
                        const modulePermissions = formData?.userPermissions?.[moduleConfig.module] || {};
                        const enabledPermissions = Object.entries(modulePermissions)
                            .filter(([_, enabled]) => enabled)
                            .map(([permission, _]) => permission);
                        
                        if (enabledPermissions.length === 0) return null;
                        
                        return (
                            <Card key={moduleConfig.module} sx={{ p: 1, backgroundColor: '#f3f4f6' }}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151' }}>
                                    {moduleConfig.module}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', color: '#6b7280' }}>
                                    {enabledPermissions.map(p => permissionLabels[p] || p).join(', ')}
                                </Typography>
                            </Card>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default UserPermissionsSection;
