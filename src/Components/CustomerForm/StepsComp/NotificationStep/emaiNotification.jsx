import React, { memo } from 'react'
import { Badge, CollapsibleSection, Input } from '../../../Ui';
import { Box, IconButton, Typography } from '@mui/material';
import { Mail, Plus } from 'lucide-react';

const EmaiNotification = ({ expandedSections, onToggleSection, emailAlerts, onAddEmail, onRemoveEmail, emailInput, setEmailInput, emailHover, setEmailHover, inputStyle, iconButtonStyle }) => {
  return (
    <div>
        <CollapsibleSection
                isOpen={expandedSections.emailNotifications}
                onToggle={() => onToggleSection("emailNotifications")}
                icon={Mail}
                gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                title="Email Notifications"
                subtitle="Multiple email addresses for notifications"
                fieldCount={`${emailAlerts.length} emails`}
            >
                <Box>
                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        {emailAlerts.map((email, index) => (
                            <Badge
                                key={index}
                                variant="destructive"
                                icon={<Mail size={14} />}
                                iconPosition="start"
                                closeIcon={true}
                                onClose={() => onRemoveEmail(index)}
                                sx={{ fontSize: 12 }}
                            >
                                {email}
                            </Badge>
                        ))}
                    </Box>
                    <Box display="flex" gap={1}>
                        <Input
                            placeholder="Enter email address (e.g., user@company.com)"
                            sx={inputStyle}
                            size="small"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    const val = e.currentTarget.value.trim();
                                    if (val && val.includes("@")) {
                                        onAddEmail(val);
                                        e.currentTarget.value = "";
                                    }
                                }
                            }}
                        />
                        <IconButton
                            sx={emailHover ? { ...iconButtonStyle, backgroundColor: "#f3f4f6" } : iconButtonStyle}
                            onMouseEnter={() => setEmailHover(true)}
                            onMouseLeave={() => setEmailHover(false)}
                            onClick={() => {
                                if (emailInput.trim() && emailInput.includes("@")) {
                                    onAddEmail(emailInput.trim());
                                }
                            }}
                        >
                            <Plus size={18} />
                        </IconButton>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        Press Enter or click + to add email addresses
                    </Typography>
                </Box>
            </CollapsibleSection>
    </div>
  )
}

export default EmaiNotification
