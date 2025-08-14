import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./SummaryCard.scss";

const SummaryCard = ({ value, label, icon, color }) => {
  return (
    <Card className={`summary-card ${color}`}>
      <CardContent>
        <Box className="summary-content">
          <Box className="summary-text">
            <Typography variant="h5" className="summary-value">
              {value}
            </Typography>
            <Typography variant="body2" className="summary-label">
              {label}
            </Typography>
          </Box>
          <Box className="summary-icon-wrapper">
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
