import React from "react";
import { TextField } from "@mui/material";

export const CustomTextArea = ({
  placeholder,
  rows = 3,
  value,
  onChange,
  style,
  ...props
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      multiline
      rows={rows}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          fontSize: "14px",
          fontFamily: "inherit",
          transition: "all 0.2s",
          "& fieldset": {
            borderColor: "#e5e7eb",
          },
          "&:hover fieldset": {
            borderColor: "#a0a0a0",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#7367f0",
            boxShadow: "0 0 0 3px rgba(115, 103, 240, 0.1)",
          },
        },
        ...style,
      }}
      {...props}
    />
  );
};
