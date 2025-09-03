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

const QCPermissionComponent = ({ formData, onPermissionChange }) => {
    const theme = useTheme();

    const handleChange = (statusKey, checked) => {
        const currentQcPermission = formData?.qcPermission || {};
        const updatedQcPermission = {
            ...currentQcPermission,
            [statusKey]: {
                ...currentQcPermission[statusKey],
                access: checked
            }
        };
        onPermissionChange('qcPermission', updatedQcPermission);
    };

    const qcStatuses = [
        { key: 'approved', label: 'Approved' },
        { key: 'rejected', label: 'Rejected' },
        { key: 'finalApproved', label: 'Final Approved' },
        { key: 'finalRejected', label: 'Final Rejected' }
    ];

    const getCheckboxValue = (statusKey) => {
        return formData?.qcPermission?.[statusKey]?.access || false;
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
                                    Status
                                </TableCell>
                                <TableCell sx={{ 
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
                            {qcStatuses?.map((status) => (
                                <TableRow key={status.key} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                                    <TableCell sx={{ 
                                        fontSize: '0.875rem',
                                        color: theme.palette.primary.title,
                                        py: 1.5
                                    }}>
                                        {status.label}
                                    </TableCell>
                                    <TableCell sx={{ py: 1.5 }}>
                                        <ToggleSwitch
                                            checked={getCheckboxValue(status.key)}
                                            onChange={() => handleChange(status.key, !getCheckboxValue(status.key))}
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

export default QCPermissionComponent;
