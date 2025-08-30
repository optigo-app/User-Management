import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import CenteredCircularLoader from "./Common/Loder/CustomLoder";
import CustomerForm from "./Pages/Customer/Form/CustomerForm";
import { Toaster } from "react-hot-toast";
import PhoneInputDemo from "./Pages/Test/PhoneInputDemo";
import NotFound from "./Common/NotFound";

// Lazy load only CustomerGrid
const CustomerGrid = lazy(() => import("./Pages/Customer/Grid/CustomerGrid"));
const HomePage = lazy(() => import("./Pages/Home/HomePage"));

export default function App() {
  return (
    <Box sx={{ position: "relative" }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            padding: "5px 10px",
            color: "#fff",
            fontWeight: 500,
          },
          success: {
            style: {
              background: "#22c55e",
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.6)",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.6)",
            },
          },
          loading: {
            style: {
              background: "#3b82f6",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.6)",
            },
          },
          blank: {
            style: {
              background: "#eab308",
              boxShadow: "0 4px 12px rgba(234, 179, 8, 0.6)",
              color: "#000",
            },
          },
        }}
      />
      <Routes>
        <Route path="/customer-register" element={<CustomerForm />} />
        <Route path="/test" element={<PhoneInputDemo />} />

        {/* Lazy-loaded route */}
        <Route
          path="/customers"
          element={
            <Suspense fallback={<CenteredCircularLoader />}>
              <CustomerGrid />
            </Suspense>
          }
        />
        <Route
          path="/employer"
          element={
            <Suspense fallback={<CenteredCircularLoader />}>
              <CustomerGrid />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<CenteredCircularLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
