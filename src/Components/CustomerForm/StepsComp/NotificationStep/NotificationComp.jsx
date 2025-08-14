import React, { useState, useEffect } from "react";
import { IconButton, Checkbox, FormControlLabel, Box, Chip, Typography, useTheme } from "@mui/material";
import { Mail, Phone, Bell, Plus, X } from "lucide-react";
import { Badge, CollapsibleSection, Input, Select } from "../../../Ui";

const NotificationComp = ({ expandedSections, onToggleSection, formData, error, onUpdate }) => {
    const theme = useTheme();

    const [emailAlerts, setEmailAlerts] = useState(formData.emailAlerts || []);
    const [mobileAlerts, setMobileAlerts] = useState(formData.mobileAlerts || []);
    const [notificationPreferences, setNotificationPreferences] = useState(
        formData.notificationPreferences || {
            orderUpdates: true,
            paymentAlerts: true,
            promotions: false,
            newsletters: false,
        }
    );
    const [emailInput, setEmailInput] = useState("");
    const [mobileInput, setMobileInput] = useState("");
    const [countryCode, setCountryCode] = useState("");

    // Sync local state with Redux state
    useEffect(() => {
        setEmailAlerts(formData.emailAlerts || []);
        setMobileAlerts(formData.mobileAlerts || []);
        setNotificationPreferences(formData.notificationPreferences || {});
    }, [formData]);

    // Handlers for email alerts
    const onAddEmail = (email) => {
        const updatedEmails = [...emailAlerts, email];
        setEmailAlerts(updatedEmails);
        onUpdate({ emailAlerts: updatedEmails });
        setEmailInput("");
    };

    const onRemoveEmail = (index) => {
        const updatedEmails = emailAlerts.filter((_, i) => i !== index);
        setEmailAlerts(updatedEmails);
        onUpdate({ emailAlerts: updatedEmails });
    };

    // Handlers for mobile alerts
    const onAddMobile = (countryCode, mobileNo) => {
        const updatedMobiles = [...mobileAlerts, { countryCode, mobileNo }];
        setMobileAlerts(updatedMobiles);
        onUpdate({ mobileAlerts: updatedMobiles });
        setMobileInput("");
    };

    const onRemoveMobile = (index) => {
        const updatedMobiles = mobileAlerts.filter((_, i) => i !== index);
        setMobileAlerts(updatedMobiles);
        onUpdate({ mobileAlerts: updatedMobiles });
    };

    // Handler for notification preferences
    const handlePreferenceChange = (id) => {
        const updatedPreferences = {
            ...notificationPreferences,
            [id]: !notificationPreferences[id],
        };
        setNotificationPreferences(updatedPreferences);
        onUpdate({ notificationPreferences: updatedPreferences });
    };

    // Style objects (unchanged)
    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid rgb(229, 231, 235)',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: '0.2s',
        flex: 1,
    };

    const iconButtonStyle = {
        border: "1px solid #e5e7eb",
        background: theme.palette.primary.primaryGradient,
        color: theme.palette.primary.contrastText,
        borderRadius: "8px",
        padding: "6px 12px",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
        cursor: "pointer",
    };

    const [emailHover, setEmailHover] = useState(false);
    const [mobileHover, setMobileHover] = useState(false);

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            {/* Email Notifications */}
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

            {/* SMS Notifications */}
            <CollapsibleSection
                isOpen={expandedSections.smsNotifications}
                onToggle={() => onToggleSection("smsNotifications")}
                icon={Phone}
                gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                title="SMS Notifications"
                subtitle="Mobile numbers for SMS alerts"
                fieldCount={`${mobileAlerts.length} numbers`}
            >
                <Box>
                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        {mobileAlerts.map((mobile, index) => (
                            <Chip
                                key={index}
                                label={`${mobile.countryCode} ${mobile.mobileNo}`}
                                icon={<Phone size={14} />}
                                onDelete={() => onRemoveMobile(index)}
                                deleteIcon={<X size={14} />}
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    <Box display="flex" gap={1}>
                        <Select
                            style={{ width: 100 }}
                            placeholder="+1"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            options={[
                                { value: "+1", label: "+1 (US/CA)" },
                                { value: "+91", label: "+91 (India)" },
                                { value: "+44", label: "+44 (UK)" },
                                { value: "+61", label: "+61 (Australia)" },
                            ]}
                        />

                        <Input
                            placeholder="Enter mobile number"
                            sx={{ border: "1px solid #ccc", borderRadius: 1, px: 1, flex: 1 }}
                            value={mobileInput}
                            onChange={(e) => setMobileInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && mobileInput.trim()) {
                                    onAddMobile(countryCode, mobileInput.trim());
                                }
                            }}
                        />

                        <IconButton
                            sx={mobileHover ? { ...iconButtonStyle, backgroundColor: "#f3f4f6" } : iconButtonStyle}
                            onMouseEnter={() => setMobileHover(true)}
                            onMouseLeave={() => setMobileHover(false)}
                            onClick={() => {
                                if (mobileInput.trim()) {
                                    onAddMobile(countryCode, mobileInput.trim());
                                }
                            }}
                        >
                            <Plus size={18} />
                        </IconButton>

                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        Include country code and mobile number
                    </Typography>
                </Box>
            </CollapsibleSection>

            {/* Notification Preferences */}
            <CollapsibleSection
                isOpen={expandedSections.notificationPreferences}
                onToggle={() => onToggleSection("notificationPreferences")}
                icon={Bell}
                gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                title="Notification Preferences"
                subtitle="Configure notification types and settings"
                fieldCount="4 types"
            >
                <Box>
                    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
                        {[
                            { id: "orderUpdates", label: "Order Updates", description: "Status changes, shipping updates" },
                            { id: "paymentAlerts", label: "Payment Alerts", description: "Payment confirmations, due dates" },
                            { id: "promotions", label: "Promotions", description: "Special offers, discounts" },
                            { id: "newsletters", label: "Newsletters", description: "Company news, product updates" },
                        ].map((pref) => (
                            <Box key={pref.id} display="flex" alignItems="flex-start" p={1} border="1px solid #ddd" borderRadius={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!notificationPreferences[pref.id]}
                                            onChange={() => handlePreferenceChange(pref.id)}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography variant="body2" fontWeight="500">
                                                {pref.label}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {pref.description}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </CollapsibleSection>
        </Box>
    );
};

export default NotificationComp;