import React from "react";
import { TextField } from "@mui/material";

const CustomInput = ({
    placeholder,
    type = "text",
    value,
    onChange,
    onBlur,
    error = false,
    helperText = "",
    fullWidth = true,
    size = "small",
    ...props
}) => {
    return (
        <TextField
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            size={size}
            {...props}
            sx={{
                "& .MuiOutlinedInput-root": {
                    height: 45,
                    fontSize: 14,
                    borderRadius: "8px",
                    "&.Mui-focused": {
                        borderColor: error ? "#f44336" : "#7367f0",
                        boxShadow: error
                            ? "0 0 0 3px rgba(244, 67, 54, 0.1)"
                            : "0 0 0 3px rgba(115, 103, 240, 0.1)",
                    },
                },
                "& .MuiFormHelperText-root": {
                    fontSize: 12,
                    color: error ? "#f44336" : "#6b7280",
                },
            }}
        />
    );
};

export default CustomInput;
