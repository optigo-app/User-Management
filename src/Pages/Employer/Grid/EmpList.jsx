import { Trash2, Pencil } from "lucide-react";
import { IconButton } from "@mui/material";
import { ToggleSwitch } from "../../../Components/Ui/ToggleSwitch";

export const getEmployeeColumns = ({ onEditUser, handleDelete, onToggleActive, onToggleRoaming, onToggleLogin, onToggleSupport }) => {
  return [
    { field: "sr", headerName: "Sr#", width: 60, renderCell: (params) => params?.api.getRowIndexRelativeToVisibleRows(params.id) + 1 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "userCode", headerName: "User Code", width: 120 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "mobileNo", headerName: "Mobile No", width: 140 },
    { field: "city", headerName: "City", width: 120 },
    { field: "pinCode", headerName: "PinCode", width: 90 },
    { field: "state", headerName: "State", width: 140 },
    { field: "referenceBy", headerName: "Reference By", width: 140 },
    { field: "referenceUserCode", headerName: "Ref User Code", width: 120 },
    { field: "location", headerName: "Location", width: 120 },

    // Toggle flags
    {
      field: "loginFlag",
      headerName: "Login",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <ToggleSwitch
            checked={params?.value}
            onChange={() => onToggleLogin(params?.row)}
            activeColor="#4caf50"
            inactiveColor="#9e9e9e"
          />
        </div>
      ),
    },
    {
      field: "active",
      headerName: "Active",
      width: 100,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <ToggleSwitch
            checked={params?.value}
            onChange={() => onToggleActive(params?.row)}
            activeColor="#2196f3"
            inactiveColor="#f44336"
          />
        </div>
      ),
    },
    {
      field: "roaming",
      headerName: "Roaming",
      width: 100,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <ToggleSwitch
            checked={params?.value}
            onChange={() => onToggleRoaming(params?.row)}
            activeColor="#2196f3"
            inactiveColor="#9e9e9e"
          />
        </div>
      ),
    },
    {
      field: "support",
      headerName: "Support",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <ToggleSwitch
            checked={params?.value}
            onChange={() => onToggleSupport(params?.row)}
            activeColor="#ff9800"
            inactiveColor="#9e9e9e"
          />
        </div>
      ),
    },

    // Edit button
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => onEditUser(params?.row)}>
          <Pencil size={18} color="gray" />
        </IconButton>
      ),
    },

    // Delete icon (optional)
    {
      field: "Delete",
      headerName: "Delete",
      width: 90,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params?.row)}>
          <Trash2 size={18} color="gray" />
        </IconButton>
      ),
    },
  ];
};
