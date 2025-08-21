import React, { useState, useEffect } from "react";
import { IconButton, Checkbox, FormControlLabel, Box,  useTheme } from "@mui/material";
import SmsNotification from "./smsNotification";
import EmaiNotification from "./emaiNotification";
import NotificationPrefrence from "./notificationPrefrence";

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
            <EmaiNotification
                onToggleSection={onToggleSection}
                expandedSections={expandedSections}
                inputStyle={inputStyle}
                iconButtonStyle={iconButtonStyle}
                emailHover={emailHover}
                setEmailHover={setEmailHover}
                emailAlerts={emailAlerts}
                onAddEmail={onAddEmail}
                onRemoveEmail={onRemoveEmail}
                emailInput={emailInput}
                setEmailInput={setEmailInput}
            />

            {/* SMS Notifications */}
            <SmsNotification
                onToggleSection={onToggleSection}
                expandedSections={expandedSections}
                iconButtonStyle={iconButtonStyle}
                mobileHover={mobileHover}
                setMobileHover={setMobileHover}
                mobileAlerts={mobileAlerts}
                onAddMobile={onAddMobile}
                onRemoveMobile={onRemoveMobile}
                countryCode={countryCode}
                mobileInput={mobileInput}
                setCountryCode={setCountryCode}
                setMobileInput={setMobileInput}
            />

            {/* Notification Preferences */}
            <NotificationPrefrence
                expandedSections={expandedSections}
                onToggleSection={onToggleSection}
                notificationPreferences={notificationPreferences}
                handlePreferenceChange={handlePreferenceChange}
            />

        </Box>
    );
};

export default NotificationComp;