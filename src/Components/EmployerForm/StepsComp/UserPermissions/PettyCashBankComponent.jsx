import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Divider,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Tooltip,
    useTheme
} from '@mui/material';
import { DollarSign, CreditCard, Wallet, Search } from 'lucide-react';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const PettyCashBankComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (key, checked, type) => {
        const isLocation = pettyCashLocations.some(loc => loc.key === key);
        const category = isLocation ? 'location' : 'access';
        const currentBankingPer = formData?.bankingPer || { location: {}, access: {} };
        const updatedBankingPer = {
            ...currentBankingPer,
            [category]: {
                ...currentBankingPer[category],
                [key]: checked
            }
        };
        onPermissionChange('bankingPer', updatedBankingPer);
    };

    const handleSelectAll = (items, selectAll) => {
        const isLocation = pettyCashLocations.some(loc => items.includes(loc));
        const category = isLocation ? 'location' : 'access';
        const currentBankingPer = formData?.bankingPer || { location: {}, access: {} };
        let updatedBankingPer = { ...currentBankingPer };
        
        items.forEach(item => {
            updatedBankingPer[category] = {
                ...updatedBankingPer[category],
                [item.key]: selectAll
            };
        });
        
        onPermissionChange('bankingPer', updatedBankingPer);
    };

    const isAllSelected = (items) => {
        return items.every(item => getCheckboxValue(item.key));
    };

    const pettyCashLocations = [
        { key: 'cashAC', label: 'Cash A/C', icon: Wallet },
        { key: 'cashB', label: 'Cash B', icon: Wallet },
        { key: 'pettyCash', label: 'Petty Cash', icon: DollarSign },
        { key: 'location245254', label: 'Location 245254', icon: Wallet }
    ];

    const bankAccess = [
        { key: 'hdfc', label: 'HDFC Bank', icon: CreditCard },
        { key: 'sbi', label: 'State Bank of India', icon: CreditCard },
        { key: 'baroda', label: 'Bank of Baroda', icon: CreditCard },
        { key: 'kotakMahindra', label: 'Kotak Mahindra Bank', icon: CreditCard },
        { key: 'boi', label: 'Bank of India', icon: CreditCard },
        { key: 'axis', label: 'Axis Bank', icon: CreditCard },
        { key: 'newCash', label: 'New Cash Account', icon: DollarSign },
        { key: 'yesBankOD', label: 'YES Bank OD', icon: CreditCard },
        { key: 'odAccount', label: 'OD Account', icon: CreditCard },
        { key: 'odAccountNew', label: 'New OD Account', icon: CreditCard },
        { key: 'axisBank', label: 'Axis Bank Branch', icon: CreditCard },
        { key: 'yesBankOD2', label: 'YES Bank - OD', icon: CreditCard },
        { key: 'creditCard', label: 'Credit Card', icon: CreditCard },
        { key: 'unionBank', label: 'Union Bank', icon: CreditCard }
    ];

    const getCheckboxValue = (key) => {
        const isLocation = pettyCashLocations.some(loc => loc.key === key);
        const category = isLocation ? 'location' : 'access';
        return formData?.bankingPer?.[category]?.[key] || false;
    };

    const getEnabledCount = (items) => {
        return items.filter(item => getCheckboxValue(item.key)).length;
    };

    const filteredBankAccess = bankAccess?.filter(bank => {
        const matchesSearch = bank.label.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
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
                                        Petty Cash Locations
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: theme.palette.primary.subtitle }}>
                                        {getEnabledCount(pettyCashLocations)} of {pettyCashLocations.length} enabled
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Tooltip title={isAllSelected(pettyCashLocations) ? "Deselect All" : "Select All"}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ToggleSwitch
                                            checked={isAllSelected(pettyCashLocations)}
                                            onChange={() => handleSelectAll(pettyCashLocations, !isAllSelected(pettyCashLocations))}
                                            activeColor={theme.palette.toggle.active}
                                            inactiveColor={theme.palette.toggle.inactive}
                                            width={32}
                                            height={18}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>

                        <CardContent sx={{ p: 0 }}>
                            {pettyCashLocations.map((location, index) => {
                                const IconComponent = location.icon;
                                const isChecked = getCheckboxValue(location.key);

                                return (
                                    <Box key={location.key}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            p: 1.5,
                                            '&:hover': {
                                                bgcolor: '#f8fafc'
                                            }
                                        }}>
                                            <IconComponent
                                                size={16}
                                                color={isChecked ? theme.palette.primary.title : theme.palette.primary.light}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <Typography variant="body2" sx={{
                                                flex: 1,
                                                fontWeight: isChecked ? 500 : 400,
                                                color: isChecked ? theme.palette.primary.title : theme.palette.primary.light,
                                                fontSize: '0.875rem'
                                            }}>
                                                {location.label}
                                            </Typography>
                                            <ToggleSwitch
                                                checked={isChecked}
                                                onChange={() => handleChange(location.key, !isChecked)}
                                                activeColor={theme.palette.toggle.active}
                                                inactiveColor={theme.palette.toggle.inactive}
                                                width={32}
                                                height={18}
                                            />
                                        </Box>
                                        {index < pettyCashLocations.length - 1 && (
                                            <Divider sx={{ borderColor: '#e2e8f0' }} />
                                        )}
                                    </Box>
                                );
                            })}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bank Access Section */}
                <Grid size={{ xs: 12, sm: 8 }}>
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
                                        Bank Access
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#64748b' }}>
                                        {getEnabledCount(filteredBankAccess)} of {filteredBankAccess.length} shown • {getEnabledCount(bankAccess)} total
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Tooltip title={isAllSelected(bankAccess) ? "Deselect All" : "Select All"}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ToggleSwitch
                                            checked={isAllSelected(bankAccess)}
                                            onChange={() => handleSelectAll(bankAccess, !isAllSelected(bankAccess))}
                                            activeColor={theme.palette.toggle.active}
                                            inactiveColor={theme.palette.toggle.inactive}
                                            width={32}
                                            height={18}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <Grid container spacing={1.5} alignItems="center" justifyContent="flex-end">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        size="small"
                                        placeholder="Search banks..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search size={16} color="#64748b" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: 'white',
                                                borderRadius: 1,
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <CardContent sx={{ p: 0, pb: "0 !important", maxHeight: '300px', overflowY: 'auto' }}>
                            {filteredBankAccess.length === 0 ? (
                                <Box sx={{ p: 3, textAlign: 'center', color: '#64748b' }}>
                                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                        No banks found matching your criteria
                                    </Typography>
                                </Box>
                            ) : (
                                filteredBankAccess.map((bank, index) => {
                                    const IconComponent = bank.icon;
                                    const isChecked = getCheckboxValue(bank.key);

                                    return (
                                        <Box key={bank.key}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 1.5,
                                                '&:hover': {
                                                    bgcolor: '#f8fafc'
                                                }
                                            }}>
                                                <IconComponent
                                                    size={16}
                                                    color={isChecked ? theme.palette.primary.title : theme.palette.primary.light}
                                                    style={{ marginRight: '8px' }}
                                                />
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="body2" sx={{
                                                        fontWeight: isChecked ? 500 : 400,
                                                        color: isChecked ? theme.palette.primary.title : theme.palette.primary.light,
                                                        fontSize: '0.875rem',
                                                        mb: 0.25
                                                    }}>
                                                        {bank.label}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{
                                                        color: '#94a3b8',
                                                        fontSize: '0.75rem'
                                                    }}>
                                                        {bank.category}
                                                    </Typography>
                                                </Box>
                                                <ToggleSwitch
                                                    checked={isChecked}
                                                    onChange={() => handleChange(bank.key, !isChecked)}
                                                    activeColor={theme.palette.toggle.active}
                                                    inactiveColor={theme.palette.toggle.inactive}
                                                    width={32}
                                                    height={18}
                                                />
                                            </Box>
                                            {index < filteredBankAccess.length - 1 && (
                                                <Divider sx={{ borderColor: '#e2e8f0' }} />
                                            )}
                                        </Box>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PettyCashBankComponent;
