import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Chip,
    TextField,
    InputAdornment,
    Button,
    LinearProgress,
    Fade
} from '@mui/material';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';
import PermissionsModal from './PermissionsModal';
import {
    Search,
    User,
    Settings,
    ShoppingCart,
    BarChart3,
    Wrench,
    FileText
} from 'lucide-react';

const AppRightsSection = ({ formData, errors, onUpdate }) => {
    const [selectedApp, setSelectedApp] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const appModules = [
        { 
            category: 'User', 
            icon: User, 
            color: '#3b82f6', 
            modules: [
                { key: 'company', label: 'Company', description: 'Company management access' },
                { key: 'companyType', label: 'Company Type', description: 'Company type configuration' }
            ]
        },
        { 
            category: 'Masters & Policy', 
            icon: Settings, 
            color: '#10b981', 
            modules: [
                { key: 'customer', label: 'Customer', description: 'Customer management' },
                { key: 'leadToCustomer', label: 'Lead To Customer', description: 'Convert leads to customers' },
                { key: 'leadCustomer', label: 'Lead Customer', description: 'Lead customer management' }
            ]
        },
        { 
            category: 'Sales CRM', 
            icon: ShoppingCart, 
            color: '#f59e0b', 
            modules: [
                { key: 'admin', label: 'Admin', description: 'Administrative access' }
            ]
        },
        { category: 'Account', icon: BarChart3, color: '#ef4444', modules: [] },
        { category: 'PD', icon: FileText, color: '#8b5cf6', modules: [] },
        { category: 'Manufacturing', icon: Wrench, color: '#06b6d4', modules: [] },
        { category: 'E-Commerce Back Office', icon: ShoppingCart, color: '#84cc16', modules: [] },
        { category: 'E-Commerce', icon: ShoppingCart, color: '#f97316', modules: [] },
        { category: 'lead E-Commerce', icon: ShoppingCart, color: '#6366f1', modules: [] },
        { category: 'BroadCast', icon: Settings, color: '#ec4899', modules: [] },
        { category: 'Optigo Services', icon: Settings, color: '#14b8a6', modules: [] },
        { category: 'System Admin', icon: Settings, color: '#f59e0b', modules: [] },
        { category: 'Vendor', icon: User, color: '#8b5cf6', modules: [] },
        { category: 'Inventory', icon: BarChart3, color: '#ef4444', modules: [] },
        { category: 'Pay Bill', icon: BarChart3, color: '#10b981', modules: [] },
        { category: 'Task Mgt', icon: FileText, color: '#3b82f6', modules: [
            { key: 'taskMgt', label: 'Task Management', description: 'Project and task tracking' }
        ]},
        { category: 'Diamond Store', icon: Settings, color: '#f97316', modules: [] },
        { category: 'MIS', icon: BarChart3, color: '#ef4444', modules: [] },
        { category: 'Books Keeping', icon: BarChart3, color: '#10b981', modules: [] },
        { category: 'IPAD Back Office', icon: Settings, color: '#6b7280', modules: [] },
        { category: 'Task', icon: FileText, color: '#3b82f6', modules: [
            { key: 'task', label: 'Task System', description: 'Task management system' }
        ]}
    ];

    // Create flat list of apps for table view
    const applications = appModules.map(category => {
        const categoryKey = category.category.toLowerCase().replace(/\s+/g, '');
        const categoryRights = formData?.appRights?.[categoryKey];
        
        return {
            key: categoryKey,
            name: category.category,
            icon: category.icon,
            color: category.color,
            modules: category.modules,
            hasAccess: categoryRights?.mainright || false
        };
    });

    const handleAppPermissionToggle = (appKey, hasAccess) => {
        const app = applications.find(app => app.key === appKey);
        if (!app) return;

        const currentRights = formData?.appRights || {};
        const updatedRights = {};
        
        // Deep clone the current rights to avoid read-only issues
        Object.keys(currentRights).forEach(key => {
            updatedRights[key] = {
                mainright: currentRights[key].mainright,
                subrights: { ...currentRights[key].subrights }
            };
        });
        
        const subrights = {};
        app.modules.forEach(module => {
            subrights[module.key] = hasAccess;
        });
        updatedRights[appKey] = {
            mainright: hasAccess,
            subrights: subrights
        };

        onUpdate({
            ...formData,
            appRights: updatedRights
        });
    };

    const handleAppNameClick = (app) => {
        // Only open modal if app has mainright permission enabled
        const appRights = formData?.appRights?.[app.key];
        if (appRights?.mainright) {
            setSelectedApp(app);
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedApp(null);
    };

    const handleModuleChange = (moduleKey, checked) => {
        if (!selectedApp) return;
        
        const currentRights = formData?.appRights || {};
        const updatedRights = {};
        
        // Deep clone the current rights to avoid read-only issues
        Object.keys(currentRights).forEach(key => {
            updatedRights[key] = {
                mainright: currentRights[key].mainright,
                subrights: { ...currentRights[key].subrights }
            };
        });
        
        const appKey = selectedApp.key;
        
        // Initialize app structure if it doesn't exist
        if (!updatedRights[appKey]) {
            updatedRights[appKey] = {
                mainright: false,
                subrights: {}
            };
        }
        
        // Update the specific subright
        updatedRights[appKey].subrights[moduleKey] = checked;
        
        // Update mainright based on whether any subrights are enabled
        const hasAnySubrights = Object.values(updatedRights[appKey].subrights).some(value => value);
        updatedRights[appKey].mainright = hasAnySubrights;

        onUpdate({
            ...formData,
            appRights: updatedRights
        });
    };

    return (
        <Box>
        
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f8fafc' }}>
                            <TableCell sx={{ fontWeight: 600, color: '#374151', padding: '8px 16px' }}>Apps Icon</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#374151', padding: '8px 16px' }}>Apps Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#374151', padding: '8px 16px' }}>Permission</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#374151', padding: '8px 16px' }}>Features</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((app) => {
                            const IconComponent = app.icon;
                            const categoryRights = formData?.appRights?.[app.key];
                            const enabledModules = categoryRights?.subrights ? 
                                Object.values(categoryRights.subrights).filter(Boolean).length : 0;

                            return (
                                <TableRow
                                    key={app.key}
                                    sx={{
                                        '&:hover': { bgcolor: '#f8fafc' },
                                        transition: 'background-color 0.2s ease'
                                    }}
                                >
                                    <TableCell sx={{ padding: '8px 16px' }}>
                                        <Avatar sx={{
                                            bgcolor: app.color,
                                            width: 40,
                                            height: 40,
                                            boxShadow: `0 2px 8px ${app.color}40`
                                        }}>
                                            <IconComponent size={20} color="white" />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>
                                        <Button
                                            variant="text"
                                            onClick={() => handleAppNameClick(app)}
                                            sx={{ 
                                                justifyContent: 'flex-start',
                                                color: app.hasAccess ? app.color : '#6B7280',
                                                fontWeight: app.hasAccess ? 600 : 500,
                                                textDecoration: app.hasAccess ? 'underline' : 'none',
                                                '&:hover': {
                                                    backgroundColor: app.hasAccess ? `${app.color}10` : 'transparent',
                                                    textDecoration: app.hasAccess ? 'underline' : 'none'
                                                }
                                            }}
                                        >
                                            {app.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>
                                        <ToggleSwitch
                                            checked={app.hasAccess}
                                            onChange={() => handleAppPermissionToggle(app.key, !app.hasAccess)}
                                            activeColor={app.color}
                                            inactiveColor="#9e9e9e"
                                            width={40}
                                            height={22}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ padding: '8px 16px' }}>
                                        <Chip
                                            label={`${enabledModules}/${app.modules.length} features`}
                                            size="small"
                                            sx={{
                                                borderRadius: 3,
                                                fontWeight: 600,
                                                fontSize: '11px',
                                                height: 24,
                                                px: 1,
                                                bgcolor: enabledModules === app.modules.length 
                                                    ? '#10b98115' 
                                                    : enabledModules > 0 
                                                        ? '#f59e0b15' 
                                                        : '#f3f4f6',
                                                color: enabledModules === app.modules.length 
                                                    ? '#059669' 
                                                    : enabledModules > 0 
                                                        ? '#d97706' 
                                                        : '#6b7280',
                                                border: `1px solid ${
                                                    enabledModules === app.modules.length 
                                                        ? '#10b98130' 
                                                        : enabledModules > 0 
                                                            ? '#f59e0b30' 
                                                            : '#e5e7eb'
                                                }`,
                                                '&:hover': {
                                                    transform: 'scale(1.02)',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                },
                                                transition: 'all 0.2s ease'
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* New Permissions Modal Component */}
            <PermissionsModal
                open={openModal}
                onClose={handleCloseModal}
                selectedApp={selectedApp}
                appRights={formData?.appRights || {}}
                onPermissionChange={handleModuleChange}
            />
        </Box>
    );
};

export default AppRightsSection;
