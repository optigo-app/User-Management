import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f9fafb",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "120px", fontWeight: "bold", color: "#ef4444" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: "#374151" }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "#3b82f6",
          "&:hover": { bgcolor: "#2563eb" },
          borderRadius: "8px",
          px: 3,
        }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
