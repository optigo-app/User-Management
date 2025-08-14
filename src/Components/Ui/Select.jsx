import React from "react";

export const Select = ({ options = [], placeholder, value, onChange, style }) => (
  <select
    value={value}
    onChange={onChange}
    aria-label={placeholder}
    style={{
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "white",
      cursor: "pointer",
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
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((opt, idx) => (
      <option key={idx} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);
