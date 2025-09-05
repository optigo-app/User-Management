import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import SmsNotification from "./smsNotification";
import EmaiNotification from "./emaiNotification";
import NotificationPrefrence from "./notificationPrefrence";

const NotificationComp = ({ expandedSections, onToggleSection, formData, error, onUpdate, formType = "customer" }) => {
    const theme = useTheme();

    const [emailAlerts, setEmailAlerts] = useState(
        formData.emailAlerts || []
    );
    const [mobileAlerts, setMobileAlerts] = useState(
        formData.mobileAlerts || []
    );

    const [notificationPreferences, setNotificationPreferences] = useState(
        formData.notificationPreferences || {
            orderUpdates: true,
            paymentAlerts: true,
            promotions: false,
            newsletters: false,
        }
    );

    const [errorMsg, setErrorMsg] = useState({ email: "", mobile: "" });
    const [emailInput, setEmailInput] = useState("");
    const [mobileInput, setMobileInput] = useState("");
    const [countryCode, setCountryCode] = useState("+1");

    useEffect(() => {
        setEmailAlerts(formData.emailAlerts || []);
        setMobileAlerts(formData.mobileAlerts || []);
        setNotificationPreferences(formData.notificationPreferences || {});
    }, [formData]);

    // Validation
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const isValidMobile = (number) => /^\d{6,15}$/.test(number.trim());

    // Add / Remove handlers
    const onAddEmail = (email) => {
        const trimmed = email.trim();
        if (!trimmed) return;
        if (!isValidEmail(trimmed)) {
            return setErrorMsg({ ...errorMsg, email: "Invalid email" });
        }
        if (emailAlerts.some(item => item.email.toLowerCase() === trimmed.toLowerCase())) {
            return setErrorMsg({ ...errorMsg, email: "Email already exists" });
        }
        const updated = [...emailAlerts, { email: trimmed, isVerified: false }];
        setEmailAlerts(updated);
        onUpdate({ emailAlerts: updated });
        setEmailInput("");
        setErrorMsg({ ...errorMsg, email: "" });
    };

    const onRemoveEmail = (index) => {
        const updated = emailAlerts.filter((_, i) => i !== index);
        setEmailAlerts(updated);
        onUpdate({ emailAlerts: updated });
    };

    const onAddMobile = (countryCode, mobileNo) => {
        debugger
        const trimmed = mobileNo?.trim();
        if (!trimmed) return;
        if (!isValidMobile(trimmed)) {
            return setErrorMsg({ ...errorMsg, mobile: "Invalid mobile number" });
        }
        if (mobileAlerts.some(item => item.countryCode === countryCode && item.mobileNo === trimmed)) {
            return setErrorMsg({ ...errorMsg, mobile: "Mobile number already exists" });
        }
        const updated = [...mobileAlerts, { countryCode, mobileNo: trimmed, isVerified: false }];
        setMobileAlerts(updated);
        onUpdate({ mobileAlerts: updated });
        setMobileInput("");
        setErrorMsg({ ...errorMsg, mobile: "" });
    };

    const onRemoveMobile = (index) => {
        const updated = mobileAlerts.filter((_, i) => i !== index);
        setMobileAlerts(updated);
        onUpdate({ mobileAlerts: updated });
    };

    // Unified verify handler
    const handleVerify = (type, index) => {
        if (type === "email") {
            const updated = emailAlerts.map((item, i) =>
                i === index ? { ...item, isVerified: true } : item
            );
            setEmailAlerts(updated);
            onUpdate({ emailAlerts: updated });
        } else if (type === "sms") {
            const updated = mobileAlerts.map((item, i) =>
                i === index ? { ...item, isVerified: true } : item
            );
            setMobileAlerts(updated);
            onUpdate({ mobileAlerts: updated });
        }
    };

    // Notification preferences
    const handlePreferenceChange = (id) => {
        const updated = { ...notificationPreferences, [id]: !notificationPreferences[id] };
        setNotificationPreferences(updated);
        onUpdate({ notificationPreferences: updated });
    };

    // Styles
    const inputStyle = {
        width: "100%",
        padding: "10px",
        border: "1px solid rgb(229, 231, 235)",
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
        transition: "0.2s",
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

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <EmaiNotification
                expandedSections={expandedSections}
                onToggleSection={onToggleSection}
                emailAlerts={emailAlerts}
                emailInput={emailInput}
                setEmailInput={setEmailInput}
                onAddEmail={onAddEmail}
                onRemoveEmail={onRemoveEmail}
                inputStyle={inputStyle}
                iconButtonStyle={iconButtonStyle}
                handleVerify={handleVerify}
                error={errorMsg.email}
            />

            <SmsNotification
                expandedSections={expandedSections}
                onToggleSection={onToggleSection}
                mobileAlerts={mobileAlerts}
                mobileInput={mobileInput}
                setMobileInput={setMobileInput}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                onAddMobile={onAddMobile}
                onRemoveMobile={onRemoveMobile}
                iconButtonStyle={iconButtonStyle}
                handleVerify={handleVerify}
                error={errorMsg.mobile}
            />

            {/* Hide Notification Preferences for Employer forms */}
            {formType !== "employer" && (
                <NotificationPrefrence
                    expandedSections={expandedSections}
                    onToggleSection={onToggleSection}
                    notificationPreferences={notificationPreferences}
                    handlePreferenceChange={handlePreferenceChange}
                />
            )}
        </Box>
    );
};

export default NotificationComp;
