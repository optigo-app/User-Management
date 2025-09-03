import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    TextField,
    InputAdornment,
    Tooltip,
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { Shield, Search } from 'lucide-react';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const FGStockAccessComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const handleAccessChange = (lockerKey, checked) => {
        const currentFgStock = formData?.fgStockAccess || {};
        const updatedFgStock = {
            ...currentFgStock,
            [lockerKey]: checked
        };
        onPermissionChange('fgStockAccess', updatedFgStock);
    };

    const handleDefaultLockerChange = (lockerKey, checked) => {
        const currentFgStock = formData?.fgStockAccess || {};
        let updatedFgStock = { ...currentFgStock };

        if (checked) {
            fgLockers.forEach(locker => {
                if (locker.key !== lockerKey) {
                    updatedFgStock[`${locker.key}_default`] = false;
                }
            });
            updatedFgStock[`${lockerKey}_default`] = true;
        } else {
            updatedFgStock[`${lockerKey}_default`] = false;
        }

        onPermissionChange('fgStockAccess', updatedFgStock);
    };

    const handleSelectAll = (selectAll) => {
        const currentFgStock = formData?.fgStockAccess || {};
        let updatedFgStock = { ...currentFgStock };
        
        fgLockers.forEach(locker => {
            updatedFgStock[locker.key] = selectAll;
            if (!selectAll) {
                updatedFgStock[`${locker.key}_default`] = false;
            }
        });
        
        onPermissionChange('fgStockAccess', updatedFgStock);
    };

    const isAllSelected = () => {
        return fgLockers.every(locker => getCheckboxValue(locker.key));
    };

    const fgLockers = [
        { key: 'locker001', name: 'Main Storage Locker A1', location: 'Warehouse A' },
        { key: 'locker002', name: 'Secondary Storage B2', location: 'Warehouse B' },
        { key: 'locker003', name: 'Cold Storage C1', location: 'Cold Section' },
        { key: 'locker004', name: 'High Security D1', location: 'Secure Area' },
        { key: 'locker005', name: 'Quick Access E1', location: 'Front Dock' }
    ];

    const getCheckboxValue = (lockerKey) => {
        return formData?.fgStockAccess?.[lockerKey] || false;
    };

    const getDefaultLockerValue = (lockerKey) => {
        return formData?.fgStockAccess?.[`${lockerKey}_default`] || false;
    };

    const getEnabledCount = () => {
        return fgLockers.filter(locker => getCheckboxValue(locker.key)).length;
    };

    const filteredLockers = fgLockers?.filter(locker => {
        const matchesSearch = locker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            locker.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <Box>
            <Card sx={{
                borderRadius: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
            }}>
                <Box sx={{
                    p: 1.5,
                    bgcolor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.9rem', color: theme.palette?.primary?.title }}>
                                FG Stock Access
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: theme.palette.primary.subtitle }}>
                                {getEnabledCount()} of {filteredLockers.length} lockers enabled
                            </Typography>
                        </Box>
                    </Box>
                    <Tooltip title={isAllSelected() ? "Disable All" : "Enable All"}>
                        <ToggleSwitch
                            checked={isAllSelected()}
                            onChange={() => handleSelectAll(!isAllSelected())}
                            activeColor={theme.palette.toggle.active}
                            inactiveColor={theme.palette.toggle.inactive}
                            width={32}
                            height={18}
                        />
                    </Tooltip>
                </Box>

                <Box sx={{ p: 1.5, borderBottom: '1px solid #e2e8f0', textAlign: "end" }}>
                    <TextField
                        size="small"
                        placeholder="Search lockers by name or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={16} color={theme.palette.primary.subtitle} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                borderRadius: 1,
                                fontSize: '0.875rem'
                            }
                        }}
                    />
                </Box>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Locker Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Location
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Access
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Default Locker
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredLockers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: 'center', color: theme.palette.primary.subtitle, p: 3, border: 'none' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                            No lockers found matching your search criteria
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredLockers.map((locker, lockerIndex) => {
                                    const isChecked = getCheckboxValue(locker.key);
                                    const isDefault = getDefaultLockerValue(locker.key);

                                    return (
                                        <TableRow
                                            key={locker.key}
                                            sx={{
                                                '&:hover': {
                                                    bgcolor: '#f8fafc'
                                                },
                                                '&:last-child td': {
                                                    borderBottom: 'none'
                                                }
                                            }}
                                        >
                                            <TableCell sx={{
                                                fontWeight: isChecked ? 500 : 400,
                                                color: isChecked ? theme.palette.primary.title : theme.palette.primary.light,
                                                fontSize: '0.875rem',
                                                borderBottom: '1px solid #e2e8f0'
                                            }}>
                                                {locker.name}
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: isChecked ? 500 : 400,
                                                color: isChecked ? theme.palette.primary.title : theme.palette.primary.light,
                                                fontSize: '0.875rem',
                                                borderBottom: '1px solid #e2e8f0'
                                            }}>
                                                {locker.location}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <ToggleSwitch
                                                    checked={isChecked}
                                                    onChange={() => handleAccessChange(locker.key, !isChecked)}
                                                    activeColor={theme.palette.toggle.active}
                                                    inactiveColor={theme.palette.toggle.inactive}
                                                    width={32}
                                                    height={18}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <ToggleSwitch
                                                    checked={isDefault}
                                                    onChange={() => handleDefaultLockerChange(locker.key, !isDefault)}
                                                    activeColor={theme.palette.toggle.active}
                                                    inactiveColor={theme.palette.toggle.inactive}
                                                    width={32}
                                                    height={18}
                                                    disabled={!isChecked}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default FGStockAccessComponent;
