import React, { useState, useEffect } from "react";
import { Grid, FormHelperText } from "@mui/material";
import { Mail, Calendar, User } from "lucide-react";
import { FormField, Input, InputWithIcon, Select } from "../../../Ui";

const UserAccountInfoSection = ({ formData, errors, onUpdate }) => {
    console.log('errors: ', errors);
    const [accountData, setAccountData] = useState({
        userEmail: "",
        userCode: "",
        joiningDate: new Date().toISOString().split("T")[0],
        referenceBy: "",
        referenceUserCode: "",
        assignedBroker: "",
    });

    useEffect(() => {
        if (formData) {
            setAccountData({
                userEmail: formData.userEmail || "",
                userCode: formData.userCode || "",
                joiningDate: formData.joiningDate || new Date().toISOString().split("T")[0],
                referenceBy: formData.referenceBy || "",
                referenceUserCode: formData.referenceUserCode || "",
                assignedBroker: formData.assignedBroker || "",
            });
        }
    }, [formData]);

    const handleLocalUpdate = (field, value) => {
        setAccountData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleReduxUpdate = (field) => {
        onUpdate({ [field]: accountData[field] });
    };

    const handleSelectChange = (field, value) => {
        const updatedState = { ...accountData, [field]: value };
        setAccountData(updatedState);
        onUpdate({ [field]: value });
    };

    return (
        <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="User Email/ID"
                    required
                    tooltip="This will be used as the primary login credential. Make sure it's a valid email address."
                    error={!!errors.userEmail}
                >
                    <InputWithIcon
                        icon={Mail}
                        type="email"
                        placeholder="user@company.com"
                        value={accountData.userEmail}
                        onChange={(e) => handleLocalUpdate("userEmail", e.target.value)}
                        onBlur={() => handleReduxUpdate("userEmail")}
                    />
                    {errors.userEmail && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.userEmail}</FormHelperText>}
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="User Code"
                    tooltip="Unique identifier - leave blank for auto-generation based on name and timestamp"
                    error={!!errors.userCode}
                >
                    <div style={{ display: "flex", gap: 8 }}>
                        <Input
                            placeholder="AUTO-GENERATED"
                            style={{ flex: 1 }}
                            value={accountData.userCode}
                            onChange={(e) => handleLocalUpdate("userCode", e.target.value)}
                            onBlur={() => handleReduxUpdate("userCode")}
                        />
                    </div>
                    {errors.userCode && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.userCode}</FormHelperText>}
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Joining Date"
                    tooltip="When this customer account was created"
                    error={!!errors.joiningDate}
                >
                    <InputWithIcon
                        icon={Calendar}
                        type="date"
                        value={accountData.joiningDate}
                        onChange={(e) => handleLocalUpdate("joiningDate", e.target.value)}
                        onBlur={() => handleReduxUpdate("joiningDate")}
                    />
                    {errors.joiningDate && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.joiningDate}</FormHelperText>}
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Reference By"
                    tooltip="Person or entity who referred this customer"
                    error={!!errors.referenceBy}
                >
                    <InputWithIcon
                        icon={User}
                        placeholder="Enter name or ID"
                        value={accountData.referenceBy}
                        onChange={(e) => handleLocalUpdate("referenceBy", e.target.value)}
                        onBlur={() => handleReduxUpdate("referenceBy")}
                    />
                    {errors.referenceBy && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.referenceBy}</FormHelperText>}
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Reference User Code"
                    tooltip="Code of the referring user if applicable"
                    error={!!errors.referenceUserCode}
                >
                    <Input
                        placeholder="If applicable"
                        value={accountData.referenceUserCode}
                        onChange={(e) => handleLocalUpdate("referenceUserCode", e.target.value)}
                        onBlur={() => handleReduxUpdate("referenceUserCode")}
                    />
                    {errors.referenceUserCode && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.referenceUserCode}</FormHelperText>}
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Assigned Broker"
                    tooltip="Select a broker to handle this customer's account"
                    error={!!errors.assignedBroker}
                >
                    <Select
                        placeholder="Select broker (optional)"
                        value={accountData.assignedBroker}
                        onChange={(e) => handleSelectChange("assignedBroker", e.target.value)}
                        options={[
                            {
                                value: "broker1",
                                label: "John Smith - Premium Broker • 5+ years",
                            },
                            {
                                value: "broker2",
                                label: "Sarah Johnson - Senior Broker • 8+ years",
                            },
                        ]}
                    />
                    {errors.assignedBroker && <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors.assignedBroker}</FormHelperText>}
                </FormField>
            </Grid>
        </Grid>
    );
};

export default UserAccountInfoSection;