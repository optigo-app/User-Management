import React, { memo } from "react";
import {
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import { X } from "lucide-react";
import PricePolicyTable from "./PricePolicyTable";

const PricePolicyDialog = ({ open, onClose, selectedPolicy }) => {
    // Map policy names to table types
    const getPolicyType = (policyName) => {
        switch (policyName) {
            case "Diamond":
                return "diamond";
            case "ColorStone / Misc / Services Price":
                return "colorstone";
            case "Labour Policy":
                return "labour";
            case "Setting / Secondary Metal Price":
                return "setting";
            default:
                return "diamond";
        }
    };

    const handleEdit = (row) => {
        console.log("Edit row:", row);
        // Implement edit functionality
    };

    const handleDelete = (row) => {
        console.log("Delete row:", row);
        // Implement delete functionality
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xl"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                    height: "90vh",
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: selectedPolicy?.color || "background.paper",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                }}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" fontWeight={600}>
                        {selectedPolicy?.name}
                    </Typography>
                </Box>
                <IconButton onClick={onClose}>
                    <X size={20} />
                </IconButton>
            </Box>

            {/* Content */}
            <DialogContent
                sx={{
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    height: "calc(100% - 80px)",
                    overflow: "hidden",
                }}
            >
                {selectedPolicy ? (
                    <PricePolicyTable
                        policyType={getPolicyType(selectedPolicy.name)}
                        data={selectedPolicy.tableData || []}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No policy selected
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default memo(PricePolicyDialog);
