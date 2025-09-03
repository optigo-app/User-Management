import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";

const CustomDatePicker = ({
    value,
    onChange,
    placeholder = "Select date",
    maxDate,
    minDate,
    disabled = false,
    error = false,
    helperText = "",
    fullWidth = true,
    size = "small",
    ...props
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={value}
                onChange={onChange}
                maxDate={maxDate}
                minDate={minDate}
                disabled={disabled}
                slotProps={{
                    textField: {
                        placeholder,
                        error,
                        helperText,
                        fullWidth,
                        size,
                        sx: {
                            "& .MuiOutlinedInput-root": {
                                height: 45,
                                fontSize: 14,
                                borderRadius: "8px",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: error ? "#f44336" : "#7367f0",
                                },
                                "&.Mui-focused": {
                                    boxShadow: error
                                        ? "0 0 0 3px rgba(244, 67, 54, 0.1)"
                                        : "0 0 0 3px rgba(115, 103, 240, 0.1)",
                                },
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: 12,
                                color: error ? "#f44336" : "#6b7280",
                            },
                            "& .MuiPickersSectionList-root": {
                                padding: "12.5px 0",
                                fontSize: 14,
                            }
                        },
                    },
                }}
                {...props}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
