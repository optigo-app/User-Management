import { Trash2, Pencil, CirclePlus } from "lucide-react";
import { IconButton, Tooltip } from "@mui/material";
import { formatDate } from "../../../Utils/globalFuc";
import { ToggleSwitch } from "../../../Components/Ui/ToggleSwitch";

export const getLeadColumns = ({ onEditUser, handleDelete, onToggleActive, handleMakeLeadToCustomer }) => {
    return [
        {
            field: "sr",
            headerName: "Sr#",
            width: 60,
            renderCell: (params) =>
                params?.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        {
            field: "joiningDate",
            headerName: "Joining Date",
            width: 140,
            renderCell: (params) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: 'space-between', width: '100%' }}>
                    <span>{formatDate(params.row?.joiningDate)}</span>
                    <Tooltip title={`Transform to Customer`} placement="top">
                        <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleMakeLeadToCustomer(params.row)}
                        >
                            <CirclePlus size={18} />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
        {
            field: "firstName",
            headerName: "First Name",
            width: 150,
        },
        {
            field: "lastName",
            headerName: "Last Name",
            width: 150,
        },
        {
            field: "company",
            headerName: "Company",
            width: 210,
        },
        {
            field: "userId",
            headerName: "User ID",
            width: 150,
        },
        {
            field: "mobile",
            headerName: "Mobile",
            width: 140,
            renderCell: (params) => (
                <div>
                    {params?.row?.countryCode} {params?.row?.mobile}
                </div>
            ),
        },
        {
            field: "country",
            headerName: "Country",
            width: 132,
        },
        {
            field: "city",
            headerName: "City",
            width: 132,
        },
        {
            field: "reference",
            headerName: "Reference",
            width: 180,
        },
        {
            field: "eCatalogPackage",
            headerName: "eCatalog Package",
            width: 160,
        },
        {
            field: "active",
            headerName: "Reject",
            width: 90,
            renderCell: (params) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <ToggleSwitch
                        checked={params?.row?.Reject}
                        onChange={() => onToggleActive(params?.row)}
                        activeColor="#2196f3"
                        inactiveColor="#f44336"
                    />
                </div>
            ),
        },
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
        {
            field: "delete",
            headerName: "Delete",
            width: 70,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params?.row)}>
                    <Trash2 size={18} color="gray" />
                </IconButton>
            ),
        },
    ];
};
