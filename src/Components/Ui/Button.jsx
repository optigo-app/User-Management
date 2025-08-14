import React from "react";

export const Button = ({ children, variant = "primary", size = "md", onClick, disabled, style, ...props }) => {
  const variants = {
    primary: { backgroundColor: "#7367f0", color: "white", border: "1px solid #7367f0" },
    outline: { backgroundColor: "transparent", color: "#6b7280", border: "1px solid #e5e7eb" }
  };

  const sizes = {
    sm: { padding: "8px 12px", fontSize: "12px" },
    md: { padding: "10px 16px", fontSize: "14px" }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: "500",
        opacity: disabled ? 0.5 : 1,
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === "outline") {
            e.target.style.backgroundColor = "#7367f0";
            e.target.style.borderColor = "#7367f0";
            e.target.style.color = "white";
          } else {
            e.target.style.backgroundColor = "#5b52d9";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (variant === "outline") {
            e.target.style.backgroundColor = "transparent";
            e.target.style.borderColor = "#e5e7eb";
            e.target.style.color = "#6b7280";
          } else {
            e.target.style.backgroundColor = "#7367f0";
          }
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
