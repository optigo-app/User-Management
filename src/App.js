import { Box, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import CenteredCircularLoader from "./Common/Loder/CustomLoder";

const CustomerForm = lazy(() => import("./Pages/Customer/Form/CustomerForm"));
const CustomerGrid = lazy(() => import("./Pages/Customer/Grid/CustomerGrid"));

export default function App() {
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 50 }}>
        <Paper
          sx={{
            background: "linear-gradient(to right, #fb923c, #ef4444)",
            color: "#fff",
            fontWeight: 500,
            px: 2,
            py: 0.5,
            borderBottomLeftRadius: "8px",
            boxShadow: 3,
          }}
        >
          In Development
        </Paper>
      </Box>

      <Suspense fallback={<CenteredCircularLoader />}>
        <Routes>
          <Route path="/customer-register" element={<CustomerForm />} />
          <Route path="/" element={<CustomerGrid />} />
        </Routes>
      </Suspense>
    </Box>
  );
}
