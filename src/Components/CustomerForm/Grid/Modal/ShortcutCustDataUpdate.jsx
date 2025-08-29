import React, { useState, useRef, forwardRef, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Grid,
    Paper,
    Slide,
    Tabs,
    Tab,
    Box,
    Typography,
    Divider,
    TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { X, GripVertical } from "lucide-react";
import Draggable from "react-draggable";
import FilterAutocomplete from "../../../../Common/FilterAutocomplete";

// Draggable Paper
const PaperComponent = (props) => {
    const nodeRef = useRef(null);
    return (
        <Draggable
            handle="#draggable-dialog-title"
            nodeRef={nodeRef}
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper ref={nodeRef} {...props} sx={{ borderRadius: 2 }} />
        </Draggable>
    );
};

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

// Define tabs and fields
const tabsList = [
    {
        label: "Update Price Policy",
        fields: [
            "Diamond Price",
            "ColorStone/misc/service Price",
            "Labour Price",
            "Setting/Secondary Metal Price",
            "Payment Due Days",
            "Policy Due Date",
            "Discount",
            "Web Discount",
        ],
    },
    { label: "Update Company Type", fields: ["Company Type"] },
    { label: "Update Sales Rep", fields: ["Reference By", "Reference User Code"] },
    { label: "Update Adhoc", fields: ["Adhoc Package"] },
    { label: "Update Status", fields: ["Package"] },
];

// Fields that should use TextField; the rest will use Autocomplete
const textFields = [
    "Payment Due Days",
    "Policy Due Date",
    "Discount",
    "Web Discount",
    "Reference By",
    "Reference User Code",
];
const dateFields = [
    "Payment Due Days",
    "Policy Due Date",
];

const ShortcutCustDataUpdate = ({ open, onClose, initialActiveTab = 0, onApply, autocompleteOptions = {} }) => {
    const [activeTab, setActiveTab] = useState(initialActiveTab);

    useEffect(() => {
        setActiveTab(initialActiveTab);
    }, [initialActiveTab, open]);

    const [tabValues, setTabValues] = useState(
        tabsList.reduce(
            (acc, tab) => ({
                ...acc,
                [tab.label]: tab.fields.reduce((fAcc, field) => ({ ...fAcc, [field]: "" }), {}),
            }),
            {}
        )
    );

    const handleChange = (tabLabel, field, value) => {
        setTabValues({
            ...tabValues,
            [tabLabel]: { ...tabValues[tabLabel], [field]: value },
        });
    };

    const handleApply = () => {
        const activeTabLabel = tabsList[activeTab].label;
        const activeTabData = tabValues[activeTabLabel];
        onApply?.(activeTabLabel, activeTabData);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={PaperComponent}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="draggable-dialog-title"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                style={{ cursor: "move", display: "flex", alignItems: "center" }}
                id="draggable-dialog-title"
            >
                <GripVertical size={20} style={{ marginRight: 8 }} />
                <Typography variant="h6" component="span">
                    Shortcut Customer Data Update
                </Typography>
                <IconButton onClick={onClose} style={{ marginLeft: "auto" }} size="small">
                    <X size={18} />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ paddingY: 2 }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ "& .MuiTab-root": { minWidth: 140, fontWeight: 600 } }}
                >
                    {tabsList.map((tab) => (
                        <Tab key={tab.label} label={tab.label} />
                    ))}
                </Tabs>
                <Divider sx={{ my: 2 }} />

                {tabsList?.map((tab, index) => (
                    <Box key={tab.label} role="tabpanel" hidden={activeTab !== index} sx={{ paddingTop: 1 }}>
                        {activeTab === index && (
                            <Grid container spacing={3}>
                                {tab.fields.map((field) => (
                                    <Grid item xs={12} sm={6} key={field}>
                                        {textFields.includes(field) ? (
                                            <TextField
                                                placeholder={`Enter ${field.toLowerCase()}`}
                                                fullWidth
                                                size="small"
                                                value={tabValues[tab.label][field]}
                                                onChange={(e) => handleChange(tab.label, field, e.target.value)}
                                                sx={{
                                                    minWidth: 260,
                                                    "& .MuiInputBase-input": {
                                                        height: '20px !important',
                                                        fontSize: '14px !important',

                                                    },
                                                }}
                                            />
                                        ) : dateFields.includes(field) ? (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label={field}
                                                    value={tabValues[tab.label][field] || null}
                                                    onChange={(newValue) => handleChange(tab.label, field, newValue)}
                                                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                                />
                                            </LocalizationProvider>
                                        ) : (
                                            <FilterAutocomplete
                                                label={field}
                                                options={autocompleteOptions[field] || []}
                                                value={tabValues[tab.label][field]}
                                                onChange={(val) => handleChange(tab.label, field, val)}
                                                minWidth={260}
                                            />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                ))}
            </DialogContent>

            <DialogActions sx={{ padding: 2 }}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleApply();
                        onClose();
                    }}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShortcutCustDataUpdate;
