import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Box, Grid, Typography, IconButton, Button, Divider, useTheme } from "@mui/material";
import { X } from "lucide-react";
import dropdownOptions from "../../Data/dropdownOptions.json";
import { FormField, Input } from "../Ui";
import CustomAutocomplete from "../Ui/ReusableAutocomplete";
import { ToggleSwitch } from "../Ui/ToggleSwitch";

const selectify = (arr) => (Array.isArray(arr) ? arr : []);
const makeOnOptions = [
    { value: "metal_wt", label: "Metal Wt" },
    { value: "metal_wt_total", label: "Metal Wt (Total)" },
    { value: "net_wt", label: "Net Wt" },
];

const PricePolicyFormDrawer = ({ open, editData, onClose, onSave }) => {
    const theme = useTheme();
    const [form, setForm] = useState({
        manufacturer: "",
        brand: "",
        productType: "",
        collection: "",
        category: "",
        style: "",
        makeType: "",
        metalType: "",
        labourSet: "",
        lessPolicy: "",
        purWastage: 0,
        purMaking: 0,
        salesWastage: 0,
        salesMaking: 0,
        purMetalLoss: 0,
        saleMetalLoss: 0,
        mrpDiscount: 0,
        weightRangeFrom: 0,
        weightRangeTo: 0,
        weightRangeOn: "metal_wt_total",
        purMakingOn: "metal_wt",
        salesMakingOn: "metal_wt",
        purMetalLossOn: "metal_wt",
        saleMetalLossOn: "metal_wt",
        salesWastageAsMarkup: false,
    });

    useEffect(() => {
        if (editData) setForm((prev) => ({ ...prev, ...editData }));
    }, [editData]);

    const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

    const toPairs = (arr) => selectify(arr).map((opt) => ({ label: String(opt), value: String(opt) }));
    const selects = useMemo(
        () => ({
            manufacturers: toPairs(dropdownOptions.manufacturers),
            brands: toPairs(dropdownOptions.brands),
            productTypes: toPairs(dropdownOptions.productTypes),
            collections: toPairs(dropdownOptions.collections),
            categories: toPairs(dropdownOptions.categories),
            styles: toPairs(dropdownOptions.styles),
            makeTypes: toPairs(dropdownOptions.makeTypes),
            metalTypes: toPairs(dropdownOptions.metalTypes),
            labourSets: toPairs(dropdownOptions.labourSets),
            lessPolicies: toPairs(dropdownOptions.lessPolicies),
            discountPercentages: toPairs(dropdownOptions.discountPercentages),
        }),
        []
    );

    const numberFieldProps = {
        type: "number",
        inputProps: { min: 0 },
    };

    const handleSave = (reset = false) => {
        onSave?.(form);
        if (reset) {
            setForm((prev) => ({
                ...prev,
                purWastage: 0,
                purMaking: 0,
                salesWastage: 0,
                salesMaking: 0,
                purMetalLoss: 0,
                saleMetalLoss: 0,
                mrpDiscount: 0,
                weightRangeFrom: 0,
                weightRangeTo: 0,
            }));
        } else {
            onClose?.();
        }
    };

    const Select = ({ label, value, onChange, options = [], required }) => {
        const selected = options.find((o) => o.value === value) || null;
        return (
            <FormField label={label} required={required}>
                <CustomAutocomplete
                    options={options}
                    value={selected}
                    onChange={(e, val) => onChange(val?.value || "")}
                    getOptionLabel={(opt) => opt.label}
                />
            </FormField>
        );
    };

    const SelectOn = ({ value, onChange }) => {
        const selected = makeOnOptions.find((o) => o.value === value) || null;
        return (
            <CustomAutocomplete
                options={makeOnOptions}
                value={selected}
                onChange={(e, val) => onChange(val?.value || "")}
                getOptionLabel={(opt) => opt.label}
                size="small"
                sx={{ minWidth: 180 }}
            />
        );
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 620, display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: "1px solid #e5e7eb" }}>
                    <Typography variant="h6">Price Policy</Typography>
                    <IconButton onClick={onClose}>
                        <X />
                    </IconButton>
                </Box>

                <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Manufacturer" required value={form.manufacturer} onChange={(v) => handleChange("manufacturer", v)} options={selects.manufacturers} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Brand" required value={form.brand} onChange={(v) => handleChange("brand", v)} options={selects.brands} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Product Type" required value={form.productType} onChange={(v) => handleChange("productType", v)} options={selects.productTypes} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Collection" required value={form.collection} onChange={(v) => handleChange("collection", v)} options={selects.collections} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Category" required value={form.category} onChange={(v) => handleChange("category", v)} options={selects.categories} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Style" required value={form.style} onChange={(v) => handleChange("style", v)} options={selects.styles} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Make Type" required value={form.makeType} onChange={(v) => handleChange("makeType", v)} options={selects.makeTypes} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Select label="Metal Type" required value={form.metalType} onChange={(v) => handleChange("metalType", v)} options={selects.metalTypes} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Select label="Labour Set" required value={form.labourSet} onChange={(v) => handleChange("labourSet", v)} options={selects.labourSets} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Select label="Less Policy" required value={form.lessPolicy} onChange={(v) => handleChange("lessPolicy", v)} options={selects.lessPolicies} />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="Purchase Wastage" required>
                                <Input {...numberFieldProps} value={form.purWastage} onChange={(e) => handleChange("purWastage", Number(e.target.value))} />
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="Purchase Making" required>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Input {...numberFieldProps} value={form.purMaking} onChange={(e) => handleChange("purMaking", Number(e.target.value))} />
                                    <Typography variant="body2">On</Typography>
                                    <SelectOn value={form.purMakingOn} onChange={(v) => handleChange("purMakingOn", v)} />
                                </Box>
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="Sales Wastage" required>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Input {...numberFieldProps} value={form.salesWastage} onChange={(e) => handleChange("salesWastage", Number(e.target.value))} />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ToggleSwitch
                                            checked={form.salesWastageAsMarkup}
                                            onChange={(val) => handleChange("salesWastageAsMarkup", val)}
                                            activeColor={theme.palette.primary.main}
                                            inactiveColor="#d1d5db"
                                            width={38}
                                            height={22}
                                        />
                                        <Typography variant="body2">Set As MarkUp</Typography>
                                    </Box>
                                </Box>
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="Sales Making" required>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Input {...numberFieldProps} value={form.salesMaking} onChange={(e) => handleChange("salesMaking", Number(e.target.value))} />
                                    <Typography variant="body2">On</Typography>
                                    <SelectOn value={form.salesMakingOn} onChange={(v) => handleChange("salesMakingOn", v)} />
                                </Box>
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="Purchase Metal Loss (%)" required>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Input {...numberFieldProps} value={form.purMetalLoss} onChange={(e) => handleChange("purMetalLoss", Number(e.target.value))} />
                                    <Typography variant="body2">On</Typography>
                                    <SelectOn value={form.purMetalLossOn} onChange={(v) => handleChange("purMetalLossOn", v)} />
                                </Box>
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="Sale Metal Loss (%)" required>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Input {...numberFieldProps} value={form.saleMetalLoss} onChange={(e) => handleChange("saleMetalLoss", Number(e.target.value))} />
                                    <Typography variant="body2">On</Typography>
                                    <SelectOn value={form.saleMetalLossOn} onChange={(v) => handleChange("saleMetalLossOn", v)} />
                                </Box>
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="Weight Range" required>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'nowrap' }}>
                                    <Box sx={{ minWidth: 120 }}>
                                        <Input {...numberFieldProps} value={form.weightRangeFrom} onChange={(e) => handleChange("weightRangeFrom", Number(e.target.value))} />
                                    </Box>
                                    <Typography variant="body2">To</Typography>
                                    <Box sx={{ minWidth: 120 }}>
                                        <Input {...numberFieldProps} value={form.weightRangeTo} onChange={(e) => handleChange("weightRangeTo", Number(e.target.value))} />
                                    </Box>
                                    <Typography variant="body2">On</Typography>
                                    <Box sx={{ minWidth: 200 }}>
                                        <SelectOn value={form.weightRangeOn} onChange={(v) => handleChange("weightRangeOn", v)} />
                                    </Box>
                                </Box>
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormField label="MRP Discount" required>
                                <Input {...numberFieldProps} value={form.mrpDiscount} onChange={(e) => handleChange("mrpDiscount", Number(e.target.value))} />
                            </FormField>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />
                <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <Button variant="outlined" color="success" onClick={() => handleSave(false)}>
                        Save and Go to List
                    </Button>
                    <Button variant="contained" onClick={() => handleSave(true)}>
                        Save and Add New
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default PricePolicyFormDrawer;
