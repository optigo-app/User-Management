import React, { useState } from "react";
import { Box, Button, IconButton, TextField, ToggleButton, ToggleButtonGroup, Tooltip, useTheme } from "@mui/material";
import {
  Plus,
  FileSpreadsheet,
  RefreshCw,
  Users,
  Search,
  Archive,
  UserPlus,
} from "lucide-react";
import "./ActionBar.scss";

const ActionBar = ({
  custActive,
  onAdd,
  onLead,
  onExcel,
  onSynchronize,
  onLeadList,
  onSearch,
  onArchive,
  onChangeCustStatus,
}) => {
  const theme = useTheme();

  return (
    <Box className="action-bar">
      {/* Left: Primary Actions */}
      <Box className="action-left">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
        >
          Add
        </Button>

        <Button
          variant="outlined"
          startIcon={<UserPlus size={18} />}
          onClick={onLead}
        >
          New Lead
        </Button>

        <Button
          variant="outlined"
          startIcon={<Users size={18} />}
          onClick={onLeadList}
        >
          Lead List
        </Button>
        {/* <ToggleButtonGroup
          value={custActive}
          exclusive
          size="small"
          onChange={onChangeCustStatus}
          sx={{
            ".Mui-selected": {
              background: theme.palette.primary.primaryGradient,
              color: "#fff",

            },
          }}
        >
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="inactive">Inactive</ToggleButton>
        </ToggleButtonGroup> */}
      </Box>

      {/* Right: Search + Icon buttons */}
      <Box className="action-right">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <Tooltip title="Export to Excel">
          <IconButton className="icon-btn excel" onClick={onExcel}>
            <FileSpreadsheet size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Synchronize">
          <IconButton className="icon-btn sync" onClick={onSynchronize}>
            <RefreshCw size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Archive">
          <IconButton className="icon-btn archive" onClick={onArchive}>
            <Archive size={20} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ActionBar;
