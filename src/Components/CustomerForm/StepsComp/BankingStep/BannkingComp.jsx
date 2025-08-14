import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, IconButton, Button, Radio, Divider, FormHelperText } from "@mui/material";
import { CreditCard, Shield, Trash2, PlusCircle } from "lucide-react";
import { FormField, Input, Select } from "../../../Ui";

const BankingComp = ({ formData, errors, onUpdate }) => {
    const [accounts, setAccounts] = useState([{
        bankName: "",
        branchName: "",
        holderName: "",
        accountType: "",
        accountNumber: "",
        ifscCode: "",
        isPrimary: true,
    }]);

    useEffect(() => {
        if (formData?.length > 0) {
            setAccounts(formData);
        }
    }, [formData])

    const handleUpdate = (updatedAccounts) => {
        setAccounts(updatedAccounts);
        onUpdate({ accounts: updatedAccounts });
    };

    const handleInputBlur = (index, field, value) => {
        const updatedAccounts = accounts.map((acc, i) =>
            i === index ? { ...acc, [field]: value } : acc
        );
        handleUpdate(updatedAccounts);
    };

    const handleSelectChange = (index, field, value) => {
        const updatedAccounts = accounts.map((acc, i) =>
            i === index ? { ...acc, [field]: value } : acc
        );
        handleUpdate(updatedAccounts);
    };

    const addAccount = () => {
        const newAccount = {
            bankName: "",
            branchName: "",
            holderName: "",
            accountType: "",
            accountNumber: "",
            ifscCode: "",
            isPrimary: false,
        };
        const updatedAccounts = [...accounts, newAccount];
        handleUpdate(updatedAccounts);
    };

    const removeAccount = (index) => {
        const updatedAccounts = accounts.filter((_, i) => i !== index);
        if (accounts[index].isPrimary && updatedAccounts.length > 0) {
            updatedAccounts[0].isPrimary = true;
        }
        handleUpdate(updatedAccounts);
    };

    const setPrimary = (index) => {
        const updatedAccounts = accounts.map((acc, i) => ({
            ...acc,
            isPrimary: i === index,
        }));
        handleUpdate(updatedAccounts);
    };

    console.log('accounts: ', accounts);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {accounts?.map((account, index) => (
                <Box
                    key={index}
                    sx={{
                        p: 2,
                        border: "1px solid #e5e7eb",
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            Bank Account {index + 1}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Radio
                                checked={account.isPrimary}
                                onChange={() => setPrimary(index)}
                                value={index}
                                name="primary-account"
                                color="primary"
                            />
                            <Typography variant="body2" color="text.secondary">
                                Primary
                            </Typography>
                            {accounts.length > 1 && (
                                <IconButton size="small" onClick={() => removeAccount(index)} color="error">
                                    <Trash2 size={18} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container rowSpacing={0} columnSpacing={2}>
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormField label="Bank Name" required error={!!errors?.[`bankName${index}`]}>
                                <Input
                                    placeholder="e.g., Chase Bank"
                                    value={account.bankName}
                                    onChange={(e) => setAccounts((prev) => prev.map((acc, i) => (i === index ? { ...acc, bankName: e.target.value } : acc)))}
                                    onBlur={(e) => handleInputBlur(index, "bankName", e.target.value)}
                                />
                                {errors?.[`bankName${index}`] && (
                                    <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors[`bankName${index}`]}</FormHelperText>
                                )}
                            </FormField>
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormField label="Branch Name" required error={!!errors?.[`branchName${index}`]}>
                                <Input
                                    placeholder="e.g., Downtown Branch"
                                    value={account.branchName}
                                    onChange={(e) => setAccounts((prev) => prev.map((acc, i) => (i === index ? { ...acc, branchName: e.target.value } : acc)))}
                                    onBlur={(e) => handleInputBlur(index, "branchName", e.target.value)}
                                />
                                {errors?.[`branchName${index}`] && (
                                    <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors[`branchName${index}`]}</FormHelperText>
                                )}
                            </FormField>
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormField label="Account Holder Name" required error={!!errors?.[`holderName${index}`]}>
                                <Input
                                    placeholder="Full name on account"
                                    value={account.holderName}
                                    onChange={(e) => setAccounts((prev) => prev.map((acc, i) => (i === index ? { ...acc, holderName: e.target.value } : acc)))}
                                    onBlur={(e) => handleInputBlur(index, "holderName", e.target.value)}
                                />
                                {errors?.[`holderName${index}`] && (
                                    <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors[`holderName${index}`]}</FormHelperText>
                                )}
                            </FormField>
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormField label="Account Type" error={!!errors?.[`accountType${index}`]}>
                                <Select
                                    placeholder="Select account type"
                                    options={[
                                        { value: "savings", label: "💰 Savings Account" },
                                        { value: "current", label: "🏢 Current/Checking Account" },
                                        { value: "cc", label: "💳 Cash Credit Account" },
                                        { value: "od", label: "📊 Overdraft Account" },
                                    ]}
                                    value={account.accountType}
                                    onChange={(e) => handleSelectChange(index, "accountType", e.target.value)}
                                />
                                {errors?.[`accountType${index}`] && (
                                    <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors[`accountType${index}`]}</FormHelperText>
                                )}
                            </FormField>
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormField label="Account Number" required error={!!errors?.[`accountNumber${index}`]}>
                                <Input
                                    type="password"
                                    placeholder="Enter account number"
                                    value={account.accountNumber}
                                    onChange={(e) => setAccounts((prev) => prev.map((acc, i) => (i === index ? { ...acc, accountNumber: e.target.value } : acc)))}
                                    onBlur={(e) => handleInputBlur(index, "accountNumber", e.target.value)}
                                />
                                {errors?.[`accountNumber${index}`] && (
                                    <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors[`accountNumber${index}`]}</FormHelperText>
                                )}
                            </FormField>
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <FormField label="IFSC/Routing Code" required error={!!errors?.[`ifscCode${index}`]}>
                                <Input
                                    placeholder="e.g., CHASE0001234"
                                    value={account.ifscCode}
                                    onChange={(e) => setAccounts((prev) => prev.map((acc, i) => (i === index ? { ...acc, ifscCode: e.target.value } : acc)))}
                                    onBlur={(e) => handleInputBlur(index, "ifscCode", e.target.value)}
                                />
                                {errors?.[`ifscCode${index}`] && (
                                    <FormHelperText sx={{ color: "error.main", mt: 1 }}>{errors[`ifscCode${index}`]}</FormHelperText>
                                )}
                            </FormField>
                        </Grid>
                    </Grid>
                </Box>
            ))}

            {/* Add Account Button */}
            <Button
                variant="outlined"
                startIcon={<PlusCircle size={18} />}
                onClick={addAccount}
            >
                Add Another Bank
            </Button>

            {/* Security Notice */}
            <Box sx={{ mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                    <Shield size={20} color="#1976d2" />
                    <Box>
                        <Typography variant="subtitle2">Security Notice</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your banking information is protected with bank-level encryption. We never store complete
                            account numbers in plain text.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default BankingComp;