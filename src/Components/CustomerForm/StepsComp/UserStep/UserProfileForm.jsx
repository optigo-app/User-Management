import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, FormHelperText } from "@mui/material";
import {
    User,
    MapPin,
    Phone,
    Calendar,
    BookOpen,
    Camera,
    Upload,
    Trash2,
} from "lucide-react";
import {
    FormField,
    Input,
    InputWithIcon,
    Select,
    Textarea,
    SectionDivider,
} from "../../../Ui";

const UserProfileForm = ({ formData, errors = {}, onUpdate }) => {
    const [profileData, setProfileData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        city: "",
        area: "",
        zipCode: "",
        state: "",
        country: "",
        fullAddress: "",
        countryCode: "",
        mobileNumber: "",
        telephone: "",
        dateOfBirth: "",
        maritalStatus: "",
        religion: "",
        festivalPreference: "",
        profession: "",
    });

    const [photoError, setPhotoError] = useState("");
    const [photoPreview, setPhotoPreview] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const fileInputRef = useRef(null);

    // Load initial form data
    useEffect(() => {
        if (formData) {
            setProfileData((prev) => ({ ...prev, ...formData }));
        }
    }, [formData]);

    const handleLocalUpdate = (field, value) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const handleReduxUpdate = (field) => {
        onUpdate?.({ [field]: profileData[field] });
    };

    const handleSelectChange = (field, value) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
        onUpdate?.({ [field]: value });
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            setPhotoError("Only JPG, PNG, or GIF files are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setPhotoError("File size must be less than 5MB.");
            return;
        }

        setPhotoError("");
        setProfilePhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
        onUpdate?.({ profilePhoto: file });
    };

    const handleTakePhoto = () => {
        fileInputRef.current?.click();
    };

    const handleRemovePhoto = () => {
        setProfilePhoto(null);
        setPhotoPreview(null);
        onUpdate?.({ profilePhoto: null });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <SectionDivider icon={User} title="Full Name" />
                <Grid container rowSpacing={0} columnSpacing={2}>
                    {[
                        { key: "firstName", label: "First Name", required: true, placeholder: "John" },
                        { key: "middleName", label: "Middle Name", placeholder: "Optional" },
                        { key: "lastName", label: "Last Name", required: true, placeholder: "Doe" },
                    ]?.map((field) => (
                        <Grid key={field.key} size={{xs:12, sm:6, md:4}}>
                            <FormField label={field.label} required={field.required} error={!!errors[field.key]}>
                                <Input
                                    placeholder={field.placeholder}
                                    value={profileData[field.key]}
                                    onChange={(e) => handleLocalUpdate(field.key, e.target.value)}
                                    onBlur={() => handleReduxUpdate(field.key)}
                                    error={!!errors[field.key]}
                                    helperText={errors[field.key]}
                                />
                            </FormField>
                        </Grid>
                    ))}
                </Grid>
            </div>

            {/* === Address Section === */}
            <div>
                <SectionDivider icon={MapPin} title="Address Information" />
                <Grid container rowSpacing={0} columnSpacing={2}>
                    {[
                        { key: "city", label: "City", placeholder: "New York" },
                        { key: "area", label: "Area/District", placeholder: "Manhattan" },
                        { key: "zipCode", label: "Zip/Postal Code", placeholder: "10001" },
                    ].map((field) => (
                        <Grid key={field.key} size={{xs:12, sm:6, md:4}}>
                            <FormField label={field.label} error={!!errors[field.key]}>
                                <Input
                                    placeholder={field.placeholder}
                                    value={profileData[field.key]}
                                    onChange={(e) => handleLocalUpdate(field.key, e.target.value)}
                                    onBlur={() => handleReduxUpdate(field.key)}
                                />
                                {errors[field.key] && (
                                    <FormHelperText sx={{ color: "error.main" }}>
                                        {errors[field.key]}
                                    </FormHelperText>
                                )}
                            </FormField>
                        </Grid>
                    ))}
                </Grid>

                <Grid container rowSpacing={0} columnSpacing={2}>
                    <Grid size={{xs:12, sm:6}}>
                        <FormField label="State/Province" error={!!errors.state}>
                            <Select
                                placeholder="Select state"
                                value={profileData.state}
                                onChange={(e) => handleSelectChange("state", e.target.value)}
                                options={[
                                    { value: "ca", label: "California" },
                                    { value: "ny", label: "New York" },
                                    { value: "tx", label: "Texas" },
                                    { value: "fl", label: "Florida" },
                                ]}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <FormField label="Country" error={!!errors.country}>
                            <Select
                                placeholder="Select country"
                                value={profileData.country}
                                onChange={(e) => handleSelectChange("country", e.target.value)}
                                options={[
                                    { value: "us", label: "🇺🇸 United States" },
                                    { value: "in", label: "🇮🇳 India" },
                                    { value: "uk", label: "🇬🇧 United Kingdom" },
                                    { value: "ca", label: "🇨🇦 Canada" },
                                ]}
                            />
                        </FormField>
                    </Grid>
                </Grid>

                <FormField label="Full Address" error={!!errors.fullAddress}>
                    <Textarea
                        placeholder="Enter complete address"
                        rows={3}
                        value={profileData.fullAddress}
                        onChange={(e) => handleLocalUpdate("fullAddress", e.target.value)}
                        onBlur={() => handleReduxUpdate("fullAddress")}
                    />
                </FormField>
            </div>

            {/* === Contact Information === */}
            <div>
                <SectionDivider icon={Phone} title="Contact Information" />
                <Grid container rowSpacing={0} columnSpacing={2}>
                    <Grid size={{xs:12, sm:6, md:4}}>
                        <FormField label="Country Code" error={!!errors.countryCode}>
                            <Select
                                placeholder="+1"
                                value={profileData.countryCode}
                                onChange={(e) => handleSelectChange("countryCode", e.target.value)}
                                options={[
                                    { value: "+1", label: "+1 (US/CA)" },
                                    { value: "+91", label: "+91 (India)" },
                                    { value: "+44", label: "+44 (UK)" },
                                    { value: "+61", label: "+61 (Australia)" },
                                ]}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{xs:12, sm:6, md:4}}>
                        <FormField label="Mobile Number" required error={!!errors.mobileNumber}>
                            <InputWithIcon
                                icon={Phone}
                                placeholder="123-456-7890"
                                value={profileData.mobileNumber}
                                onChange={(e) => handleLocalUpdate("mobileNumber", e.target.value)}
                                onBlur={() => handleReduxUpdate("mobileNumber")}
                                error={!!errors.mobileNumber}
                                helperText={errors.mobileNumber}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{xs:12, sm:6, md:4}}>
                        <FormField label="Telephone" error={!!errors.telephone}>
                            <Input
                                placeholder="Optional landline"
                                value={profileData.telephone}
                                onChange={(e) => handleLocalUpdate("telephone", e.target.value)}
                                onBlur={() => handleReduxUpdate("telephone")}
                            />
                        </FormField>
                    </Grid>
                </Grid>
            </div>

            {/* === Personal Details === */}
            <div>
                <SectionDivider icon={Calendar} title="Personal Details" />
                <Grid container rowSpacing={0} columnSpacing={2}>
                    <Grid size={{xs:12, sm:6}}>
                        <FormField label="Date of Birth" error={!!errors.dateOfBirth}>
                            <InputWithIcon
                                icon={Calendar}
                                type="date"
                                value={profileData.dateOfBirth}
                                onChange={(e) => handleLocalUpdate("dateOfBirth", e.target.value)}
                                onBlur={() => handleReduxUpdate("dateOfBirth")}
                            />
                        </FormField>
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <FormField label="Marital Status" error={!!errors.maritalStatus}>
                            <Select
                                placeholder="Select status"
                                value={profileData.maritalStatus}
                                onChange={(e) => handleSelectChange("maritalStatus", e.target.value)}
                                options={[
                                    { value: "single", label: "Single" },
                                    { value: "married", label: "Married" },
                                    { value: "divorced", label: "Divorced" },
                                    { value: "widowed", label: "Widowed" },
                                ]}
                            />
                        </FormField>
                    </Grid>
                </Grid>
            </div>

            {/* === Additional Info === */}
            <div>
                <SectionDivider icon={BookOpen} title="Additional Information" />
                <Grid container rowSpacing={0} columnSpacing={2}>
                    {[
                        { key: "religion", label: "Religion", placeholder: "Optional" },
                        { key: "festivalPreference", label: "Festival Preference", placeholder: "Optional" },
                        { key: "profession", label: "Profession", placeholder: "e.g., Business Owner" },
                    ].map((field) => (
                        <Grid key={field.key} size={{xs:12, sm:6, md:4}}>
                            <FormField label={field.label} error={!!errors[field.key]}>
                                <Input
                                    placeholder={field.placeholder}
                                    value={profileData[field.key]}
                                    onChange={(e) => handleLocalUpdate(field.key, e.target.value)}
                                    onBlur={() => handleReduxUpdate(field.key)}
                                />
                            </FormField>
                        </Grid>
                    ))}
                </Grid>
            </div>

            {/* === Photo Upload === */}
            <div>
                <SectionDivider icon={Camera} title="Profile Photo" />
                <FormField
                    label="Upload Photo"
                    tooltip="Profile photo for identification purposes"
                    error={!!errors.profilePhoto}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ display: "flex", gap: 12 }}>
                            <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                                <Upload size={16} />
                                Choose File
                            </Button>
                            <Button variant="outlined" onClick={handleTakePhoto}>
                                <Camera size={16} />
                                Take Photo
                            </Button>
                        </div>

                        {photoError && (
                            <div style={{ fontSize: 14, color: "#dc2626", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: 12 }}>
                                {photoError}
                            </div>
                        )}

                        {photoPreview && (
                            <div style={{ position: "relative", width: 128 }}>
                                <img
                                    src={photoPreview}
                                    alt="Profile preview"
                                    style={{ width: 128, height: 128, objectFit: "cover", borderRadius: 8 }}
                                />
                                <button
                                    onClick={handleRemovePhoto}
                                    style={{
                                        position: "absolute",
                                        top: -8,
                                        right: -8,
                                        background: "#ef4444",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: 24,
                                        height: 24,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Trash2 size={14} />
                                </button>
                                {profilePhoto && (
                                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                                        File: {profilePhoto.name} ({formatFileSize(profilePhoto.size)})
                                    </div>
                                )}
                            </div>
                        )}

                        <p style={{ fontSize: 12, color: "#6b7280" }}>
                            Supported formats: JPG, PNG, GIF (Max 5MB)
                        </p>
                    </div>
                </FormField>
            </div>
        </div>
    );
};

export default UserProfileForm;
