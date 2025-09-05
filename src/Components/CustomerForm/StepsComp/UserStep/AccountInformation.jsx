import React, { useState, useEffect } from "react";
import { Grid, FormHelperText } from "@mui/material";
import { Mail, Calendar, User } from "lucide-react";
import { FormField, Input, InputWithIcon, Select } from "../../../Ui";
import CustomInput from "../../../Ui/CustomInput";
import CustomAutocomplete from "../../../Ui/ReusableAutocomplete";

const UserAccountInfoSection = ({ formData, errors, onUpdate, formType = "customer" }) => {
    const [accountData, setAccountData] = useState({
        userEmail: "",
        userCode: "",
        joiningDate: new Date().toISOString().split("T")[0],
        referenceBy: "",
        referenceUserCode: "",
        assignedBroker: "",
        department: "",
        designation: "",
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
                department: formData.department || "",
                designation: formData.designation || "",
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
                    tooltip="Email address of the user"
                >
                    <CustomInput
                        type="email"
                        placeholder="user@company.com"
                        value={accountData.userEmail}
                        onChange={(e) => handleLocalUpdate("userEmail", e.target.value)}
                        onBlur={() => handleReduxUpdate("userEmail")}
                        error={errors?.userEmail}
                        helperText="User email is required"
                    />
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="User Code"
                    tooltip="Unique code for the user"
                >
                    <div style={{ display: "flex", gap: 8 }}>
                        <CustomInput
                            placeholder="AUTO-GENERATED"
                            style={{ flex: 1 }}
                            value={accountData.userCode}
                            onChange={(e) => handleLocalUpdate("userCode", e.target.value)}
                            onBlur={() => handleReduxUpdate("userCode")}
                        />
                    </div>
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Joining Date"
                    tooltip="When this customer account was created"
                >
                    <CustomInput
                        placeholder="DD-MM-YYYY"
                        type="date"
                        value={accountData.joiningDate}
                        onChange={(e) => handleLocalUpdate("joiningDate", e.target.value)}
                        onBlur={() => handleReduxUpdate("joiningDate")}
                    />
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Reference By"
                    tooltip="Person or entity who referred this customer"
                >
                    <CustomInput
                        placeholder="Enter name or ID"
                        value={accountData.referenceBy}
                        onChange={(e) => handleLocalUpdate("referenceBy", e.target.value)}
                        onBlur={() => handleReduxUpdate("referenceBy")}
                    />
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Reference User Code"
                    tooltip="Code of the referring user if applicable"
                >
                    <CustomInput
                        placeholder="If applicable"
                        value={accountData.referenceUserCode}
                        onChange={(e) => handleLocalUpdate("referenceUserCode", e.target.value)}
                        onBlur={() => handleReduxUpdate("referenceUserCode")}
                        error={!!errors.referenceUserCode}
                        helperText="Reference user code is required"
                    />
                </FormField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                    label="Assigned Broker"
                    tooltip="Select a broker to handle this customer's account"
                >
                    <CustomAutocomplete
                        placeholder="Select broker (optional)"
                        value={accountData.assignedBroker}
                        onChange={(e, newValue) => handleSelectChange("assignedBroker", newValue)}
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
                </FormField>
            </Grid>

            {/* Department and Designation fields - Only for Employer */}
            {formType === "employer" && (
                <>
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormField
                            label="Department"
                            tooltip="Employee's department within the organization"
                        >
                            <CustomAutocomplete
                                placeholder="Select department"
                                value={accountData.department}
                                onChange={(e, newValue) => handleSelectChange("department", newValue)}
                                options={[
                                    { value: "hr", label: "Human Resources" },
                                    { value: "finance", label: "Finance & Accounting" },
                                    { value: "it", label: "Information Technology" },
                                    { value: "sales", label: "Sales & Marketing" },
                                    { value: "operations", label: "Operations" },
                                    { value: "admin", label: "Administration" },
                                    { value: "management", label: "Management" },
                                    { value: "other", label: "Other" },
                                ]}
                            />
                        </FormField>
                    </Grid>

                    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormField
                            label="Designation"
                            tooltip="Employee's job title or position"
                        >
                            <CustomAutocomplete
                                placeholder="Select designation"
                                value={accountData.designation}
                                onChange={(e, newValue) => handleSelectChange("designation", newValue)}
                                options={[
                                    { value: "ceo", label: "Chief Executive Officer (CEO)" },
                                    { value: "cto", label: "Chief Technology Officer (CTO)" },
                                    { value: "cfo", label: "Chief Financial Officer (CFO)" },
                                    { value: "manager", label: "Manager" },
                                    { value: "senior_manager", label: "Senior Manager" },
                                    { value: "assistant_manager", label: "Assistant Manager" },
                                    { value: "team_lead", label: "Team Lead" },
                                    { value: "senior_executive", label: "Senior Executive" },
                                    { value: "executive", label: "Executive" },
                                    { value: "junior_executive", label: "Junior Executive" },
                                    { value: "analyst", label: "Analyst" },
                                    { value: "senior_analyst", label: "Senior Analyst" },
                                    { value: "associate", label: "Associate" },
                                    { value: "senior_associate", label: "Senior Associate" },
                                    { value: "specialist", label: "Specialist" },
                                    { value: "coordinator", label: "Coordinator" },
                                    { value: "supervisor", label: "Supervisor" },
                                    { value: "officer", label: "Officer" },
                                    { value: "assistant", label: "Assistant" },
                                    { value: "intern", label: "Intern" },
                                    { value: "other", label: "Other" },
                                ]}
                            />
                        </FormField>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default UserAccountInfoSection;