import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Divider } from '@mui/material';
import { QrCode, Building2, Calendar, Phone, Globe, User } from 'lucide-react';
import './PrintableIdCard.css';

const PrintableIdCard = ({ 
    employeeData = {
        name: "John Doe",
        employeeId: "E1185",
        position: "ACCOUNT EXECUTIVE",
        joiningDate: "19 JUL 2025",
        company: "Classmate Corporation Pvt Ltd",
        address: "G20, Ground floor, ITC building, Surat -999077,Gujarat(India)",
        website: "WWW.OPTIGO.COM",
        phone: "T:+91-261-4890777",
        avatar: null
    }
}) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Box className="printable-id-card-container">
            <Card className="printable-id-card" elevation={0}>
                <CardContent className="printable-card-content">
                    {/* Header Section */}
                    <Box className="printable-card-header">
                        <Box className="printable-company-logo">
                            <Building2 size={20} />
                        </Box>
                        <Box className="printable-company-info">
                            <Typography variant="h6" className="printable-company-name">
                                {employeeData.company}
                            </Typography>
                            <Typography variant="caption" className="printable-company-address">
                                {employeeData.address}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider className="printable-header-divider" />

                    {/* Employee Section */}
                    <Box className="printable-employee-section">
                        <Box className="printable-employee-avatar">
                            <Avatar 
                                src={employeeData.avatar} 
                                className="printable-avatar"
                                sx={{ width: 70, height: 70 }}
                            >
                                <User size={35} />
                            </Avatar>
                        </Box>
                        
                        <Box className="printable-employee-details">
                            <Typography variant="h6" className="printable-employee-name">
                                {employeeData.name}
                            </Typography>
                            <Typography variant="body2" className="printable-employee-position">
                                {employeeData.position}
                            </Typography>
                            
                            <Box className="printable-joining-info">
                                <Calendar size={12} />
                                <Typography variant="caption">
                                    JOINING DATE: {employeeData.joiningDate}
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" className="printable-employee-id">
                                ID: {employeeData.employeeId}
                            </Typography>
                        </Box>
                    </Box>

                    {/* QR Code Section */}
                    <Box className="printable-qr-section">
                        <Box className="printable-qr-code">
                            <QrCode size={50} />
                        </Box>
                        <Typography variant="caption" className="printable-qr-label">
                            {employeeData.employeeId}
                        </Typography>
                    </Box>

                    <Divider className="printable-footer-divider" />

                    {/* Footer Section */}
                    <Box className="printable-card-footer">
                        <Box className="printable-contact-info">
                            <Box className="printable-contact-item">
                                <Globe size={10} />
                                <Typography variant="caption">
                                    {employeeData.website}
                                </Typography>
                            </Box>
                            <Box className="printable-contact-item">
                                <Phone size={10} />
                                <Typography variant="caption">
                                    {employeeData.phone}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Print Button - Hidden in print mode */}
            <Box className="print-button-container">
                <button onClick={handlePrint} className="print-button">
                    Print ID Card
                </button>
            </Box>
        </Box>
    );
};

export default PrintableIdCard;
