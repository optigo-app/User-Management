import React, { useState, useRef, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Grid,
  Paper,
  Slide,
} from "@mui/material";
import { X, GripVertical } from "lucide-react";
import Draggable from "react-draggable";
import FilterAutocomplete from "../../../../Common/FilterAutocomplete";

// Define all filter columns
const filtersList = [
  { id: 1, labelname: "Sales Representative" },
  { id: 2, labelname: "Mobile" },
  { id: 3, labelname: "Company Name" },
  { id: 4, labelname: "Company Type" },
  { id: 5, labelname: "City" },
  { id: 6, labelname: "State" },
  { id: 7, labelname: "Policy" },
];

// Sample autocomplete options per column
const criteriaOptions = {
  "Sales Representative": [
    { id: 1, labelname: "John Doe" },
    { id: 2, labelname: "Jane Smith" },
  ],
  "Company Type": [
    { id: 1, labelname: "Private" },
    { id: 2, labelname: "Public" },
  ],
  City: [
    { id: 1, labelname: "New York" },
    { id: 2, labelname: "Los Angeles" },
  ],
  State: [
    { id: 1, labelname: "NY" },
    { id: 2, labelname: "CA" },
  ],
  Policy: [
    { id: 1, labelname: "Policy A" },
    { id: 2, labelname: "Policy B" },
  ],
};

// Draggable Paper for Dialog
const PaperComponent = (props) => {
  const nodeRef = useRef(null);
  return (
    <Draggable
      handle="#draggable-dialog-title"
      nodeRef={nodeRef}
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
};
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AdvancedFilterDialog = ({ open, onClose }) => {
  const [filterValues, setFilterValues] = useState(
    filtersList.reduce((acc, f) => ({ ...acc, [f.labelname]: "" }), {})
  );

  const handleChange = (column, value) => {
    setFilterValues({ ...filterValues, [column]: value });
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
        Advanced Filters
        <IconButton
          onClick={onClose}
          style={{ marginLeft: "auto" }}
          size="small"
        >
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {filtersList.map((filter) => (
            <Grid item xs={12} sm={6} key={filter.id}>
              {["Mobile", "Company Name"].includes(filter.labelname) ? (
                <TextField
                  placeholder={filter.labelname}
                  fullWidth
                  size="small"
                  value={filterValues[filter.labelname]}
                  sx={{
                    minWidth: 272,
                    "& .MuiInputBase-input": {
                      height: '20px !important',
                      fontSize: '14px !important',

                    },
                  }}
                  onChange={(e) => handleChange(filter.labelname, e.target.value)}
                />
              ) : (
                <FilterAutocomplete
                  label={filter.labelname}
                  options={criteriaOptions[filter.labelname] || []}
                  value={filterValues[filter.labelname]}
                  minWidth={272}
                  onChange={(val) => handleChange(filter.labelname, val)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedFilterDialog;
