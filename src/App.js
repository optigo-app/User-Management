import { Box, Paper } from "@mui/material";
import CustomerForm from "./Pages/Customer/Form/CustomerForm";
import CustomerGrid from "./Pages/Customer/Grid/CustomerGrid";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Box sx={{ position: "relative" }}>

      {/* Prototype Badge */}
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

      <Routes>
        <Route path="/customer-register" element={<CustomerForm />} />
        <Route path="/" element={<CustomerGrid />} />
      </Routes>
    </Box>
  );
}
