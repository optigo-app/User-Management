import React from "react";
import { Box, Typography, Chip, Button, Alert } from "@mui/material";
import { Clock, HelpCircle, Info, Settings } from "lucide-react";

export const FormHeader = ({
  currentStepInfo,
  currentStep,
  showHelp,
  onToggleHelp,
}) => {
  const Icon = currentStepInfo?.icon || Settings;

  return (
    <Box
      sx={{
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        background:
          "linear-gradient(270deg, rgba(115, 103, 240, 0.7) 0%, #7367f0 100%)",
        color: "white",
        p: 3,
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px 8px 0 0",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Top Row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          {/* Step Title */}
          <Box display="flex" alignItems="center" gap={2}>
            <Icon size={32} color="white" />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Step {currentStep}: {currentStepInfo?.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}
              >
                {currentStepInfo?.description}
              </Typography>
            </Box>
          </Box>

          {/* Right Side Controls */}
          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              label={
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Clock size={14} />
                  {currentStepInfo?.estimatedTime}
                </Box>
              }
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                px: 1,
              }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={onToggleHelp}
              startIcon={<HelpCircle size={16} />}
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,0.3)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              }}
            >
              Help
            </Button>
          </Box>
        </Box>

        {/* Help Alert */}
        {showHelp && (
          <Alert
            icon={<Info size={16} />}
            sx={{
              mt: 2,
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              "& .MuiAlert-icon": { color: "white" },
            }}
          >
            <Typography variant="body2">
              <strong>Step {currentStep} Guide:</strong>{" "}
              {currentStepInfo.description}. Fields marked with * are required.
              Your progress is automatically saved as you type. Use the stepper
              above to navigate between completed sections.
            </Typography>
          </Alert>
        )}
      </Box>

      {/* Decorative Circles */}
      <Box
        sx={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "160px",
          height: "160px",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "130px",
          height: "130px",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};
