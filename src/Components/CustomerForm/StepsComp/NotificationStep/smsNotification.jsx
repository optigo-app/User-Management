import React, { useState } from "react";
import { Box, Chip, IconButton, Typography, Button, TextField } from "@mui/material";
import { Phone, X, CheckCircle, Plus } from "lucide-react";
import { CollapsibleSection, Input, Select } from "../../../Ui";
import toast from "react-hot-toast";
import PhoneInput from "../../../Ui/PhoneInput";

const SmsNotification = ({
  expandedSections,
  onToggleSection,
  mobileAlerts,
  mobileInput,
  setMobileInput,
  countryCode,
  setCountryCode,
  onAddMobile,
  onRemoveMobile,
  iconButtonStyle,
  handleVerify,
  error,
}) => {
  const [verifyingIndex, setVerifyingIndex] = useState(null);
  const [otpInput, setOtpInput] = useState("");

  const handleOtpSubmit = (index) => {
    if (otpInput === "123456") {
      handleVerify("sms", index); // updates isVerified in parent
      setVerifyingIndex(null);
      setOtpInput("");
    } else {
      toast.error("Invalid OTP! Try 123456");
    }
  };

  return (
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
        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          {mobileAlerts.map((mobile, index) => (
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
                label={`${mobile.countryCode} ${mobile.mobileNo}`}
                icon={<Phone size={14} />}
                onDelete={() => onRemoveMobile(index)}
                deleteIcon={<X size={14} />}
                variant="outlined"
                color={mobile.isVerified ? "success" : "default"}
              />

              {mobile.isVerified ? (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <CheckCircle size={16} color="green" />
                  <Typography variant="body2" color="green">
                    Verified
                  </Typography>
                </Box>
              ) : verifyingIndex === index ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <TextField
                    size="small"
                    placeholder="Enter OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    sx={{ width: 120 }}
                  />
                  <Button size="small" onClick={() => handleOtpSubmit(index)}>
                    Verify
                  </Button>
                  <Button size="small" onClick={() => setVerifyingIndex(null)}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button size="small" onClick={() => setVerifyingIndex(index)}>
                  Verify
                </Button>
              )}
            </Box>
          ))}
        </Box>

        <Box display="flex" gap={1}>
          {/* <Select
            style={{ width: 100 }}
            placeholder={countryCode}
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
              if (e.key === "Enter") onAddMobile(countryCode, mobileInput);
            }}
            error={error ? true : false}
            helperText={error}
          /> */}

          <PhoneInput
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            mobileInput={mobileInput}
            setMobileInput={setMobileInput}
            onAddMobile={onAddMobile}
            error={error}
          />

          <IconButton sx={iconButtonStyle} onClick={() => onAddMobile(countryCode, mobileInput)}>
            <Plus size={18} />
          </IconButton>
        </Box>
      </Box>
    </CollapsibleSection>
  );
};

export default SmsNotification;
