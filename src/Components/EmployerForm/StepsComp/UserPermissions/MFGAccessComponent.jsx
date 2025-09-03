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
    useTheme
} from '@mui/material';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const MFGAccessComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();

    const handleChange = (itemKey, checked, type) => {
        const currentMfgAccess = formData?.mfgAccess || {};
        
        if (type === 'default' && checked) {
            // If setting an item as default, unset all other defaults
            const updatedMfgAccess = { ...currentMfgAccess };
            
            // Clear all existing defaults
            mfgDepartments.forEach(item => {
                if (updatedMfgAccess[item.key]?.default) {
                    updatedMfgAccess[item.key] = {
                        ...updatedMfgAccess[item.key],
                        default: false
                    };
                }
            });
            
            // Set the new default
            updatedMfgAccess[itemKey] = {
                ...updatedMfgAccess[itemKey],
                default: checked
            };
            
            onPermissionChange('mfgAccess', updatedMfgAccess);
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

    const mfgDepartments = [
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
    ];

    const castingDepartments = [
        { key: 'tree', label: 'Tree' },
        { key: 'bindFlask', label: 'Bind Flask' },
        { key: 'investment', label: 'Investment' },
        { key: 'burnOut', label: 'Burn Out' },
        { key: 'unlock', label: 'Unlock' },
        { key: 'showList', label: 'Show List' },
        { key: 'dashBoard', label: 'Dash Board' }
    ];

    const qcDepartments = [
        { key: 'cvdTesting', label: 'CVD Testing' },
        { key: 'materialReconciliation', label: 'Material Reconciliation' },
        { key: 'metalTesting', label: 'Metal Testing' },
        { key: 'metalAesthetic', label: 'Metal+Aesthetic' },
        { key: 'salesQc', label: 'Sales QC' },
        { key: 'skillMatrix', label: 'Skill Matrix' },
        { key: 'stoneQc', label: 'Stone QC' },
        { key: 'thirdPartyQc', label: 'Third Party QC' }
    ];

    const getCheckboxValue = (itemKey, type) => {
        return formData?.mfgAccess?.[itemKey]?.[type] || false;
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {/* MFG Departments */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
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
                                            MFG Departments
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mfgDepartments.map((item) => (
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Casting Departments */}
                <Grid size={{ xs: 12, md: 3.5 }}>
                    <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
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
                                            Casting Departments
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {castingDepartments.map((item) => (
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* QC Departments */}
                <Grid size={{ xs: 12, md: 3.5 }}>
                    <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
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
                                            QC Departments
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {qcDepartments.map((item) => (
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MFGAccessComponent;
