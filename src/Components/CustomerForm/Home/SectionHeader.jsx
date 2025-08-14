import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Chip,
  useTheme,
  Paper,
} from "@mui/material";
import { ChevronRight, ChevronDown } from "lucide-react";

export const SectionHeader = ({
  icon: Icon,
  title,
  description,
  isExpanded,
  onToggle,
  gradient,
  children,
}) => {
  const theme = useTheme();

  return (
    <Accordion
      expanded={isExpanded}
      onChange={(_, expanded) => onToggle(expanded)}
      elevation={0}
      sx={{
        border: "2px solid",
        borderColor: theme.palette.grey[100],
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: isExpanded ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "rgba(115,103,240,0.3)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          isExpanded ? (
            <ChevronDown size={20} color="#7367f0" />
          ) : (
            <ChevronRight size={20} color="#7367f0" />
          )
        }
        sx={{
          px: 3,
          py: 2,
          "& .MuiAccordionSummary-content": {
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: gradient || "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={24} color="#fff" />
          </Paper>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                color: "#374151",
                "&:hover": { color: "#7367f0" },
                transition: "color 0.2s",
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        <Chip
          label={isExpanded ? "Expanded" : "Collapsed"}
          variant="outlined"
          size="small"
          sx={{ fontSize: "0.75rem" }}
        />
      </AccordionSummary>
      <AccordionDetails
        sx={{
          px: 3,
          pb: 3,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
