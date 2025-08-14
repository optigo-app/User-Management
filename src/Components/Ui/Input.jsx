import React from "react";

export const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
  style,
  error = false,
  helperText = "",
  ...props
}) => (
  <div style={{ width: "100%" }}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px 16px",
        border: `1px solid ${error ? "#f44336" : "#e5e7eb"}`,
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
        transition: "all 0.2s",
        ...style
      }}
      onFocus={(e) => {
        e.target.style.borderColor = error ? "#f44336" : "#7367f0";
        e.target.style.boxShadow = error
          ? "0 0 0 3px rgba(244, 67, 54, 0.1)"
          : "0 0 0 3px rgba(115, 103, 240, 0.1)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = error ? "#f44336" : "#e5e7eb";
        e.target.style.boxShadow = "none";
      }}
      {...props}
    />
    {helperText && (
      <div
        style={{
          fontSize: "12px",
          marginTop: "4px",
          color: error ? "#f44336" : "#6b7280"
        }}
      >
        {helperText}
      </div>
    )}
  </div>
);
