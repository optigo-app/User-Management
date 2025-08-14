import React, { useState } from "react";

export const FormField = ({ label, required, tooltip, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <label style={{
          fontSize: "14px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          {label}
          {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>

        {tooltip && (
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#6b7280",
              color: "white",
              fontSize: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              cursor: "help"
            }}>
              ?
            </div>
            {showTooltip && (
              <div style={{
                position: "absolute",
                top: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#1f2937",
                color: "white",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                whiteSpace: "nowrap",
                zIndex: 1000,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                {tooltip}
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #1f2937"
                }}></div>
              </div>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
