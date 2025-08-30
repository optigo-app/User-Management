// ActionMenu.jsx
import React from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import * as Icons from "lucide-react";

const ActionMenu = ({ anchorEl, open, onClose, menuItems, onItemClick }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {menuItems?.map(({ label, icon, color }) => {
        const IconComponent = Icons[icon];
        return (
          <MenuItem key={label} onClick={() => onItemClick(label)}>
            <ListItemIcon sx={{ minWidth: '24px !important' }}>
              <IconComponent size={18} color={color} />
            </ListItemIcon>
            <Typography variant="body2">{label}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default ActionMenu;
