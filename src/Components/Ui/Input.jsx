import React from "react";

export const Input = ({ placeholder, type = "text", value, onChange, style, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
      transition: "all 0.2s",
      ...style
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#7367f0";
      e.target.style.boxShadow = "0 0 0 3px rgba(115, 103, 240, 0.1)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#e5e7eb";
      e.target.style.boxShadow = "none";
    }}
    {...props}
  />
);
