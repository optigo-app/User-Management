import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputAdornment,
    Chip,
    IconButton,
    Tooltip,
    useTheme
} from '@mui/material';
import {
    Search,
    Clock,
    Infinity,
    Zap,
    Edit3,
    Check,
    X
} from 'lucide-react';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';
import PermissionSectionHeader from '../../../Ui/PermissionSectionHeader';

const QuickAccessComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [tempDays, setTempDays] = useState('');

    const handleChange = (menuId, field, value) => {
        const currentQuickAccess = formData?.quickAccess || {};
        const updatedQuickAccess = {
            ...currentQuickAccess,
            [menuId]: {
                ...currentQuickAccess[menuId],
                [field]: value
            }
        };
        onPermissionChange('quickAccess', updatedQuickAccess);
    };

    const handleLifetimeToggle = (menuId, isLifetime) => {
        const currentQuickAccess = formData?.quickAccess || {};
        const updatedQuickAccess = {
            ...currentQuickAccess,
            [menuId]: {
                ...currentQuickAccess[menuId],
                isLifetime: isLifetime,
                rightsdays: isLifetime ? null : (currentQuickAccess[menuId]?.rightsdays || 1000),
                rightfromdate: isLifetime ? null : (currentQuickAccess[menuId]?.rightfromdate || new Date().toISOString())
            }
        };
        onPermissionChange('quickAccess', updatedQuickAccess);
    };

    const getPermissionValue = (menuId, field) => {
        return formData?.quickAccess?.[menuId]?.[field] || false;
    };

    const getNumericValue = (menuId, field) => {
        return formData?.quickAccess?.[menuId]?.[field] || '';
    };

    const isLifetime = (menuId) => {
        return formData?.quickAccess?.[menuId]?.isLifetime || false;
    };

    const handleEditStart = (itemId) => {
        setEditingItem(itemId);
        setTempDays(getNumericValue(itemId, 'rightsdays') || '');
    };

    const handleEditSave = (itemId) => {
        if (tempDays) {
            handleChange(itemId, 'rightsdays', parseInt(tempDays) || 0);
        }
        setEditingItem(null);
        setTempDays('');
    };

    const handleEditCancel = () => {
        setEditingItem(null);
        setTempDays('');
    };

    const handleQuickSet = (itemId, days) => {
        handleChange(itemId, 'rightsdays', days);
        setEditingItem(null);
        setTempDays('');
    };

    const allMenuItems = [
        { id: 1003, menuname: 'ACCOUNT', submenuname: 'Bill Payment' },
        { id: 2001, menuname: 'CUSTOMER', submenuname: 'Customer' },
        { id: 3001, menuname: 'DESIGNS', submenuname: 'Design Master' },
        { id: 4001, menuname: 'MANUFACTURER MGT', submenuname: 'Product Alteration' },
        { id: 4002, menuname: 'MANUFACTURER MGT', submenuname: 'Product Alteration Receive' },
        { id: 4003, menuname: 'MANUFACTURER MGT', submenuname: 'Material Issue' },
        { id: 4004, menuname: 'MANUFACTURER MGT', submenuname: 'Material Return' },
        { id: 4005, menuname: 'MANUFACTURER MGT', submenuname: 'Memo From Manuf.' }
    ];

    const filteredMenuItems = allMenuItems.filter(item =>
        item.submenuname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.menuname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const renderPermissionRow = (item) => (
        <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
            <TableCell sx={{
                fontSize: '0.875rem',
                color: theme.palette.primary.title,
                py: 1.5,
                fontWeight: 500
            }}>
                {item.submenuname}
            </TableCell>
            <TableCell sx={{
                fontSize: '0.875rem',
                color: theme.palette.primary.subtitle,
                py: 1.5,
                width: 120
            }}>
                <Chip
                    label={item.menuname}
                    size="small"
                    sx={{
                        bgcolor: 'rgba(0, 0, 0, 0.08)',
                        color: theme.palette.primary.title,
                        fontSize: '0.7rem',
                        height: 22
                    }}
                />
            </TableCell>
            <TableCell align="center" sx={{ py: 1.5, width: 80 }}>
                <ToggleSwitch
                    checked={getPermissionValue(item.id, 'isaddright')}
                    onChange={() => handleChange(item.id, 'isaddright', !getPermissionValue(item.id, 'isaddright'))}
                    activeColor={theme.palette.toggle.active}
                    inactiveColor={theme.palette.toggle.inactive}
                    width={32}
                    height={18}
                />
            </TableCell>
            <TableCell align="center" sx={{ py: 1.5, width: 80 }}>
                <ToggleSwitch
                    checked={getPermissionValue(item.id, 'iseditright')}
                    onChange={() => handleChange(item.id, 'iseditright', !getPermissionValue(item.id, 'iseditright'))}
                    activeColor={theme.palette.toggle.active}
                    inactiveColor={theme.palette.toggle.inactive}
                    width={32}
                    height={18}
                />
            </TableCell>
            <TableCell align="center" sx={{ py: 1.5, width: 80 }}>
                <ToggleSwitch
                    checked={getPermissionValue(item.id, 'isfutureright')}
                    onChange={() => handleChange(item.id, 'isfutureright', !getPermissionValue(item.id, 'isfutureright'))}
                    activeColor={theme.palette.toggle.active}
                    inactiveColor={theme.palette.toggle.inactive}
                    width={32}
                    height={18}
                />
            </TableCell>
            <TableCell align="center" sx={{ py: 1.5, width: 140 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    {/* Status Display */}
                    <Chip
                        icon={isLifetime(item.id) ? <Infinity size={14} /> : <Clock size={14} />}
                        label={isLifetime(item.id) ? "Lifetime" : `${getNumericValue(item.id, 'rightsdays') || 0} days`}
                        size="small"
                        sx={{
                            bgcolor: isLifetime(item.id) ? theme.palette.primary.main : theme.palette.primary.extraLight,
                            color: isLifetime(item.id) ? 'white' : theme.palette.primary.title,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 24,
                            minWidth: 80,
                            '& .MuiChip-icon': { color: 'white' }
                        }}
                    />

                    {/* Edit Controls */}
                    {editingItem === item.id ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            {/* Lifetime Toggle */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontSize: '0.7rem', color: theme.palette.primary.title }}>
                                    Lifetime
                                </Typography>
                                <ToggleSwitch
                                    checked={isLifetime(item.id)}
                                    onChange={() => handleLifetimeToggle(item.id, !isLifetime(item.id))}
                                    activeColor={theme.palette.success.main}
                                    inactiveColor={theme.palette.grey[400]}
                                    width={28}
                                    height={16}
                                />
                            </Box>

                            {/* Days Input */}
                            {!isLifetime(item.id) && (
                                <>
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={tempDays}
                                        onChange={(e) => setTempDays(e.target.value)}
                                        placeholder="Days"
                                        autoFocus
                                        sx={{
                                            width: 100,
                                            '& .MuiOutlinedInput-root': {
                                                fontSize: '0.75rem',
                                                height: 28
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                textAlign: 'center',
                                                py: 0.5
                                            }
                                        }}
                                        inputProps={{ min: 0, max: 9999 }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') handleEditSave(item.id);
                                            if (e.key === 'Escape') handleEditCancel();
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        {[30, 90, 365].map((days) => (
                                            <Chip
                                                key={days}
                                                label={days}
                                                size="small"
                                                clickable
                                                onClick={() => handleQuickSet(item.id, days)}
                                                sx={{
                                                    fontSize: '0.65rem',
                                                    height: 18,
                                                    minWidth: 24,
                                                    color: theme.palette.primary.title,
                                                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.12)' }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </>
                            )}

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <IconButton
                                    size="small"
                                    onClick={() => handleEditSave(item.id)}
                                    sx={{
                                        bgcolor: theme.palette.success.main,
                                        color: 'white',
                                        width: 24,
                                        height: 24,
                                        '&:hover': { bgcolor: theme.palette.success.dark }
                                    }}
                                >
                                    <Check size={12} />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={handleEditCancel}
                                    sx={{
                                        bgcolor: theme.palette.grey[400],
                                        color: 'white',
                                        width: 24,
                                        height: 24,
                                        '&:hover': { bgcolor: theme.palette.grey[600] }
                                    }}
                                >
                                    <X size={12} />
                                </IconButton>
                            </Box>
                        </Box>
                    ) : (
                        <Tooltip title="Edit access period">
                            <IconButton
                                size="small"
                                onClick={() => handleEditStart(item.id)}
                                sx={{
                                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                                    width: 24,
                                    height: 24,
                                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' }
                                }}
                            >
                                <Edit3 size={12} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </TableCell>
        </TableRow>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, background: '#f8fafc', borderRadius: '8px 8px 0 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <TextField
                    size="small"
                    placeholder="Search menus..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={16} color={theme.palette.grey[400]} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: 250,
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            fontSize: '0.875rem'
                        }
                    }}
                />
            </Box>

            {/* Single Table */}
            <Paper sx={{ borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
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
                                    Menu Name
                                </TableCell>
                                <TableCell sx={{
                                    bgcolor: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    borderBottom: '2px solid #e2e8f0',
                                    width: 120
                                }}>
                                    Category
                                </TableCell>
                                <TableCell sx={{
                                    bgcolor: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    borderBottom: '2px solid #e2e8f0',
                                    width: 80
                                }}>
                                    Add
                                </TableCell>
                                <TableCell sx={{
                                    bgcolor: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    borderBottom: '2px solid #e2e8f0',
                                    width: 80
                                }}>
                                    Edit
                                </TableCell>
                                <TableCell sx={{
                                    bgcolor: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    borderBottom: '2px solid #e2e8f0',
                                    width: 80
                                }}>
                                    Future
                                </TableCell>
                                <TableCell align="center" sx={{
                                    bgcolor: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    borderBottom: '2px solid #e2e8f0',
                                    width: 180
                                }}>
                                    Access Period
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredMenuItems.map(renderPermissionRow)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default QuickAccessComponent;