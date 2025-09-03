import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button, Divider } from '@mui/material';
import { QrCode, Building2, Phone, Globe, User } from 'lucide-react';
import './IdCard.scss';

const IdCard = ({
    employeeData,
}) => {
    return (
        <Card className="id-card" elevation={8}>
            <CardContent className="id-card-content">
                {/* Header Section */}
                <Box className="card-header">
                    <Box className="company-logo">
                        <Building2 size={24} />
                    </Box>
                    <Box className="company-info">
                        <Typography variant="h6" className="company-name">
                            {employeeData.company}
                        </Typography>
                        <Typography variant="body2" className="company-address">
                            {employeeData.address}
                        </Typography>
                    </Box>
                </Box>

                <Divider className='divider' />

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
                            <Typography variant="caption">
                                Joining Date: {employeeData.joiningDate}
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
                        <QrCode size={50} />
                    </Box>
                    <Typography variant="body2" className="qr-label">
                        {employeeData.employeeId}
                    </Typography>
                </Box>
                <Divider className="divider" />
                {/* Footer Section */}
                <Box className="card-footer">
                    <Box className="contact-info">
                        <Box className="contact-item">
                            <Globe size={12} />
                            <Typography variant="body2">
                                {employeeData.website}
                            </Typography>
                        </Box>
                        <Box className="contact-item">
                            <Phone size={12} />
                            <Typography variant="body2">
                                {employeeData.phone}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default IdCard;
