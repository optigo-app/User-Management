import React from "react";
import { Card, CardContent, Typography, Box, Divider, Link } from "@mui/material";
import { HelpCircle, Mail, Phone } from "lucide-react";

export default function FormFooter() {
  return (
    <Card
      sx={{
        borderRadius: 2, // 8px
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        textAlign: "center",
      }}
    >
      <CardContent>
        {/* Title */}
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1.5}>
          <HelpCircle size={20} color="#7367f0" />
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            Need Assistance?
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" mb={3}>
          Our support team is here to help you complete your registration smoothly.
        </Typography>

        {/* Contact Links */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Link
            href="mailto:support@company.com"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#7367f0",
              "&:hover": { color: "#5a52d5" },
              fontSize: 14,
            }}
          >
            <Mail size={16} />
            support@company.com
          </Link>

          {/* Divider for desktop */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" }, bgcolor: "grey.300" }}
          />

          <Link
            href="tel:+1234567890"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#7367f0",
              "&:hover": { color: "#5a52d5" },
              fontSize: 14,
            }}
          >
            <Phone size={16} />
            +1 (234) 567-8900
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
