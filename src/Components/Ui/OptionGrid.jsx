import React from "react";
import { Grid, Paper, Checkbox, FormControlLabel, Typography } from "@mui/material";

export const OptionGrid = ({
  options = [],
  selected = [],
  onChange,
  size = { xs: 6, md: 3 }
}) => {
  return (
    <Grid container spacing={2}>
      {options.map((option) => {
        const isChecked = selected.includes(option.id);

        return (
          <Grid item key={option.id} size={size}>

            <Paper
              variant="outlined"
              sx={{
                pl: 2,
                py: .5,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { bgcolor: "action.hover" },
              }}
              onClick={() => onChange(option.id, !isChecked)}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => onChange(option.id, e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" fontWeight="500">
                    {option.icon} {option.label}
                  </Typography>
                }
              />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};
