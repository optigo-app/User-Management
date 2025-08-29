import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Button,
    Divider,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import { BookText, FileText, X, Download } from "lucide-react";

const DocumentCell = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const documents = row?.documents || [
        { name: "GST Certificate", url: "/docs/gst.pdf", type: "PDF" },
        { name: "PAN Card", url: "/docs/pan.png", type: "Image" },
        { name: "Agreement", url: "/docs/agreement.pdf", type: "PDF" },
    ];

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleSelectDocument = (doc) => {
        setSelectedDoc(doc);
        setAnchorEl(null);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedDoc(null);
    };

    const isPDF = selectedDoc?.type?.toLowerCase() === "pdf";

    return (
        <>
            {/* Document Icon */}
            <Tooltip title="View Documents">
                <IconButton onClick={handleOpenMenu}>
                    <BookText size={18} color="gray" />
                </IconButton>
            </Tooltip>

            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 6,
                    sx: { minWidth: 220, borderRadius: 2, p: 1 },
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ px: 1.5, py: 0.5, color: "text.secondary" }}
                >
                    Available Documents
                </Typography>
                <Divider />
                {documents.map((doc, i) => (
                    <MenuItem
                        key={i}
                        onClick={() => handleSelectDocument(doc)}
                        sx={{ borderRadius: 1, "&:hover": { backgroundColor: "action.hover" } }}
                    >
                        <ListItemIcon>
                            <FileText size={18} />
                        </ListItemIcon>
                        <ListItemText
                            primary={doc.name}
                            secondary={doc.type}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                            secondaryTypographyProps={{ fontSize: 12, color: "text.secondary" }}
                        />
                    </MenuItem>
                ))}
            </Menu>

            {/* Modal */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: 3,
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
                        backgroundColor: "background.paper",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        {selectedDoc?.name}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {selectedDoc?.url && (
                            <Button
                                size="small"
                                startIcon={<Download size={16} />}
                                variant="outlined"
                                onClick={() => window.open(selectedDoc.url, "_blank")}
                            >
                                Download
                            </Button>
                        )}
                        <IconButton onClick={handleCloseModal}>
                            <X size={20} />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Content */}
                <DialogContent
                    sx={{
                        p: 2,
                        backgroundColor: "#f9f9f9",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "60vh",
                    }}
                >
                    {selectedDoc ? (
                        isPDF ? (
                            <iframe
                                src={selectedDoc.url}
                                style={{
                                    width: "100%",
                                    height: "70vh",
                                    border: "none",
                                    borderRadius: 8,
                                    backgroundColor: "#fff",
                                }}
                                title={selectedDoc.name}
                            />
                        ) : (
                            <Box
                                component="img"
                                src={selectedDoc.url}
                                alt={selectedDoc.name}
                                sx={{
                                    maxWidth: "100%",
                                    maxHeight: "70vh",
                                    borderRadius: 2,
                                    objectFit: "contain",
                                    boxShadow: 2,
                                }}
                            />
                        )
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No document selected
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DocumentCell;
