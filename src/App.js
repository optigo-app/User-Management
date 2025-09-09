import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import CenteredCircularLoader from "./Common/Loder/CustomLoder";
import CustomerForm from "./Pages/Customer/Form/CustomerForm";
import { Toaster } from "react-hot-toast";
import NotFound from "./Common/NotFound";
import TestIcardPrint from "./Pages/Test/TestIcardPrint";

// Lazy load components
const CustomerGrid = lazy(() => import("./Pages/Customer/Grid/CustomerGrid"));
const ManufactureGrid = lazy(() => import("./Pages/Manufacture/Grid/ManufactureGrid"));
const SupplierGrid = lazy(() => import("./Pages/Supplier/Grid/SupplierGrid"));
const HomePage = lazy(() => import("./Pages/Home/HomePage"));
const EmployerForm = lazy(() => import("./Pages/Employer/Form/EmployerForm"));
const ManufacturerForm = lazy(() => import("./Pages/Manufacturer/Form/ManufacturerForm"));
const SupplierForm = lazy(() => import("./Pages/Supplier/Form/SupplierForm"));

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
            fontSize: "14px",
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
        <Route path="/employer-register" element={<EmployerForm />} />
        <Route path="/manufacturer-register" element={<ManufacturerForm />} />
        <Route path="/supplier-register" element={<SupplierForm />} />
        <Route path="/test-icard-print" element={<TestIcardPrint />} />

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
          path="/manufacturer"
          element={
            <Suspense fallback={<CenteredCircularLoader />}>
              <ManufactureGrid />
            </Suspense>
          }
        />
        <Route
          path="/suppliers"
          element={
            <Suspense fallback={<CenteredCircularLoader />}>
              <SupplierGrid />
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
