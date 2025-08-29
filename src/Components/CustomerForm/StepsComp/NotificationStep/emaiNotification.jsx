import React from "react";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { Mail, X, CheckCircle, Plus } from "lucide-react";
import { CollapsibleSection, Input } from "../../../Ui";
import CustomInput from "../../../Ui/CustomInput";

const EmaiNotification = ({
    expandedSections,
    onToggleSection,
    emailAlerts,
    emailInput,
    setEmailInput,
    onAddEmail,
    onRemoveEmail,
    inputStyle,
    iconButtonStyle,
    handleVerify,
    error,
}) => {
    return (
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
                <Box display="flex" flexDirection="column" gap={1} mb={2}>
                    {emailAlerts.map((item, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                                border: "1px solid #e5e7eb",
                                borderRadius: 1,
                                p: 1,
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                label={item.email}
                                icon={<Mail size={14} />}
                                onDelete={() => onRemoveEmail(index)}
                                deleteIcon={<X size={14} />}
                                variant="outlined"
                                color={item.isVerified ? "success" : "default"}
                            />

                            {item.isVerified ? (
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <CheckCircle size={16} color="green" />
                                    <Typography variant="body2" color="green">
                                        Verified
                                    </Typography>
                                </Box>
                            ) : (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleVerify("email", index)}
                                >
                                    Verify
                                </Button>
                            )}
                        </Box>
                    ))}
                </Box>

                <Box display="flex" gap={1}>
                    <CustomInput
                        placeholder="Enter email address"
                        sx={inputStyle}
                        size="small"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") onAddEmail(emailInput);
                        }}
                        error={error ? true : false}
                        helperText={error}
                    />
                    <IconButton sx={iconButtonStyle} onClick={() => onAddEmail(emailInput)}>
                        <Plus size={18} />
                    </IconButton>
                </Box>
            </Box>
        </CollapsibleSection>
    );
};

export default EmaiNotification;
