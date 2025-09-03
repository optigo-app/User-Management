import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
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

const StockAccessComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const handlePermissionChange = (lockerKey, permissionType, checked) => {
        const currentStockAccess = formData?.stockAccess || {};
        const updatedStockAccess = {
            ...currentStockAccess,
            [`${lockerKey}_${permissionType}`]: checked
        };
        onPermissionChange('stockAccess', updatedStockAccess);
    };

    const handleSelectAll = (selectAll) => {
        const currentStockAccess = formData?.stockAccess || {};
        let updatedStockAccess = { ...currentStockAccess };
        
        stockLockers.forEach(locker => {
            ['read', 'write', 'fullGrade', 'onlySizeGrade'].forEach(permission => {
                updatedStockAccess[`${locker.key}_${permission}`] = selectAll;
            });
        });
        
        onPermissionChange('stockAccess', updatedStockAccess);
    };

    const isAllSelected = () => {
        return stockLockers.every(locker => 
            ['read', 'write', 'fullGrade', 'onlySizeGrade'].every(permission => 
                getCheckboxValue(locker.key, permission)
            )
        );
    };

    const stockLockers = [
        { key: 'locker001', name: 'Raw Material Storage A1', location: 'Warehouse A' },
        { key: 'locker002', name: 'Finished Goods B2', location: 'Warehouse B' },
        { key: 'locker003', name: 'Quality Control C1', location: 'QC Section' },
        { key: 'locker004', name: 'Export Ready D1', location: 'Export Area' },
        { key: 'locker005', name: 'Damaged Goods E1', location: 'Quarantine' }
    ];

    const getCheckboxValue = (lockerKey, permissionType) => {
        return formData?.stockAccess?.[`${lockerKey}_${permissionType}`] || false;
    };

    const getEnabledCount = () => {
        return stockLockers.filter(locker => 
            ['read', 'write', 'fullGrade', 'onlySizeGrade'].some(permission => 
                getCheckboxValue(locker.key, permission)
            )
        ).length;
    };

    const filteredLockers = stockLockers?.filter(locker => {
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
                                Stock Access
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
                                    Read
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Write
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Full Grade
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Only Size Grade
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredLockers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ textAlign: 'center', color: theme.palette.primary.subtitle, p: 3, border: 'none' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                            No lockers found matching your search criteria
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredLockers.map((locker, lockerIndex) => {
                                    const hasAnyPermission = ['read', 'write', 'fullGrade', 'onlySizeGrade'].some(permission => 
                                        getCheckboxValue(locker.key, permission)
                                    );

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
                                                fontWeight: hasAnyPermission ? 500 : 400,
                                                color: hasAnyPermission ? theme.palette.primary.title : theme.palette.primary.light,
                                                fontSize: '0.875rem',
                                                borderBottom: '1px solid #e2e8f0'
                                            }}>
                                                {locker.name}
                                            </TableCell>
                                            <TableCell sx={{ 
                                                fontWeight: hasAnyPermission ? 500 : 400,
                                                color: hasAnyPermission ? theme.palette.primary.title : theme.palette.primary.light,
                                                fontSize: '0.875rem',
                                                borderBottom: '1px solid #e2e8f0'
                                            }}>
                                                {locker.location}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <ToggleSwitch
                                                    checked={getCheckboxValue(locker.key, 'read')}
                                                    onChange={() => handlePermissionChange(locker.key, 'read', !getCheckboxValue(locker.key, 'read'))}
                                                    activeColor={theme.palette.toggle.active}
                                                    inactiveColor={theme.palette.toggle.inactive}
                                                    width={32}
                                                    height={18}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <ToggleSwitch
                                                    checked={getCheckboxValue(locker.key, 'write')}
                                                    onChange={() => handlePermissionChange(locker.key, 'write', !getCheckboxValue(locker.key, 'write'))}
                                                    activeColor={theme.palette.toggle.active}
                                                    inactiveColor={theme.palette.toggle.inactive}
                                                    width={32}
                                                    height={18}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <ToggleSwitch
                                                    checked={getCheckboxValue(locker.key, 'fullGrade')}
                                                    onChange={() => handlePermissionChange(locker.key, 'fullGrade', !getCheckboxValue(locker.key, 'fullGrade'))}
                                                    activeColor={theme.palette.toggle.active}
                                                    inactiveColor={theme.palette.toggle.inactive}
                                                    width={32}
                                                    height={18}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <ToggleSwitch
                                                    checked={getCheckboxValue(locker.key, 'onlySizeGrade')}
                                                    onChange={() => handlePermissionChange(locker.key, 'onlySizeGrade', !getCheckboxValue(locker.key, 'onlySizeGrade'))}
                                                    activeColor={theme.palette.toggle.active}
                                                    inactiveColor={theme.palette.toggle.inactive}
                                                    width={32}
                                                    height={18}
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

export default StockAccessComponent;
