import React from 'react';
import {
    Box,
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

const MFGLocationComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();

    const handleChange = (locationKey, checked) => {
        const currentMfgLocation = formData?.mfgLocation || {};
        const updatedMfgLocation = {
            ...currentMfgLocation,
            [locationKey]: {
                ...currentMfgLocation[locationKey],
                access: checked
            }
        };
        onPermissionChange('mfgLocation', updatedMfgLocation);
    };

    const mfgLocations = [
        { key: 'mumbai', label: 'Mumbai' },
        { key: 'm2', label: 'M2' },
        { key: 'india', label: 'INDIA' },
        { key: 'm1', label: 'M1' },
        { key: 'us', label: 'US' }
    ];

    const getCheckboxValue = (locationKey) => {
        return formData?.mfgLocation?.[locationKey]?.access || false;
    };

    return (
        <Box>
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
                                    MFG Location
                                </TableCell>
                                <TableCell align="center" sx={{ 
                                    bgcolor: '#f8fafc', 
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: theme.palette.primary.title,
                                    borderBottom: '2px solid #e2e8f0',
                                    width: 120
                                }}>
                                    Access
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mfgLocations.map((location) => (
                                <TableRow key={location.key} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                                    <TableCell sx={{ 
                                        fontSize: '0.875rem',
                                        color: theme.palette.primary.title,
                                        py: 1.5
                                    }}>
                                        {location.label}
                                    </TableCell>
                                    <TableCell align="center" sx={{ py: 1.5 }}>
                                        <ToggleSwitch
                                            checked={getCheckboxValue(location.key)}
                                            onChange={() => handleChange(location.key, !getCheckboxValue(location.key))}
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
        </Box>
    );
};

export default MFGLocationComponent;
