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
    Tabs,
    Tab,
    Tooltip,
    useTheme
} from '@mui/material';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const MFGAccessComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Set default department on first load if none exists
    React.useEffect(() => {
        const currentMfgAccess = formData?.mfgAccess || {};
        const hasDefault = Object.values(currentMfgAccess).some(item => item?.default);

        if (!hasDefault) {
            // Set first MFG department as default
            const updatedMfgAccess = {
                ...currentMfgAccess,
                am1: {
                    ...currentMfgAccess.am1,
                    default: true
                }
            };
            onPermissionChange('mfgAccess', updatedMfgAccess);
        }
    }, []);

    const handleChange = (itemKey, checked, type) => {
        const currentMfgAccess = formData?.mfgAccess || {};

        if (type === 'default') {
            if (checked) {
                // If setting an item as default, unset all other defaults
                const updatedMfgAccess = { ...currentMfgAccess };

                // Clear all existing defaults
                mfgDepartments.forEach(item => {
                    if (updatedMfgAccess[item.key]) {
                        updatedMfgAccess[item.key] = {
                            ...updatedMfgAccess[item.key],
                            default: false
                        };
                    }
                });

                // Set the selected item as default
                updatedMfgAccess[itemKey] = {
                    ...updatedMfgAccess[itemKey],
                    default: true
                };

                onPermissionChange('mfgAccess', updatedMfgAccess);
            }
            // Don't allow unchecking default - always keep one default
            return;
        } else {
            const updatedMfgAccess = {
                ...currentMfgAccess,
                [itemKey]: {
                    ...currentMfgAccess[itemKey],
                    [type]: checked
                }
            };
            onPermissionChange('mfgAccess', updatedMfgAccess);
        }
    };

    const tabData = [
        {
            title: 'MFG Departments',
            items: [
                { key: 'am1', label: 'AM1' },
                { key: 'amdept1', label: 'AMDEPT1' },
                { key: 'assembling', label: 'Assembling' },
                { key: 'assembly', label: 'Assembly' },
                { key: 'bagPreparationWaxSetting', label: 'Bag Preparation Wax Setting' },
                { key: 'cad', label: 'CAD' },
                { key: 'cam', label: 'CAM' },
                { key: 'casting', label: 'Casting' },
                { key: 'castingFiling', label: 'Casting Filing' },
                { key: 'cleaning', label: 'Cleaning' },
                { key: 'department', label: 'Department' },
                { key: 'ec', label: 'EC' },
                { key: 'ecPolish', label: 'EC polish' },
                { key: 'electroFiling', label: 'Electro Filing' },
                { key: 'filing', label: 'Filing' },
                { key: 'finalPolish', label: 'Final Polish' },
                { key: 'finalPolishQc', label: 'Final Polish Qc' }
            ],
            hasDefault: true
        },
        {
            title: 'Casting Departments',
            items: [
                { key: 'tree', label: 'Tree' },
                { key: 'bindFlask', label: 'Bind Flask' },
                { key: 'investment', label: 'Investment' },
                { key: 'burnOut', label: 'Burn Out' },
                { key: 'unlock', label: 'Unlock' },
                { key: 'showList', label: 'Show List' },
                { key: 'dashBoard', label: 'Dash Board' }
            ],
            hasDefault: false
        },
        {
            title: 'QC Departments',
            items: [
                { key: 'cvdTesting', label: 'CVD Testing' },
                { key: 'materialReconciliation', label: 'Material Reconciliation' },
                { key: 'metalTesting', label: 'Metal Testing' },
                { key: 'metalAesthetic', label: 'Metal+Aesthetic' },
                { key: 'salesQc', label: 'Sales QC' },
                { key: 'skillMatrix', label: 'Skill Matrix' },
                { key: 'stoneQc', label: 'Stone QC' },
                { key: 'thirdPartyQc', label: 'Third Party QC' }
            ],
            hasDefault: false
        }
    ];

    const mfgDepartments = tabData[0].items; // Keep for default logic

    const getCheckboxValue = (itemKey, type) => {
        return formData?.mfgAccess?.[itemKey]?.[type] || false;
    };

    const handleSelectAll = (items, selectAll, type) => {
        const currentMfgAccess = formData?.mfgAccess || {};
        let updatedMfgAccess = { ...currentMfgAccess };

        items.forEach(item => {
            updatedMfgAccess[item.key] = {
                ...updatedMfgAccess[item.key],
                [type]: selectAll
            };
        });

        onPermissionChange('mfgAccess', updatedMfgAccess);
    };

    const isAllSelected = (items, type) => {
        return items.every(item => getCheckboxValue(item.key, type));
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
                <Typography variant="subtitle2" sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.title,
                    fontSize: '0.875rem'
                }}>
                    {data.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2.6 }}>
                        <Tooltip title={isAllSelected(data.items, 'access') ? "Deselect All Access" : "Select All Access"}>
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
            </Box>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                bgcolor: '#f8fafc',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: theme.palette.primary.title,
                                borderBottom: '2px solid #e2e8f0'
                            }}>
                                Department
                            </TableCell>
                            <TableCell align="center" sx={{
                                bgcolor: '#f8fafc',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: theme.palette.primary.title,
                                borderBottom: '2px solid #e2e8f0',
                                width: 80
                            }}>
                                Access
                            </TableCell>
                            {data.hasDefault && (
                                <TableCell align="center" sx={{
                                    bgcolor: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    borderBottom: '2px solid #e2e8f0',
                                    width: 80
                                }}>
                                    Default
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.items.map((item) => (
                            <TableRow key={item.key} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                                <TableCell sx={{
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    py: 1.5
                                }}>
                                    {item.label}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1.5 }}>
                                    <ToggleSwitch
                                        checked={getCheckboxValue(item.key, 'access')}
                                        onChange={() => handleChange(item.key, !getCheckboxValue(item.key, 'access'), 'access')}
                                        activeColor={theme.palette.toggle.active}
                                        inactiveColor={theme.palette.toggle.inactive}
                                        width={32}
                                        height={18}
                                    />
                                </TableCell>
                                {data.hasDefault && (
                                    <TableCell align="center" sx={{ py: 1.5 }}>
                                        <ToggleSwitch
                                            checked={getCheckboxValue(item.key, 'default')}
                                            onChange={() => handleChange(item.key, !getCheckboxValue(item.key, 'default'), 'default')}
                                            activeColor={theme.palette.toggle.active}
                                            inactiveColor={theme.palette.toggle.inactive}
                                            width={32}
                                            height={18}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    return (
        <Box>
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
                    {tabData.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.title}
                        />
                    ))}
                </Tabs>
                {renderTabContent(getCurrentTabData())}
            </Paper>
        </Box>
    );
};

export default MFGAccessComponent;
