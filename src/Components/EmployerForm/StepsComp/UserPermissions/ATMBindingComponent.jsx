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
import { CreditCard, User, Hash, Search } from 'lucide-react';
import { ToggleSwitch } from '../../../Ui/ToggleSwitch';

const ATMBindingComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const handleAccessChange = (userKey, checked) => {
        const currentAtmBinding = formData?.atmBinding || {};
        const updatedAtmBinding = {
            ...currentAtmBinding,
            [userKey]: checked
        };
        onPermissionChange('atmBinding', updatedAtmBinding);
    };

    const handleSelectAll = (selectAll) => {
        const currentAtmBinding = formData?.atmBinding || {};
        let updatedAtmBinding = { ...currentAtmBinding };
        
        atmUsers.forEach(user => {
            updatedAtmBinding[user.key] = selectAll;
        });
        
        onPermissionChange('atmBinding', updatedAtmBinding);
    };

    const isAllSelected = () => {
        return atmUsers.every(user => getCheckboxValue(user.key));
    };

    const atmUsers = [
        { key: 'user001', userId: 'USR001', userCode: 'AC001', name: 'John Smith', icon: User },
        { key: 'user002', userId: 'USR002', userCode: 'AC002', name: 'Sarah Johnson', icon: User },
        { key: 'user003', userId: 'USR003', userCode: 'AC003', name: 'Mike Davis', icon: User },
        { key: 'user004', userId: 'USR004', userCode: 'AC004', name: 'Emily Brown', icon: User }
    ];

    const getCheckboxValue = (userKey) => {
        return formData?.atmBinding?.[userKey] || false;
    };

    const getEnabledCount = () => {
        return atmUsers.filter(user => getCheckboxValue(user.key)).length;
    };

    const filteredUsers = atmUsers?.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             user.userCode.toLowerCase().includes(searchQuery.toLowerCase());
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
                                ATM User Access
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: theme.palette.primary.subtitle }}>
                                {getEnabledCount()} of {filteredUsers.length} users enabled
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

                <Box sx={{ p: 1.5, borderBottom: '1px solid #e2e8f0', textAlign:"end" }}>
                    <TextField
                        size="small"
                        placeholder="Search users by name, ID, or code..."
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
                                    User ID
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    User Code
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.title, fontSize: '0.75rem', border: 'none' }}>
                                    Access
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: 'center', color: theme.palette.primary.subtitle, p: 3, border: 'none' }}>
                                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                            No users found matching your search criteria
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user, userIndex) => {
                                    const isChecked = getCheckboxValue(user.key);

                                    return (
                                        <TableRow 
                                            key={user.key}
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
                                                {user.userId}
                                            </TableCell>
                                            <TableCell sx={{ 
                                                fontWeight: isChecked ? 500 : 400,
                                                color: isChecked ? theme.palette.primary.title : theme.palette.primary.light,
                                                fontSize: '0.875rem',
                                                borderBottom: '1px solid #e2e8f0'
                                            }}>
                                                {user.userCode}
                                            </TableCell>
                                            <TableCell sx={{ 
                                                fontWeight: isChecked ? 500 : 400,
                                                color: isChecked ? theme.palette.primary.title : theme.palette.primary.light,
                                                fontSize: '0.875rem',
                                                borderBottom: '1px solid #e2e8f0'
                                            }}>
                                                {user.name}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <ToggleSwitch
                                                    checked={isChecked}
                                                    onChange={() => handleAccessChange(user.key, !isChecked)}
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

export default ATMBindingComponent;
