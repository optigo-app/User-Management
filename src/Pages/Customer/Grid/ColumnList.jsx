import { Trash2, BookText } from "lucide-react";
import { ToggleSwitch } from "../../../Components/Ui/ToggleSwitch";
import { IconButton } from "@mui/material";

export const getCustomerColumns = ({onToggleLogin, onToggleActive, onDeleteUser}) => {
	return [
		{
			field: "sr",
			headerName: "Sr#",
			width: 60,
			renderCell: (params) =>
				params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
		},
		{
			field: "userId",
			headerName: "User ID / Email",
			width: 200,
		},
		{
			field: "customerCode",
			headerName: "Customer Code",
			width: 150,
		},
		{
			field: "customerName",
			headerName: "Customer Name",
			width: 180,
		},
		{
			field: "company",
			headerName: "Company",
			width: 180,
		},
		{
			field: "representative",
			headerName: "Representative",
			width: 130,
		},
		{
			field: "countryCode",
			headerName: "Country Code",
			width: 100,
		},
		{
			field: "mobile",
			headerName: "Mobile No.",
			width: 120,
		},
		{
			field: "doj",
			headerName: "Date of Joining",
			width: 140,
			type: "date",
			valueGetter: (params) =>
				params.value ? new Date(params.value) : null,
		},
		{
			field: "companyType",
			headerName: "Company Type",
			width: 150,
		},
		{
			field: "city",
			headerName: "City",
			width: 120,
		},
		{
			field: "state",
			headerName: "State",
			width: 120,
		},
		{
			field: "purityRatio",
			headerName: "Purity Ratio",
			width: 130,
		},
		{
			field: "ecatAdhocPackage",
			headerName: "Ecat Adhoc Package",
			width: 180,
		},
		{
			field: "policy",
			headerName: "Policy",
			width: 80,
		},
		{
			field: "policyDueDate",
			headerName: "Policy Due Date",
			width: 120,
			type: "date",
			valueGetter: (params) =>
				params.value ? new Date(params.value) : null,
		},
		{
			field: "document",
			headerName: "Document",
			width: 80,
			renderCell: (params) => (
				<IconButton>
					<BookText
						size={18}
						color="gray"
					/>
				</IconButton>
			),
		},
		{
			field: "loginFlag",
			headerName: "Login Flag",
			width: 80,
			renderCell: (params) => (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
					<ToggleSwitch
						checked={params.value}
						onChange={() => onToggleLogin(params.row)}
						activeColor="#4caf50"
						inactiveColor="#9e9e9e"
					/>
				</div>
			),
		},
		{
			field: "active",
			headerName: "Active",
			width: 70,
			renderCell: (params) => (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
					<ToggleSwitch
						checked={params.value}
						onChange={() => onToggleActive(params.row)}
						activeColor="#2196f3"
						inactiveColor="#f44336"
					/>
				</div>
			),
		},
		{
			field: "delete",
			headerName: "Delete",
			width: 70,
			pinned: 'right',
			renderCell: (params) => (
				<IconButton onClick={() => onDeleteUser(params.row)}>
					<Trash2
						size={18}
						color="gray"
					/>
				</IconButton>
			),
		},
	];
};