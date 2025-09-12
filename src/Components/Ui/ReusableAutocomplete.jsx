import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({
    label = "Select",
    placeholder = "Select data...",
    options = [],
    value,
    onChange,
    multiple = false,
    disabled = false,
    freeSolo = false,
    size = "small",
    height = 45,
    minWidth = 120,
    fullWidth = true,
    getOptionLabel = (option) => option.label || option,
    renderOption,
    error,
    helperText,
    ...props
}) => {
    return (
        <Autocomplete
            multiple={multiple}
            options={options}
            value={value}
            onChange={onChange}
            freeSolo={freeSolo}
            disabled={disabled}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={renderOption}
            fullWidth={fullWidth}
            size={size}
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    height: height,
                    minWidth: minWidth
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                />
            )}
        />
    );
};

export default CustomAutocomplete;
