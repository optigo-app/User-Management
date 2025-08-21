import React, { memo, useState } from "react";
import { Popover, Card, CardContent, Typography, Box, Divider, IconButton } from "@mui/material";
import { Pencil } from "lucide-react";

const FieldPopover = ({ label, value, details, onEdit }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const handleEdit = () => {
        handleClose();
        if (onEdit) onEdit();
        else alert(`Edit ${label}`);
    };

    return (
        <>
            <Box
                onClick={handleClick}
                sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    fontWeight: 600,
                    display: "inline-block",
                    transition: "all 0.2s",
                    "&:hover": {
                        color: "primary.dark",
                        textDecoration: "underline",
                        transform: "scale(1.02)",
                    },
                }}
            >
                {value}
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: 4,
                        overflow: "visible",
                    },
                }}
            >
                <Card sx={{ minWidth: 320, border: "1px solid #e0e0e0", position: "relative" }}>
                    {/* Edit Button */}

                    <CardContent sx={{ pb: '2px !important' }}>
                        <IconButton
                            onClick={handleEdit}
                            size="small"
                            sx={{ position: "absolute", top: 8, right: 8 }}
                        >
                            <Pencil width={22} />
                        </IconButton>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: "primary.main", fontSize: 13 }}>

                            {label}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box>
                            {Object.entries(details).map(([key, val]) => (
                                <Box
                                    key={key}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 13 }}>
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary" textTransform="capitalize" sx={{ fontSize: 13 }}>

                                        {val}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Popover>
        </>
    );
};

export default memo(FieldPopover);
