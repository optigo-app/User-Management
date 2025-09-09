import React, { useMemo, memo } from "react";
import initialSupplierData from "../../../Data/supplier.json";
import { getSupplierColumns } from "./Supplierlist";
import BusinessGrid from "../../../Components/Common/BusinessGrid/BusinessGrid";

// menu items for suppliers
const supplierMenuItems = [
  { label: "Update Purity Ratio", icon: "Percent", color: "#4caf50" },
  { label: "Update Status", icon: "Info", color: "#f44336" },
  { label: "Update Permissions", icon: "Shield", color: "#ff9800" },
];

// Main filters for suppliers (displayed in action bar)
const supplierMainFilterConfig = [
  { key: "active", label: "Status", type: "select", options: ["Active", "Inactive"] },
  { key: "roaming", label: "Roaming", type: "select", options: ["Enabled", "Disabled"] },
  { key: "notification", label: "Notifications", type: "select", options: [{ id: 1, labelname: "Notification 1" }, { id: 2, labelname: "Notification 2" }] },
];

// Advanced filters for suppliers (displayed in advanced filter dialog)
const supplierAdvancedFilterConfig = [
  { key: "melt", label: "Melt", type: "select", options: ["Enabled", "Disabled"] },
  { key: "login", label: "Login", type: "select", options: ["Enabled", "Disabled"] },
];

function SupplierGrid() {
  const supplierData = useMemo(() => initialSupplierData, []);

  return (
    <BusinessGrid
      businessType="supplier"
      initialData={supplierData}
      getColumnsFunction={getSupplierColumns}
      menuItems={supplierMenuItems}
      mainFilterConfig={supplierMainFilterConfig}
      advancedFilterConfig={supplierAdvancedFilterConfig}
      registerRoute="/supplier-register"
    />
  );
}

export default memo(SupplierGrid);
