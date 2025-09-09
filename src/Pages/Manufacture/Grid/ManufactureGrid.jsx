import React, { useMemo, memo } from "react";
import initialManufactureData from "../../../Data/manufacture.json";
import { getManufacturerColumns } from "./Manufacturelist";
import BusinessGrid from "../../../Components/Common/BusinessGrid/BusinessGrid";

// menu items for manufacturers
const manufactureMenuItems = [
  { label: "Update Purity Ratio", icon: "Percent", color: "#4caf50" },
  { label: "Update Brand", icon: "Tag", color: "#2196f3" },
  { label: "Update Status", icon: "Info", color: "#f44336" },
  { label: "Update Permissions", icon: "Shield", color: "#ff9800" },
];

// Main filters for manufacturers (displayed in action bar)
const manufactureMainFilterConfig = [
  { key: "active", label: "Status", type: "select", options: ["Active", "Inactive"] },
  { key: "roaming", label: "Roaming", type: "select", options: ["Enabled", "Disabled"] },
  { key: "notification", label: "Notifications", type: "select", options: [{ id: 1, labelname: "Notification 1" }, { id: 2, labelname: "Notification 2" }] },
];

// Advanced filters for manufacturers (displayed in advanced filter dialog)
const manufactureAdvancedFilterConfig = [
  { key: "melt", label: "Melt", type: "select", options: ["Enabled", "Disabled"] },
  { key: "login", label: "Login", type: "select", options: ["Enabled", "Disabled"] },
  { key: "purityRatio", label: "Purity Ratio", type: "text" },
  { key: "brand", label: "Brand", type: "text" },
  { key: "createdDate", label: "Created Date", type: "text" },
];

function ManufactureGrid() {
  const manufactureData = useMemo(() => initialManufactureData, []);

  return (
    <BusinessGrid
      businessType="manufacturer"
      initialData={manufactureData}
      getColumnsFunction={getManufacturerColumns}
      menuItems={manufactureMenuItems}
      mainFilterConfig={manufactureMainFilterConfig}
      advancedFilterConfig={manufactureAdvancedFilterConfig}
      registerRoute="/manufacturer-register"
      confirmationMessages={{
        synchronize: "Are you sure you want to Synchronize All manufacturers?"
      }}
    />
  );
}

export default memo(ManufactureGrid);
