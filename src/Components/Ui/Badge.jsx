import React from "react";
import { X } from "lucide-react";

export const Badge = ({
  children,
  variant = "default",
  padding = "2px 8px",
  fontSize = "12px",
  backgroundColor,
  border,
  color,
  icon,
  iconPosition = "start",
  closeIcon = false,
  onClose,
}) => {
  const defaultBg = variant === "outline" ? "transparent" : "#f3f4f6";
  const defaultBorder = variant === "outline" ? "1px solid #e5e7eb" : "none";
  const defaultColor = "#6b7280";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding,
        fontSize,
        fontWeight: "500",
        borderRadius: "12px",
        backgroundColor: backgroundColor || defaultBg,
        color: color || defaultColor,
        border: border || defaultBorder,
      }}
    >
      {/* Start icon */}
      {icon && iconPosition === "start" && (
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      )}

      {children}

      {/* End icon */}
      {icon && iconPosition === "end" && (
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      )}

      {/* Close button */}
      {closeIcon && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "4px",
            cursor: "pointer",
            transition: "color 0.2s ease",
            color: color || defaultColor,
          }}
          onClick={onClose}
          onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = color || defaultColor)
          }
        >
          <X size={14} />
        </span>
      )}
    </span>
  );
};
