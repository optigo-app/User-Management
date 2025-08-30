import React, { useState, useRef, forwardRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Slide, Grid, IconButton } from "@mui/material";
import { X, GripVertical } from "lucide-react";
import Draggable from "react-draggable";
import FilterAutocomplete from "../../../../Common/FilterAutocomplete";

const PaperComponent = (props) => {
  const nodeRef = useRef(null);
  return (
    <Draggable handle="#draggable-dialog-title" nodeRef={nodeRef} cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
};

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const AdvancedFilterDialog = ({ open, onClose, filtersList = [], criteriaOptions = {}, onApply }) => {
  const [filterValues, setFilterValues] = useState(filtersList.reduce((acc, f) => ({ ...acc, [f.label]: "" }), {}));

  const handleChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} PaperComponent={PaperComponent} TransitionComponent={Transition} keepMounted maxWidth="md" fullWidth>
      <DialogTitle id="draggable-dialog-title" style={{ cursor: "move", display: "flex", alignItems: "center" }}>
        <GripVertical size={20} style={{ marginRight: 8 }} />
        Advanced Filters
        <IconButton onClick={onClose} style={{ marginLeft: "auto" }} size="small">
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {filtersList.map((filter) => (
            <Grid item xs={12} sm={6} key={filter.label}>
              {filter.type === "text" ? (
                <input
                  type="text"
                  placeholder={filter.label}
                  value={filterValues[filter.label]}
                  style={{ minWidth: 272, padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd" }}
                  onChange={(e) => handleChange(filter.label, e.target.value)}
                />
              ) : (
                <FilterAutocomplete
                  label={filter.label}
                  options={criteriaOptions[filter.label] || []}
                  value={filterValues[filter.label]}
                  minWidth={272}
                  onChange={(val) => handleChange(filter.label, val)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => onApply(filterValues)}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedFilterDialog;
