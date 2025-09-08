import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { User as UserIcon } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { AutoSaveIndicator } from "./AutoSaveIndicator";
import { useLocation } from "react-router-dom";

export const FormHeaderSection = ({ isAutoSaving, lastSaved }) => {
  const theme = useTheme();
  const location = useLocation();
  const pathMap = {
    "/customer-register": { title: "Customer", steps: 8 },
    "/employer-register": { title: "Employee", steps: 8 },
    "/manufacturer-register": { title: "Manufacture", steps: 6 },
  };

  const { title, steps } = pathMap[location?.pathname] || { title: "Customer", steps: 8 };

  return (
    <Box textAlign="center" sx={{ gap: 6 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        {/* Icon Container */}
        <Paper
          elevation={4}
          sx={{
            p: 2,
            borderRadius: "16px",
            background: theme.custom.primaryGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserIcon size={40} color="#fff" />
        </Paper>

        {/* Title & Subtitle */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            {title} Registration
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              color: "text.secondary",
              fontSize: "1.125rem",
            }}
          >
            Create a comprehensive {title} profile in {steps} easy steps
          </Typography>
        </Box>
      </Stack>

      {/* Auto Save Indicator */}
      <Box mt={3}>
        <AutoSaveIndicator isAutoSaving={isAutoSaving} lastSaved={lastSaved} />
      </Box>
    </Box>
  );
};
