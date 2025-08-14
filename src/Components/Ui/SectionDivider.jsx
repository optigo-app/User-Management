import React from "react";

export const SectionDivider = ({ icon: Icon, title }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingBottom: "8px",
    borderBottom: "1px solid #f3f4f6",
    marginBottom: "16px"
  }}>
    {Icon && <Icon size={20} color="#7367f0" />}
    <h4 style={{
      fontSize: "18px",
      fontWeight: "600",
      color: "#1f2937",
      margin: 0
    }}>
      {title}
    </h4>
  </div>
);
