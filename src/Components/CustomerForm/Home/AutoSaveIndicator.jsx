import React from "react";
import { CheckCircle2, Heart } from "lucide-react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const AutoSaveIndicator = ({ isAutoSaving, lastSaved }) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={1.5}>
      {isAutoSaving ? (
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.5,
            borderRadius: "999px",
            boxShadow: theme.shadows[1],
            bgcolor: "background.paper",
          }}
        >
          <CircularProgress
            aria-label="Auto-saving your progress"
            size={16}
            thickness={5}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Auto-saving your progress...
          </Typography>
        </Paper>
      ) : lastSaved ? (
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.5,
            borderRadius: "999px",
            border: `1px solid ${theme.palette.success[200] || "#A5D6A7"}`,
            bgcolor: theme.palette.success[50] || "#E8F5E9",
          }}
        >
          <CheckCircle2 size={16} color={theme.palette.success.main} />
          <Typography
            variant="body2"
            sx={{ color: theme.palette.success.main }}
          >
            Saved at {lastSaved.toLocaleTimeString()}
          </Typography>
        </Paper>
      ) : (
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.5,
            borderRadius: "999px",
            boxShadow: theme.shadows[1],
            bgcolor: "background.paper",
          }}
        >
          <Heart size={16} color={theme.palette.error.light} />
          <Typography variant="body2" color="text.secondary">
            Your progress is automatically saved
          </Typography>
        </Paper>
      )}
    </Box>
  );
};
