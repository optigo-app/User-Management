import { Trash2, Pencil, CirclePlus } from "lucide-react";
import { Box, IconButton } from "@mui/material";
import { ToggleSwitch } from "../../../Components/Ui/ToggleSwitch";
import DocumentCell from "../../../Common/DocumentPopover";

export const getSupplierColumns = ({
    onEditSupplier,
    handleDelete,
    onToggleActive,
    onToggleRoaming,
    onToggleMelt,
    onToggleLogin,
    onPolicyRatio
}) => {
    return [
        {
            field: "sr",
            headerName: "Sr#",
            width: 60,
            renderCell: (params) =>
                params?.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        { field: "userId", headerName: "User ID", width: 250 },
        { field: "code", headerName: "Code", width: 150 },
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "middleName", headerName: "Middle Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "firmName", headerName: "Firm Name", width: 170 },
        {
            field: "purityRatio",
            headerName: "Purity Ratio",
            width: 103,
            renderCell: (params) => (
                <IconButton onClick={() => onPolicyRatio(params?.row)}>
                    <CirclePlus
                        size={18}
                        color="gray"
                    />
                </IconButton>
            ),
        },
        {
            field: "document",
            headerName: "Document",
            width: 100,
            renderCell: (params) => <DocumentCell row={params.row} />,
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
            field: "melt",
            headerName: "Melt",
            width: 80,
            renderCell: (params) => (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <ToggleSwitch
                        checked={params?.value}
                        onChange={() => onToggleMelt(params?.row)}
                        activeColor="#ff5722"
                        inactiveColor="#9e9e9e"
                    />
                </div>
            ),
        },
        {
            field: "login",
            headerName: "Login",
            width: 100,
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

        // Edit
        {
            field: "edit",
            headerName: "Edit",
            width: 80,
            renderCell: (params) => (
                <IconButton onClick={() => onEditSupplier(params?.row)}>
                    <Pencil size={18} color="gray" />
                </IconButton>
            ),
        },
        // Delete
        {
            field: "delete",
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
