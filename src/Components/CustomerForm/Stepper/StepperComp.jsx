import React from "react";
import { Box, ButtonBase, Typography, LinearProgress, useTheme } from "@mui/material";
import { CheckCircle2, Check } from "lucide-react";

export default function Steppers({ steps, currentStep, completedSteps, onStepClick }) {
  const theme = useTheme();
  const progress = (currentStep / steps.length) * 100;

  return (
    <Box>
      {/* Desktop Stepper */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isPast = currentStep > step.id;

          return (
            <Box key={step.id} sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              {/* Step Circle */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <ButtonBase
                  aria-label={step.title}
                  onClick={() => onStepClick(step.id)}
                  sx={{
                    position: "relative",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    borderWidth: 4,
                    borderStyle: "solid",
                    borderColor: isActive
                      ? "#fff"
                      : isPast || isCompleted
                        ? "rgba(255,178,36,0.55)"
                        : theme.palette.grey[300],
                    background: isActive
                      ? theme.custom.primaryGradient
                      : isPast || isCompleted
                        ? "rgba(255,178,36,0.55)"
                        : "#fff",
                    boxShadow: isActive ? theme.shadows[6] : theme.shadows[1],
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={32} color="#fff" />
                  ) : (
                    <Icon size={32} color={isActive ? "#fff" : theme.palette.grey[700]} />
                  )}
                  {isActive && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        animation: "pulse 1.5s infinite",
                        background:
                          "linear-gradient(270deg, rgba(115, 103, 240, 0.3) 0%, rgba(115, 103, 240, 0.1) 100%)",
                      }}
                    />
                  )}
                </ButtonBase>
                {/* Step Info */}
                <Typography
                  variant="body2"
                  fontWeight="600"
                  sx={{ mt: 1, color: isActive ? theme.palette.primary.main : theme.palette.grey[800] }}
                >
                  {step.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.estimatedTime}
                </Typography>
              </Box>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <Box sx={{ flex: 1, height: 4, mx: 2, position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: theme.palette.grey[300],
                      borderRadius: "4px",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "4px",
                      transition: "width 0.5s ease",
                      width: isPast || isCompleted ? "100%" : "0%",
                      background: theme.custom.primaryGradient,
                    }}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Mobile Stepper */}
      <Box sx={{ display: { xs: "block", lg: "none" }, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Step {currentStep} of {steps.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {steps[currentStep - 1]?.estimatedTime}
          </Typography>
        </Box>

        {/* Mobile Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: "8px",
            backgroundColor: theme.palette.grey[300],
            "& .MuiLinearProgress-bar": {
              background: theme.custom.primaryGradient,
            },
          }}
        />

        {/* Mobile Step Navigation */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 1 }}>
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);

            return (
              <ButtonBase
                key={step.id}
                onClick={() => onStepClick(step.id)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: isActive
                    ? theme.palette.primary.main
                    : isCompleted
                      ? theme.palette.success.main
                      : theme.palette.grey[400],
                  bgcolor: isActive
                    ? theme.custom.primaryGradient
                    : isCompleted
                      ? theme.palette.success.main
                      : "#fff",
                  color: isActive ? "#fff" : theme.palette.grey[700],
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {isCompleted ? <Check size={16} color="#fff" /> : step.id}
              </ButtonBase>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
