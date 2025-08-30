import React, { useState } from 'react';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { X, Download, Printer } from 'lucide-react';
import IdCard from './IdCard';

const IdCardPreview = ({ 
    open, 
    onClose, 
    employeeData,
    onDownload,
    onPrint 
}) => {
    const handlePrint = () => {
        window.print();
        if (onPrint) onPrint();
    };

    const handleDownload = () => {
        // Convert card to image/PDF logic here
        if (onDownload) onDownload();
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                }
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex: 1,
                        background: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 1)',
                        }
                    }}
                >
                    <X size={20} />
                </IconButton>
                
                <DialogContent sx={{ padding: 0 }}>
                    <IdCard 
                        employeeData={employeeData}
                        onPrint={handlePrint}
                        onContinue={onClose}
                        showActions={true}
                    />
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default IdCardPreview;
