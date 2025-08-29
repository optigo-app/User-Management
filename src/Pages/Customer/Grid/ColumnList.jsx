import { Trash2, BookText, Pencil, CirclePlus, Settings } from "lucide-react";
import { ToggleSwitch } from "../../../Components/Ui/ToggleSwitch";
import { Button, IconButton, Typography } from "@mui/material";
import { formatDate } from "../../../Utils/globalFuc";
import FieldPopover from "../../../Common/FieldPopover";
import DocumentCell from "../../../Common/DocumentPopover";

export const getCustomerColumns = ({ onToggleLogin, onToggleActive, handleDelete, onEditUser, onPolicyRatio, onSynchronize, onPolicyApply, handleViewDocument }) => {
	return [
		{
			field: "sr",
			headerName: "Sr#",
			width: 60,
			renderCell: (params) =>
				params?.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
		},
		{
			field: "userId",
			headerName: "User ID / Email",
			width: 200,
		},
		{
			field: "customerCode",
			headerName: "Customer Code",
			width: 120,
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
			renderCell: (params) => (
				<FieldPopover
					label="Company"
					value={params.row.company}
					details={{
						"Company Type": params.row.companyType,
						"Enterprise Type": params.row.enterpriseType,
						"Address": params.row.address,
						"GST": params.row.gstNumber,
						"Tax Type": params.row.taxType,
						"Tax Scheme": params.row.taxScheme,
					}}
					onEdit={() => onEditUser(params?.row)}
				/>
			),
		},
		{
			field: "companyType",
			headerName: "Company Type",
			width: 130,
		},
		{
			field: "representative",
			headerName: "Representative",
			width: 130,
		},
		{
			field: "mobile",
			headerName: "Mobile No.",
			width: 120,
			renderCell: (params) => {
				return (
					<div>
						{params?.row?.countryCode} {params?.row?.mobile}
					</div>
				)
			}
		},
		{
			field: "joiningDate",
			headerName: "Date of Joining",
			width: 120,
			renderCell: (params) => formatDate(params.row?.joiningDate),
		},
		{
			field: "country",
			headerName: "Country",
			width: 100,
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
			width: 80,
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
			field: "ecatAdhocPackage",
			headerName: "Ecat Adhoc Package",
			width: 180,
		},
		{
			field: "policy",
			headerName: "Policy",
			width: 80,
			renderCell: (params) => (
				<Button
					variant="text"
					color="primary"
					size="small"
					onClick={() => onPolicyApply(params?.row)}
				>
					Apply
				</Button>
			),
		},
		{
			field: "policyDueDate",
			headerName: "Policy Due Date",
			width: 120,
			renderCell: (params) => formatDate(params.row?.policyDueDate),
		},
		{
			field: "document",
			headerName: "Document",
			width: 80,
			renderCell: (params) => <DocumentCell row={params.row} />,
		},
		{
			field: "sync",
			headerName: "Sync",
			width: 58,
			renderCell: (params) => (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
					<IconButton onClick={() => onSynchronize(params?.row)}>
						<Settings
							size={18}
							color="gray"
						/>
					</IconButton>
				</div>
			),
		},
		{
			field: "loginFlag",
			headerName: "Login Flag",
			width: 80,
			renderCell: (params) => (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
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
			width: 70,
			renderCell: (params) => (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
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
			field: "edit",
			headerName: "Edit",
			width: 70,
			pinned: 'right',
			renderCell: (params) => (
				<IconButton onClick={() => onEditUser(params?.row)}>
					<Pencil
						size={18}
						color="gray"
					/>
				</IconButton>
			),
		},
		{
			field: "delete",
			headerName: "Delete",
			width: 70,
			pinned: 'right',
			renderCell: (params) => (
				<IconButton onClick={() => handleDelete(params?.row)}>
					<Trash2
						size={18}
						color="gray"
					/>
				</IconButton>
			),
		},
	];
};