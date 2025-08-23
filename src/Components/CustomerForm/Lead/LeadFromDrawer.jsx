import React, { useEffect, useState } from "react";
import {
    Drawer,
    Box,
    Grid,
    Typography,
    IconButton,
    Button,
    Divider,
} from "@mui/material";
import { PlusCircle, Trash2, X } from "lucide-react";
import { FormField, Input } from "../../Ui";

const LeadFromDrawer = ({ open, editData, onClose }) => {
    const [form, setForm] = useState({
        userId: "",
        emails: "",
        firstName: "",
        middleName: "",
        lastName: "",
        addressProfile: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        telephone: "",
        leadSource: "",
        companyName: "",
        companyType: "",
        companyAddress: "",
        mobiles: [""],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editData) {
            setForm(editData);
        }
    }, [editData]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleMobileChange = (index, value) => {
        const updated = [...form.mobiles];
        updated[index] = value;
        setForm((prev) => ({ ...prev, mobiles: updated }));
    };

    const addMobile = () => {
        setForm((prev) => ({ ...prev, mobiles: [...prev.mobiles, ""] }));
    };

    const removeMobile = (index) => {
        const updated = form.mobiles.filter((_, i) => i !== index);
        setForm((prev) => ({ ...prev, mobiles: updated }));
    };

    const handleSave = (reset = false) => {
        // if (onSave) onSave(form);
        if (reset) {
            setForm({
                userId: "",
                emails: "",
                firstName: "",
                middleName: "",
                lastName: "",
                addressProfile: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                country: "",
                zip: "",
                telephone: "",
                leadSource: "",
                companyName: "",
                companyType: "",
                companyAddress: "",
                mobiles: [""],
            });
        }else{
            onClose();
        }
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 550, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: "1px solid #e5e7eb" }}>
                    <Typography variant="h6">New Lead</Typography>
                    <IconButton onClick={onClose}>
                        <X />
                    </IconButton>
                </Box>

                {/* Body */}
                <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <FormField label="Company Name">
                                <Input
                                    value={form.companyName}
                                    placeholder="Enter company name"
                                    onChange={(e) => handleChange("companyName", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Company Type">
                                <Input
                                    value={form.companyType}
                                    placeholder="Enter company type"
                                    onChange={(e) => handleChange("companyType", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Company Address">
                                <Input
                                    value={form.companyAddress}
                                    placeholder="Enter company address"
                                    onChange={(e) => handleChange("companyAddress", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="User ID / Email ID" required>
                                <Input
                                    value={form.userId}
                                    onChange={(e) => handleChange("userId", e.target.value)}
                                    placeholder="Enter email or user id"
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Emails">
                                <Input
                                    value={form.emails}
                                    onChange={(e) => handleChange("emails", e.target.value)}
                                    placeholder="Comma separated emails"
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="First Name" required>
                                <Input
                                    value={form.firstName}
                                    placeholder="Enter first name"
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Middle Name">
                                <Input
                                    value={form.middleName}
                                    placeholder="Enter middle name"
                                    onChange={(e) => handleChange("middleName", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Last Name">
                                <Input
                                    value={form.lastName}
                                    placeholder="Enter last name"
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                />
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Address Profile">
                                <Input
                                    value={form.addressProfile}
                                    placeholder="Enter address profile"
                                    onChange={(e) => handleChange("addressProfile", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Address Line 1">
                                <Input
                                    value={form.address1}
                                    placeholder="Enter address line 1"
                                    onChange={(e) => handleChange("address1", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Address Line 2">
                                <Input
                                    value={form.address2}
                                    placeholder="Enter address line 2"
                                    onChange={(e) => handleChange("address2", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="City">
                                <Input
                                    value={form.city}
                                    placeholder="Enter city"
                                    onChange={(e) => handleChange("city", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="State">
                                <Input
                                    value={form.state}
                                    placeholder="Enter state"
                                    onChange={(e) => handleChange("state", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Country">
                                <Input
                                    value={form.country}
                                    placeholder="Enter country"
                                    onChange={(e) => handleChange("country", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Zip Code">
                                <Input
                                    value={form.zip}
                                    placeholder="Enter zip code"
                                    onChange={(e) => handleChange("zip", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Telephone">
                                <Input
                                    value={form.telephone}
                                    placeholder="Enter telephone"
                                    onChange={(e) => handleChange("telephone", e.target.value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormField label="Lead Source">
                                <Input
                                    value={form.leadSource}
                                    placeholder="Enter lead source"
                                    onChange={(e) => handleChange("leadSource", e.target.value)}
                                />
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280' }}>
                                Mobile Numbers
                            </Typography>
                            {form?.mobiles?.map((mobile, idx) => (
                                <Box
                                    key={idx}
                                    sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}
                                >
                                    <Input
                                        placeholder="Enter mobile number"
                                        value={mobile}
                                        onChange={(e) => handleMobileChange(idx, e.target.value)}
                                    />
                                    {idx === 0 ? (
                                        <IconButton color="primary" onClick={addMobile}>
                                            <PlusCircle size={18} />
                                        </IconButton>
                                    ) : (
                                        <IconButton color="error" onClick={() => removeMobile(idx)}>
                                            <Trash2 size={18} />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}
                        </Grid>

                    </Grid>
                </Box>

                {/* Footer */}
                <Divider />
                <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="outlined" onClick={() => handleSave(false)}>
                        Save
                    </Button>
                    <Button variant="contained" onClick={() => handleSave(true)}>
                        Save & New
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default LeadFromDrawer;
