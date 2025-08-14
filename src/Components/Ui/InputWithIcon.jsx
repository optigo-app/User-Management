import React from "react";
import { Input } from "./Input";

export const InputWithIcon = ({ icon: Icon, helperText = "", error = false, ...props }) => (
  <div style={{ width: "100%" }}>
    <div style={{ position: "relative" }}>
      {Icon && (
        <Icon
          size={16}
          color={error ? "#f44336" : "#9ca3af"}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none"
          }}
        />
      )}
      <Input
        {...props}
        error={error}
        style={{ paddingLeft: Icon ? "40px" : undefined, ...props.style }}
      />
    </div>
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
