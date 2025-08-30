import React from 'react';
import { 
    Box, 
    Grid, 
    Typography, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import { Shield, Users, Settings, Lock, Eye, FileText, Database } from 'lucide-react';
import { FormField } from '../../../Ui';
import CustomAutocomplete from '../../../Ui/ReusableAutocomplete';

const RoleManagementSection = ({ formData, errors, onUpdate }) => {
    const predefinedRoles = [
        {
            id: 'super_admin',
            name: 'Super Administrator',
            description: 'Complete system access with all permissions',
            level: 1,
            icon: Shield,
            color: '#ef4444',
            permissions: ['All System Permissions']
        },
        {
            id: 'admin',
            name: 'Administrator',
            description: 'Full access to most system features',
            level: 2,
            icon: Settings,
            color: '#f59e0b',
            permissions: ['User Management', 'System Configuration', 'Reports', 'Audit Logs']
        },
        {
            id: 'manager',
            name: 'Manager',
            description: 'Supervisory access with team management capabilities',
            level: 3,
            icon: Users,
            color: '#3b82f6',
            permissions: ['Team Management', 'Reports', 'Customer Management', 'Basic Settings']
        },
        {
            id: 'employee',
            name: 'Employee',
            description: 'Standard user access for daily operations',
            level: 4,
            icon: Users,
            color: '#10b981',
            permissions: ['Customer Management', 'Basic Reports', 'Profile Management']
        },
        {
            id: 'viewer',
            name: 'Viewer',
            description: 'Read-only access to system data',
            level: 5,
            icon: Eye,
            color: '#6b7280',
            permissions: ['View Only', 'Basic Reports']
        }
    ];

    const departments = [
        'Human Resources',
        'Information Technology',
        'Finance',
        'Marketing',
        'Sales',
        'Operations',
        'Customer Service',
        'Legal',
        'Administration'
    ];

    const handleChange = (field, value) => {
        onUpdate({
            ...formData,
            [field]: value
        });
    };

    const selectedRole = predefinedRoles.find(role => role.id === formData?.primaryRole);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#374151', fontWeight: 600 }}>
                Role Assignment & Management
            </Typography>
            
            <Grid container spacing={3}>
                {/* Primary Role Selection */}
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Primary Role" required>
                        <CustomAutocomplete
                            placeholder="Select primary role"
                            value={predefinedRoles.find(role => role.id === formData?.primaryRole) || null}
                            onChange={(e, newValue) => handleChange('primaryRole', newValue?.id || '')}
                            options={predefinedRoles}
                            getOptionLabel={(option) => option.name}
                            error={!!errors?.primaryRole}
                            helperText={errors?.primaryRole}
                        />
                    </FormField>
                </Grid>

                {/* Department */}
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Department" required>
                        <CustomAutocomplete
                            placeholder="Select department"
                            value={departments.map(dept => ({value: dept, label: dept})).find(dept => dept.value === formData?.department) || null}
                            onChange={(e, newValue) => handleChange('department', newValue?.value || '')}
                            options={departments.map(dept => ({value: dept, label: dept}))}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.department}
                            helperText={errors?.department}
                        />
                    </FormField>
                </Grid>

                {/* Role Details Card */}
                {selectedRole && (
                    <Grid size={{xs: 12}}>
                        <Card sx={{ border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <selectedRole.icon size={24} style={{ color: selectedRole.color }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ color: '#374151', fontWeight: 600 }}>
                                            {selectedRole.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                            {selectedRole.description}
                                        </Typography>
                                    </Box>
                                    <Chip 
                                        label={`Level ${selectedRole.level}`} 
                                        size="small"
                                        sx={{ 
                                            backgroundColor: selectedRole.color,
                                            color: 'white',
                                            fontWeight: 600
                                        }}
                                    />
                                </Box>
                                
                                <Divider sx={{ my: 2 }} />
                                
                                <Typography variant="subtitle2" sx={{ mb: 1, color: '#374151', fontWeight: 600 }}>
                                    Included Permissions:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {selectedRole.permissions.map((permission, index) => (
                                        <Chip 
                                            key={index}
                                            label={permission}
                                            size="small"
                                            variant="outlined"
                                            sx={{ backgroundColor: 'white' }}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* Additional Role Settings */}
                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Reporting Manager">
                        <CustomAutocomplete
                            placeholder="Select reporting manager"
                            value={[{value: 'john.doe', label: 'John Doe - IT Manager'}, {value: 'jane.smith', label: 'Jane Smith - HR Director'}, {value: 'mike.johnson', label: 'Mike Johnson - Operations Head'}].find(manager => manager.value === formData?.reportingManager) || null}
                            onChange={(e, newValue) => handleChange('reportingManager', newValue?.value || '')}
                            options={[{value: 'john.doe', label: 'John Doe - IT Manager'}, {value: 'jane.smith', label: 'Jane Smith - HR Director'}, {value: 'mike.johnson', label: 'Mike Johnson - Operations Head'}]}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.reportingManager}
                            helperText={errors?.reportingManager}
                        />
                    </FormField>
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <FormField label="Employee Type">
                        <CustomAutocomplete
                            placeholder="Select employee type"
                            value={[{value: 'full_time', label: 'Full Time'}, {value: 'part_time', label: 'Part Time'}, {value: 'contract', label: 'Contract'}, {value: 'intern', label: 'Intern'}].find(type => type.value === formData?.employeeType) || null}
                            onChange={(e, newValue) => handleChange('employeeType', newValue?.value || '')}
                            options={[{value: 'full_time', label: 'Full Time'}, {value: 'part_time', label: 'Part Time'}, {value: 'contract', label: 'Contract'}, {value: 'intern', label: 'Intern'}]}
                            getOptionLabel={(option) => option.label}
                            error={!!errors?.employeeType}
                            helperText={errors?.employeeType}
                        />
                    </FormField>
                </Grid>

                {/* Role Hierarchy Display */}
                <Grid item xs={12}>
                    <Card sx={{ border: '1px solid #e5e7eb' }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
                                Role Hierarchy
                            </Typography>
                            <List dense>
                                {predefinedRoles.map((role, index) => {
                                    const IconComponent = role.icon;
                                    const isCurrentRole = role.id === formData?.primaryRole;
                                    
                                    return (
                                        <ListItem 
                                            key={role.id}
                                            sx={{ 
                                                backgroundColor: isCurrentRole ? '#eff6ff' : 'transparent',
                                                borderRadius: 1,
                                                mb: 0.5
                                            }}
                                        >
                                            <ListItemIcon>
                                                <IconComponent size={20} style={{ color: role.color }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography 
                                                            variant="body2" 
                                                            sx={{ 
                                                                fontWeight: isCurrentRole ? 600 : 400,
                                                                color: isCurrentRole ? '#1d4ed8' : '#374151'
                                                            }}
                                                        >
                                                            {role.name}
                                                        </Typography>
                                                        {isCurrentRole && (
                                                            <Chip 
                                                                label="Current" 
                                                                size="small" 
                                                                color="primary"
                                                                sx={{ height: 20, fontSize: '0.6rem' }}
                                                            />
                                                        )}
                                                    </Box>
                                                }
                                                secondary={`Level ${role.level} - ${role.description}`}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RoleManagementSection;
