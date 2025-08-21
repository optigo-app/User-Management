import React, { memo, useState } from "react";
import { CollapsibleSection, Input, Select } from "../../../Ui";
import {
  Box,
  Chip,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Phone, Plus, X, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const SmsNotification = ({
  onToggleSection,
  expandedSections,
  iconButtonStyle,
  mobileHover,
  setMobileHover,
  mobileAlerts,
  onAddMobile,
  onRemoveMobile,
  countryCode,
  mobileInput,
  setCountryCode,
  setMobileInput,
}) => {
  const [verifyingIndex, setVerifyingIndex] = useState(null); 
  const [otpInput, setOtpInput] = useState("");
  const [verifiedNumbers, setVerifiedNumbers] = useState([]); 

  const handleVerifyClick = (index) => {
    setVerifyingIndex(index);
    setOtpInput("");
  };

  const handleOtpSubmit = (index) => {
    if (otpInput === "123456") {
      setVerifiedNumbers((prev) => [...prev, index]);
      setVerifyingIndex(null);
    } else {
      toast.error("Invalid OTP! Try 123456");
    }
  };

  return (
    <div>
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
          {/* List of added numbers */}
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
                {/* Number chip */}
                <Chip
                  label={`${mobile.countryCode} ${mobile.mobileNo}`}
                  icon={<Phone size={14} />}
                  onDelete={() => onRemoveMobile(index)}
                  deleteIcon={<X size={14} />}
                  variant="outlined"
                  color={
                    verifiedNumbers.includes(index) ? "success" : "default"
                  }
                />

                {/* Verification Section */}
                {verifiedNumbers.includes(index) ? (
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
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOtpSubmit(index)}
                    >
                      Verify
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => setVerifyingIndex(null)}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleVerifyClick(index)}
                  >
                    Verify
                  </Button>
                )}
              </Box>
            ))}
          </Box>

          {/* Add new number section */}
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
              sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                px: 1,
                flex: 1,
              }}
              value={mobileInput}
              onChange={(e) => setMobileInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && mobileInput.trim()) {
                  onAddMobile(countryCode, mobileInput.trim());
                }
              }}
            />

            <IconButton
              sx={
                mobileHover
                  ? { ...iconButtonStyle, backgroundColor: "#f3f4f6" }
                  : iconButtonStyle
              }
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
    </div>
  );
};

export default memo(SmsNotification);
