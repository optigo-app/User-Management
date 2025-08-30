import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Divider, Button } from '@mui/material';
import { QrCode, Building2, Calendar, Phone, Globe, User } from 'lucide-react';
import './IdCard.css';

const IdCard = ({ 
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
    },
    onPrint,
    onContinue,
    showActions = true
}) => {
    return (
        <Box className="id-card-container">
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#2c3e50' }}>
                Employee ID Card
            </Typography>
            
            <Card className="id-card" elevation={8}>
                <CardContent className="id-card-content">
                    {/* Header Section */}
                    <Box className="card-header">
                        <Box className="company-logo">
                            <Building2 size={24} color="#3498db" />
                        </Box>
                        <Box className="company-info">
                            <Typography variant="h6" className="company-name">
                                {employeeData.company}
                            </Typography>
                            <Typography variant="caption" className="company-address">
                                {employeeData.address}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider className="header-divider" />

                    {/* Employee Section */}
                    <Box className="employee-section">
                        <Box className="employee-avatar">
                            <Avatar 
                                src={employeeData.avatar} 
                                className="avatar"
                                sx={{ width: 80, height: 80 }}
                            >
                                <User size={40} />
                            </Avatar>
                        </Box>
                        
                        <Box className="employee-details">
                            <Typography variant="h6" className="employee-name">
                                {employeeData.name}
                            </Typography>
                            <Typography variant="body2" className="employee-position">
                                {employeeData.position}
                            </Typography>
                            
                            <Box className="joining-info">
                                <Calendar size={14} />
                                <Typography variant="caption">
                                    JOINING DATE: {employeeData.joiningDate}
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" className="employee-id">
                                ID: {employeeData.employeeId}
                            </Typography>
                        </Box>
                    </Box>

                    {/* QR Code Section */}
                    <Box className="qr-section">
                        <Box className="qr-code">
                            <QrCode size={60} />
                        </Box>
                        <Typography variant="caption" className="qr-label">
                            {employeeData.employeeId}
                        </Typography>
                    </Box>

                    <Divider className="footer-divider" />

                    {/* Footer Section */}
                    <Box className="card-footer">
                        <Box className="contact-info">
                            <Box className="contact-item">
                                <Globe size={12} />
                                <Typography variant="caption">
                                    {employeeData.website}
                                </Typography>
                            </Box>
                            <Box className="contact-item">
                                <Phone size={12} />
                                <Typography variant="caption">
                                    {employeeData.phone}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            {showActions && (
                <Box className="card-actions">
                    <Button 
                        variant="outlined" 
                        onClick={onPrint}
                        className="action-button print-button"
                        startIcon={<QrCode size={16} />}
                    >
                        Print
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={onContinue}
                        className="action-button continue-button"
                    >
                        Continue
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default IdCard;
