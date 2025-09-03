import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    Tabs,
    Tab,
    useTheme
} from '@mui/material';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const AccessPermissionComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (itemKey, checked, type) => {
        const currentAccessPermission = formData?.accessPermission || {};
        const updatedAccessPermission = {
            ...currentAccessPermission,
            [itemKey]: {
                ...currentAccessPermission[itemKey],
                [type]: checked
            }
        };
        onPermissionChange('accessPermission', updatedAccessPermission);
    };

    const handleSelectAll = (items, selectAll, type) => {
        const currentAccessPermission = formData?.accessPermission || {};
        let updatedAccessPermission = { ...currentAccessPermission };
        
        items.forEach(item => {
            updatedAccessPermission[item.key] = {
                ...updatedAccessPermission[item.key],
                [type]: selectAll
            };
        });
        
        onPermissionChange('accessPermission', updatedAccessPermission);
    };

    const isAllSelected = (items, type) => {
        return items.every(item => getCheckboxValue(item.key, type));
    };

    const tabData = [
        {
            title: 'User Rights',
            subtitle: 'User ID: training2@eg.com',
            items: [
                { key: 'loadDesignsAccess', label: 'Load Designs & Access' },
                { key: 'mountReturnWtAccess', label: 'Mount Return Wt Access' },
                { key: 'manualEntryAccess', label: 'Manual Entry Access' },
                { key: 'lossRestriction', label: 'Loss Restriction' },
                { key: 'returnProductionJob', label: 'Return Production Job' },
                { key: 'memo', label: 'Memo' },
                { key: 'memoReturn', label: 'Memo Return' }
            ]
        },
        {
            title: 'Excel Rights',
            subtitle: null,
            items: [
                { key: 'excelRight1', label: 'Excel Right 1' },
                { key: 'excelRight2', label: 'Excel Right 2' }
            ]
        }
    ];

    const getCheckboxValue = (itemKey, type) => {
        return formData?.accessPermission?.[itemKey]?.[type] || false;
    };

    const getCurrentTabData = () => tabData[tabValue];

    const renderTabContent = (data) => (
        <Box>
            <Box sx={{ 
                p: 2, 
                bgcolor: '#f8fafc', 
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box>
                    <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600,
                        color: theme.palette.primary.title,
                        fontSize: '0.875rem'
                    }}>
                        {data.title}
                    </Typography>
                    {data.subtitle && (
                        <Typography variant="caption" sx={{ 
                            color: theme.palette.primary.subtitle,
                            fontSize: '0.75rem'
                        }}>
                            {data.subtitle}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2.4 }}>
                    <Tooltip title={isAllSelected(data.items, 'access') ? "Deselect All" : "Select All"}>
                        <Box>
                            <ToggleSwitch
                                checked={isAllSelected(data.items, 'access')}
                                onChange={() => handleSelectAll(data.items, !isAllSelected(data.items, 'access'), 'access')}
                                activeColor={theme.palette.toggle.active}
                                inactiveColor={theme.palette.toggle.inactive}
                                width={32}
                                height={18}
                            />
                        </Box>
                    </Tooltip>
                </Box>
            </Box>
            <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small">
                    <TableBody>
                        {data.items.map((item, index) => (
                            <TableRow key={item.key} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                                <TableCell sx={{ 
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    py: 1.5,
                                    borderBottom: index === data.items.length - 1 ? 'none' : '1px solid #e2e8f0'
                                }}>
                                    {item.label}
                                </TableCell>
                                <TableCell align="center" sx={{ 
                                    py: 1.5,
                                    width: 80,
                                    borderBottom: index === data.items.length - 1 ? 'none' : '1px solid #e2e8f0'
                                }}>
                                    <ToggleSwitch
                                        checked={getCheckboxValue(item.key, 'access')}
                                        onChange={() => handleChange(item.key, !getCheckboxValue(item.key, 'access'), 'access')}
                                        activeColor={theme.palette.toggle.active}
                                        inactiveColor={theme.palette.toggle.inactive}
                                        width={32}
                                        height={18}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
                        <Tabs 
                            value={tabValue} 
                            onChange={handleTabChange}
                            sx={{
                                bgcolor: '#f8fafc',
                                borderBottom: '1px solid #e2e8f0',
                                '& .MuiTab-root': {
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: theme.palette.primary.subtitle,
                                    '&.Mui-selected': {
                                        color: theme.palette.primary.main
                                    }
                                }
                            }}
                        >
                            <Tab label="User Rights" />
                            <Tab label="Excel Rights" />
                        </Tabs>
                        {renderTabContent(getCurrentTabData())}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AccessPermissionComponent;
