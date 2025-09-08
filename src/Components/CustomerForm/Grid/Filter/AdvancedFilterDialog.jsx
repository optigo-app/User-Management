import React, { useState, useRef, forwardRef, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Slide, Grid, IconButton, Typography, Divider } from "@mui/material";
import { X, GripVertical, RotateCcw } from "lucide-react";
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

const AdvancedFilterDialog = ({ 
  open, 
  onClose, 
  filtersList = [], 
  criteriaOptions = {}, 
  onApply,
  currentAdvancedFilters = {},
  onClearAdvanced
}) => {
  const [filterValues, setFilterValues] = useState({});

  // Initialize filter values when dialog opens or current filters change
  useEffect(() => {
    if (open) {
      const initialValues = filtersList.reduce((acc, f) => {
        const currentValue = currentAdvancedFilters[f.key] || "";
        return { ...acc, [f.key]: currentValue };
      }, {});
      setFilterValues(initialValues);
    }
  }, [open, filtersList, currentAdvancedFilters]);

  const handleChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    // Filter out empty values
    const cleanedFilters = Object.entries(filterValues).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '' && 
          !(Array.isArray(value) && value.length === 0)) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    onApply(cleanedFilters);
    onClose();
  };

  const handleClear = () => {
    setFilterValues(filtersList.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {}));
    onClearAdvanced?.();
  };

  const hasActiveFilters = Object.values(filterValues).some(value => 
    value !== undefined && value !== null && value !== '' && 
    !(Array.isArray(value) && value.length === 0)
  );

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
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Configure advanced filters that are separate from the main filter bar. These filters will be displayed as chips below the action bar.
        </Typography>
        
        <Grid container spacing={2}>
          {filtersList.map((filter) => (
            <Grid item xs={12} sm={6} key={filter.key}>
              {filter.type === "text" ? (
                <input
                  type="text"
                  placeholder={filter.label}
                  value={filterValues[filter.key] || ''}
                  style={{ 
                    minWidth: 272, 
                    padding: "10px 12px", 
                    borderRadius: 8, 
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    fontFamily: "inherit"
                  }}
                  onChange={(e) => handleChange(filter.key, e.target.value)}
                />
              ) : (
                <FilterAutocomplete
                  label={filter.label}
                  options={filter.options || []}
                  value={filterValues[filter.key]}
                  minWidth={272}
                  onChange={(val) => handleChange(filter.key, val)}
                />
              )}
            </Grid>
          ))}
        </Grid>
        
        {hasActiveFilters && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
              {Object.values(filterValues).filter(v => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)).length} filter(s) will be applied
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          variant="outlined" 
          startIcon={<RotateCcw size={16} />}
          onClick={handleClear}
          disabled={!hasActiveFilters}
        >
          Clear All
        </Button>
        <Button 
          variant="contained" 
          onClick={handleApply}
          disabled={!hasActiveFilters}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedFilterDialog;
