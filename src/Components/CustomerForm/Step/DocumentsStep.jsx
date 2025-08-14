import React, { useState, useRef } from "react";
import {
    Box,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    Chip,
    Alert,
    AlertTitle,
    IconButton,
    useTheme,
} from "@mui/material";
import {
    Upload,
    Camera,
    Trash2,
    FileText,
} from "lucide-react";
import "./Style/DocumentsStep.scss";
import { Badge, CollapsibleSection } from "../../Ui";
import DocumentStatus from "../StepsComp/Document/DocumentStatus";


export default function DocumentsStep({ expandedSections, onToggleSection }) {
    const theme = useTheme();
    const [documentFiles, setDocumentFiles] = useState({});
    const fileInputRef = useRef(null);

    const handleFileSelect = (event, documentId) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const currentDoc = documentFiles[documentId] || { id: documentId, files: [], maxFiles: 2 };
        const maxFiles = currentDoc.maxFiles;
        const currentFileCount = currentDoc.files.length;

        if (currentFileCount >= maxFiles) {
            alert(`Maximum ${maxFiles} files allowed for this document`);
            return;
        }

        const newFiles = [];

        for (let i = 0; i < Math.min(files.length, maxFiles - currentFileCount); i++) {
            const file = files[i];
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please select valid files (JPG, PNG, GIF, or PDF)');
                continue;
            }
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('File size must be less than 10MB');
                continue;
            }

            const fileItem = {
                id: `${documentId}-${Date.now()}-${i}`,
                file,
                filePreview: null,
                uploaded: true
            };

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setDocumentFiles(prev => ({
                        ...prev,
                        [documentId]: {
                            ...prev[documentId],
                            files: prev[documentId].files.map(f =>
                                f.id === fileItem.id ? { ...f, filePreview: e.target?.result } : f
                            )
                        }
                    }));
                };
                reader.readAsDataURL(file);
            }

            newFiles.push(fileItem);
        }

        setDocumentFiles(prev => ({
            ...prev,
            [documentId]: {
                id: documentId,
                files: [...(prev[documentId]?.files || []), ...newFiles],
                maxFiles: 2
            }
        }));
    };

    const handleRemoveDocument = (documentId, fileId) => {
        setDocumentFiles(prev => ({
            ...prev,
            [documentId]: {
                ...prev[documentId],
                files: prev[documentId].files.filter(f => f.id !== fileId)
            }
        }));
    };

    const handleRemoveAllDocuments = (documentId) => {
        setDocumentFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[documentId];
            return newFiles;
        });
    };

    const documents = [
        { id: "aadhaar", label: "Aadhaar Card", icon: "🆔", required: true, description: "Government issued identity card" },
        { id: "passport", label: "Passport", icon: "📘", required: false, description: "International travel document" },
        { id: "driving", label: "Driving License", icon: "🚗", required: false, description: "Valid driving license" },
        { id: "esic", label: "ESIC Card", icon: "🏥", required: false, description: "Employee State Insurance" },
        { id: "nationality", label: "Nationality Certificate", icon: "🏛️", required: false, description: "Proof of nationality" },
        { id: "panCard", label: "PAN Card", icon: "💳", required: true, description: "Permanent Account Number" },
        { id: "voterCard", label: "Voter ID Card", icon: "🗳️", required: false, description: "Electoral identity card" },
        { id: "bankStatement", label: "Bank Statement", icon: "🏦", required: false, description: "Recent bank statement" },
    ];

    const otherDocuments = [
        { id: "customDoc1", label: "Custom Document 1", icon: "📄", required: false, description: "User-defined document" },
        { id: "customDoc2", label: "Custom Document 2", icon: "🗂️", required: false, description: "User-defined document" }
    ];


    const renderDocumentCard = (doc) => {
        const docFile = documentFiles[doc.id];
        const uploadedFiles = docFile?.files || [];
        const canUploadMore = !docFile || uploadedFiles.length < 2;

        return (
            <Grid size={{ sm: 12, md: 6 }}>
                <Card key={doc.id} className="doc-card">
                    <CardHeader
                        title={
                            <Box display="flex" alignItems="center" gap={1}>
                                <span style={{ fontSize: "16px" }}>{doc.icon}</span>
                                <Typography variant="body1" fontWeight="500" color="primary.title">{doc.label}</Typography>
                                {doc.required && <Badge variant="destructive" color={theme.palette.primary.contrastText} backgroundColor={theme.palette.primary.error}>
                                    Required
                                </Badge>}
                            </Box>
                        }
                        subheader={<Typography variant="caption" color="primary.subtitle">{doc.description}</Typography>}
                    />
                    <CardContent>
                        {uploadedFiles.length > 0 && (
                            <Box mb={2}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" fontWeight="500">
                                        Uploaded Files ({uploadedFiles.length}/2)
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        startIcon={<Trash2 size={16} />}
                                        onClick={() => handleRemoveAllDocuments(doc.id)}
                                    >
                                        Remove All
                                    </Button>
                                </Box>
                                <Grid container spacing={2} mt={1}>
                                    {uploadedFiles?.map((fileItem) => (
                                        <Grid size={{ xs: 6, sm: 6 }} key={fileItem.id}>
                                            <Box className="file-preview">
                                                {fileItem.filePreview ? (
                                                    <Box className="image-preview">
                                                        <img src={fileItem.filePreview} alt={doc.label} />
                                                        <Chip label="✓" size="small" color="success" className="check-badge" />
                                                    </Box>
                                                ) : (
                                                    <Box className="pdf-preview">
                                                        <FileText size={20} />
                                                        <Typography variant="caption">PDF</Typography>
                                                        <Typography variant="caption" noWrap>{fileItem.file.name}</Typography>
                                                    </Box>
                                                )}
                                                <Box display="flex" justifyContent="space-between" mt={1}>
                                                    <Typography variant="caption">
                                                        {(fileItem.file.size / 1024 / 1024).toFixed(1)} MB
                                                    </Typography>
                                                    <IconButton size="small" color="error" onClick={() => handleRemoveDocument(doc.id, fileItem.id)}>
                                                        <Trash2 size={14} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {canUploadMore && (
                            <Grid container spacing={1} mb={1}>
                                <Grid size={{ xs: 12, md: 6 }} sm="auto">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<Upload size={16} />}
                                        onClick={() => {
                                            if (fileInputRef.current) {
                                                fileInputRef.current.dataset.documentId = doc.id;
                                                fileInputRef.current.click();
                                            }
                                        }}
                                        fullWidth
                                    >
                                        {uploadedFiles.length > 0 ? "Add More Files" : "Upload Files"}
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }} sm="auto">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<Camera size={16} />}
                                        onClick={() => {
                                            if (fileInputRef.current) {
                                                fileInputRef.current.dataset.documentId = doc.id;
                                                fileInputRef.current.click();
                                            }
                                        }}
                                        fullWidth
                                    >
                                        Take Photo
                                    </Button>
                                </Grid>
                            </Grid>
                        )}

                        <DocumentStatus uploadedFiles={uploadedFiles} doc={doc} />
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <Box className="documents-step">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => {
                    const activeDocId = e.target.dataset.documentId;
                    if (activeDocId) {
                        handleFileSelect(e, activeDocId);
                    }
                }}
                style={{ display: "none" }}
            />

            <CollapsibleSection
                isOpen={expandedSections.requiredDocuments}
                onToggle={() => onToggleSection("requiredDocuments")}
                icon={Upload}
                gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                title="Required Documents"
                subtitle="Mandatory identity and business documents"
                fieldCount="2 documents"
            >
                <Grid container spacing={2}>
                    {documents.filter(doc => doc.required).map(renderDocumentCard)}
                </Grid>
            </CollapsibleSection>

            <CollapsibleSection
                isOpen={expandedSections.optionalDocuments}
                onToggle={() => onToggleSection("optionalDocuments")}
                icon={Upload}
                gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                title="Optional Documents"
                subtitle="Additional supporting documents"
                fieldCount="6 documents"
            >
                <Grid container spacing={2}>
                    {documents.filter(doc => !doc.required).map(renderDocumentCard)}
                </Grid>
            </CollapsibleSection>
            <CollapsibleSection
                isOpen={expandedSections.additionalDocuments}
                onToggle={() => onToggleSection("additionalDocuments")}
                icon={Upload}
                gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                title="Other Documents"
                subtitle="Any other documents you may wish to provide"
                fieldCount={`${otherDocuments.length} documents`}
            >
                <Grid container spacing={2}>
                    {otherDocuments.map(renderDocumentCard)}
                </Grid>
            </CollapsibleSection>
        </Box>
    );
}
