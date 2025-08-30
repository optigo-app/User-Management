import React from 'react';
import { 
    Box, 
    Grid, 
    Typography, 
    FormControlLabel, 
    Checkbox, 
    Card, 
    CardContent,
    Divider 
} from '@mui/material';

const AppRightsSection = ({ formData, errors, onUpdate }) => {
    const appModules = [
        {
            category: 'User Management',
            modules: [
                { key: 'userCreate', label: 'Create Users', description: 'Add new users to the system' },
                { key: 'userEdit', label: 'Edit Users', description: 'Modify existing user information' },
                { key: 'userDelete', label: 'Delete Users', description: 'Remove users from the system' },
                { key: 'userView', label: 'View Users', description: 'Access user information' },
            ]
        },
        {
            category: 'Customer Management',
            modules: [
                { key: 'customerCreate', label: 'Create Customers', description: 'Add new customer records' },
                { key: 'customerEdit', label: 'Edit Customers', description: 'Modify customer information' },
                { key: 'customerDelete', label: 'Delete Customers', description: 'Remove customer records' },
                { key: 'customerView', label: 'View Customers', description: 'Access customer data' },
            ]
        },
        {
            category: 'Reports & Analytics',
            modules: [
                { key: 'reportsView', label: 'View Reports', description: 'Access system reports' },
                { key: 'reportsExport', label: 'Export Reports', description: 'Download report data' },
                { key: 'analyticsView', label: 'View Analytics', description: 'Access analytics dashboard' },
                { key: 'analyticsAdvanced', label: 'Advanced Analytics', description: 'Access detailed analytics' },
            ]
        },
        {
            category: 'System Administration',
            modules: [
                { key: 'systemConfig', label: 'System Configuration', description: 'Modify system settings' },
                { key: 'backupRestore', label: 'Backup & Restore', description: 'Manage system backups' },
                { key: 'auditLogs', label: 'Audit Logs', description: 'View system audit trails' },
                { key: 'userRoles', label: 'Manage User Roles', description: 'Configure user permissions' },
            ]
        }
    ];

    const handleModuleChange = (moduleKey, checked) => {
        const currentRights = formData?.appRights || {};
        onUpdate({
            ...formData,
            appRights: {
                ...currentRights,
                [moduleKey]: checked
            }
        });
    };

    const handleCategoryToggle = (category, checked) => {
        const categoryModules = appModules.find(cat => cat.category === category)?.modules || [];
        const currentRights = formData?.appRights || {};
        const updatedRights = { ...currentRights };
        
        categoryModules.forEach(module => {
            updatedRights[module.key] = checked;
        });

        onUpdate({
            ...formData,
            appRights: updatedRights
        });
    };

    const isCategoryChecked = (category) => {
        const categoryModules = appModules.find(cat => cat.category === category)?.modules || [];
        const currentRights = formData?.appRights || {};
        return categoryModules.every(module => currentRights[module.key]);
    };

    const isCategoryIndeterminate = (category) => {
        const categoryModules = appModules.find(cat => cat.category === category)?.modules || [];
        const currentRights = formData?.appRights || {};
        const checkedCount = categoryModules.filter(module => currentRights[module.key]).length;
        return checkedCount > 0 && checkedCount < categoryModules.length;
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#374151', fontWeight: 600 }}>
                Application Access Rights
            </Typography>
            
            <Grid container spacing={3}>
                {appModules.map((category) => (
                    <Grid item xs={12} md={6} key={category.category}>
                        <Card sx={{ height: '100%', border: '1px solid #e5e7eb' }}>
                            <CardContent>
                                <Box sx={{ mb: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isCategoryChecked(category.category)}
                                                indeterminate={isCategoryIndeterminate(category.category)}
                                                onChange={(e) => handleCategoryToggle(category.category, e.target.checked)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#374151' }}>
                                                {category.category}
                                            </Typography>
                                        }
                                    />
                                </Box>
                                
                                <Divider sx={{ mb: 2 }} />
                                
                                <Box sx={{ pl: 2 }}>
                                    {category.modules.map((module) => (
                                        <Box key={module.key} sx={{ mb: 1.5 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={formData?.appRights?.[module.key] || false}
                                                        onChange={(e) => handleModuleChange(module.key, e.target.checked)}
                                                        size="small"
                                                    />
                                                }
                                                label={
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>
                                                            {module.label}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                                            {module.description}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AppRightsSection;
