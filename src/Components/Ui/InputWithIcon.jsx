import React from "react";
import { Input } from "./Input";

export const InputWithIcon = ({ icon: Icon, ...props }) => (
  <div style={{ position: "relative" }}>
    {Icon && (
      <Icon
        size={16}
        color="#9ca3af"
        style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
      />
    )}
    <Input {...props} style={{ paddingLeft: "40px", ...props.style }} />
  </div>
);
