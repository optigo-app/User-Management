"use client";

import React, { useState, useEffect } from "react";
import {
    Backdrop,
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Avatar,
    IconButton,
} from "@mui/material";
import {
    UploadCloud,
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    FileArchive,
    FileCode,
    FileSpreadsheet,
    FileType,
    FileJson,
    X,
} from "lucide-react";

// Function: pick icon based on file type
const getFileIcon = (file) => {
    const type = file.type;
    const name = file.name.toLowerCase();

    if (type.startsWith("image/")) return <FileImage size={28} color="#1976d2" />;
    if (type.startsWith("video/")) return <FileVideo size={28} color="#d81b60" />;
    if (type.startsWith("audio/")) return <FileAudio size={28} color="#8e24aa" />;
    if (type.includes("zip") || name.endsWith(".rar") || name.endsWith(".7z"))
        return <FileArchive size={28} color="#f57c00" />;
    if (type.includes("pdf") || name.endsWith(".pdf"))
        return <FileText size={28} color="#e53935" />;
    if (type.includes("json")) return <FileJson size={28} color="#00897b" />;
    if (type.includes("csv") || type.includes("excel"))
        return <FileSpreadsheet size={28} color="#43a047" />;
    if (
        name.endsWith(".js") ||
        name.endsWith(".ts") ||
        name.endsWith(".jsx") ||
        name.endsWith(".tsx") ||
        name.endsWith(".py") ||
        name.endsWith(".java") ||
        name.endsWith(".cpp")
    )
        return <FileCode size={28} color="#1565c0" />;

    return <FileType size={28} color="#546e7a" />;
};

export default function FullPageDropMUI() {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const handleDragOver = (e) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleDrop = (e) => {
            e.preventDefault();
            setIsDragging(false);

            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles((prev) => [...prev, ...droppedFiles]);
        };

        const handleDragLeave = (e) => {
            if (e.clientX === 0 && e.clientY === 0) {
                setIsDragging(false);
            }
        };

        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);
        window.addEventListener("dragleave", handleDragLeave);

        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
            window.removeEventListener("dragleave", handleDragLeave);
        };
    }, []);

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "background.default" }}>
            {/* Page Header */}
            <Typography variant="h4" fontWeight={700} gutterBottom>
                File Drop Zone
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Drag & drop any file type anywhere on this page.
            </Typography>

            {/* File Cards */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
                {files.map((file, index) => {
                    const isImage = file.type.startsWith("image/");
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card
                                variant="outlined"
                                sx={{
                                    borderRadius: 3,
                                    position: "relative",
                                    transition: "0.3s",
                                    "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
                                }}
                            >
                                {/* Remove Button */}
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 6,
                                        right: 6,
                                        bgcolor: "grey.100",
                                        "&:hover": { bgcolor: "error.main", color: "white" },
                                    }}
                                    onClick={() => removeFile(index)}
                                >
                                    <X size={16} />
                                </IconButton>

                                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    {isImage ? (
                                        <Avatar
                                            src={URL.createObjectURL(file)}
                                            variant="rounded"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    ) : (
                                        <Avatar
                                            sx={{
                                                bgcolor: "grey.100",
                                                width: 56,
                                                height: 56,
                                            }}
                                            variant="rounded"
                                        >
                                            {getFileIcon(file)}
                                        </Avatar>
                                    )}
                                    <Box sx={{ overflow: "hidden" }}>
                                        <Typography variant="subtitle1" noWrap>
                                            {file.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Drop Overlay */}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: "blur(8px)",
                    bgcolor: "rgba(0,0,0,0.4)",
                }}
                open={isDragging}
            >
                <Paper
                    elevation={10}
                    sx={{
                        p: 8,
                        border: "3px dashed",
                        borderColor: "primary.main",
                        textAlign: "center",
                        bgcolor: "rgba(255,255,255,0.92)",
                        borderRadius: 5,
                        maxWidth: 420,
                    }}
                >
                    <UploadCloud size={70} strokeWidth={1.4} color="#1976d2" />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                        Drop files here
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Supports all file types
                    </Typography>
                </Paper>
            </Backdrop>
        </Box>
    );
}
