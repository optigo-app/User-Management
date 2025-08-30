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

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const ShortcutCustDataUpdate = ({
  open,
  onClose,
  initialActiveTab = 0,
  onApply,
  tabsConfig = [], // [{ label: "Update Price", fields: [{ name, type: "text|date|select", options? }] }]
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab, open]);

  const [tabValues, setTabValues] = useState(
    tabsConfig.reduce(
      (acc, tab) => ({
        ...acc,
        [tab.label]: tab.fields.reduce(
          (fAcc, field) => ({ ...fAcc, [field.name]: "" }),
          {}
        ),
      }),
      {}
    )
  );

  const handleChange = (tabLabel, fieldName, value) => {
    setTabValues({
      ...tabValues,
      [tabLabel]: { ...tabValues[tabLabel], [fieldName]: value },
    });
  };

  const handleApply = () => {
    const activeTabLabel = tabsConfig[activeTab].label;
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
        id="draggable-dialog-title"
        sx={{ cursor: "move", display: "flex", alignItems: "center" }}
      >
        <GripVertical size={20} sx={{ mr: 1 }} />
        <Typography variant="h6" component="span">
          Shortcut Data Update
        </Typography>
        <IconButton onClick={onClose} sx={{ ml: "auto" }} size="small">
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ "& .MuiTab-root": { minWidth: 140, fontWeight: 600 } }}
        >
          {tabsConfig.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>

        <Divider sx={{ my: 2 }} />

        {tabsConfig.map((tab, index) => (
          <Box key={tab.label} role="tabpanel" hidden={activeTab !== index} sx={{ pt: 1 }}>
            {activeTab === index && (
              <Grid container spacing={3}>
                {tab.fields.map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    {field.type === "text" ? (
                      <TextField
                        placeholder={`Enter ${field.name}`}
                        fullWidth
                        size="small"
                        value={tabValues[tab.label][field.name]}
                        onChange={(e) => handleChange(tab.label, field.name, e.target.value)}
                        sx={{ minWidth: 260 }}
                      />
                    ) : field.type === "date" ? (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label={field.name}
                          value={tabValues[tab.label][field.name] || null}
                          onChange={(newValue) => handleChange(tab.label, field.name, newValue)}
                          renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                        />
                      </LocalizationProvider>
                    ) : field.type === "select" ? (
                      <FilterAutocomplete
                        label={field.name}
                        options={field.options || []}
                        value={tabValues[tab.label][field.name]}
                        onChange={(val) => handleChange(tab.label, field.name, val)}
                        minWidth={260}
                      />
                    ) : null}
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
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
