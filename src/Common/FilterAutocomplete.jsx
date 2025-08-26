import React from "react";
import { Autocomplete, TextField, Popper } from "@mui/material";

const CustomPopper = (props) => (
    <Popper
        {...props}
        sx={{
            "& .MuiPaper-root": {
                fontSize: 14,
            },
            "& .MuiAutocomplete-option": {
                fontSize: 14,
                padding: "6px 12px",
            },
        }}
    />
);

const FilterAutocomplete = ({
    label,
    options = [],
    value,
    onChange,
    multiple = false,
    minWidth = 220,
}) => {
    return (
        <Autocomplete
            multiple={multiple}
            options={options}
            value={value ?? ""}
            onChange={(event, newValue) => onChange(newValue)}
            size="small"
            getOptionLabel={(option) =>
                typeof option === "string" ? option : option?.labelname || ""
            }
            isOptionEqualToValue={(option, val) =>
                typeof option === "string" ? option === val : option?.id === val?.id
            }
            PopperComponent={CustomPopper}
            sx={{
                minWidth: minWidth,
                "& .MuiInputBase-input": { fontSize: 14 },
                "& .MuiInputLabel-root": { fontSize: 14 },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={label}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        style: { fontSize: 14 },
                    }}
                    InputLabelProps={{
                        style: { fontSize: 14 },
                    }}
                />
            )}
        />
    );
};

export default FilterAutocomplete;
