import React, { useState } from "react";
import { Box, Button, IconButton, ListItemIcon, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import {
  Plus,
  FileSpreadsheet,
  RefreshCw,
  Search,
  Archive,
  Maximize,
  Minimize,
  Filter,
  MoreVertical,
} from "lucide-react";
import * as Icons from "lucide-react";
import "./ActionBar.scss";
import FilterAutocomplete from "../../../../Common/FilterAutocomplete";
import AdvancedFilterDialog from "./AdvancedFilterDialog";
import ShortcutCustDataUpdate from "../Modal/ShortcutCustDataUpdate";

const menuItems = [
  { label: "Update Price Policy", icon: "DollarSign", color: "#4caf50" }, // green
  { label: "Update Customer Type", icon: "Users", color: "#2196f3" },      // blue
  { label: "Update Sales Rep", icon: "User", color: "#ff9800" },           // orange
  { label: "Update Adhoc", icon: "PlusSquare", color: "#9c27b0" },         // purple
  { label: "Customer Status", icon: "Info", color: "#f44336" },            // red
];

const ActionBar = ({
  custActive,
  showSummary,
  selectedRowsData,
  onAdd,
  onExcel,
  onSynchronize,
  onSearch,
  onArchive,
  onChangeCustStatus,
  handleShowSummary,
  showFilters,
  setShowFilters,
  filters,
  onFilterChange,
  onClearAll,
}) => {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openShortcutDialog, setOpenShortcutDialog] = useState(false);
  const [activeShortcutTab, setActiveShortcutTab] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (label) => {
    const index = menuItems.findIndex((item) => item.label === label);
    if (index >= 0) {
      setActiveShortcutTab(index);
      setOpenShortcutDialog(true);
    }
    handleClose();
  };


  const [filterOptions, setFilterOptions] = useState({
    ecatNames: [{
      id: 1,
      labelname: "Intelligent Frozen Chicken",
      displayorder: 1,
      isdelete: false,
      masterid: 2
    }, {
      id: 2,
      labelname: "Rustic Cotton Cheese",
      displayorder: 2,
      isdelete: false,
      masterid: 2
    }],
    users: [{
      id: 1,
      labelname: "Miss Timmy Murazik",
      displayorder: 1,
      isdelete: false,
      masterid: 2
    }, {
      id: 2,
      labelname: "Wesley Bradtke I",
      displayorder: 2,
      isdelete: false,
      masterid: 2
    }],
    notifications: [{
      id: 1,
      labelname: "Notification 1",
      displayorder: 1,
      isdelete: false,
      masterid: 2
    }, {
      id: 2,
      labelname: "Notification 2",
      displayorder: 2,
      isdelete: false,
      masterid: 2
    }],
  });

  return (
    <Box className="action-bar">
      <Box className="action-left">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={18} />}
          onClick={onAdd}
        >
          Add
        </Button>

        <Box className="cust_toogleBtn">
          <ToggleButtonGroup
            value={custActive}
            exclusive
            size="small"
            onChange={onChangeCustStatus}
            className="toggle-group"
          >
            <ToggleButton className="toggle-button" value="customer">Customer</ToggleButton>
            <ToggleButton className="toggle-button" value="lead">Lead</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box className="additional-filters">
          <FilterAutocomplete
            label="Status"
            options={["Active", "Deactive"]}
            value={filters?.status}
            minWidth={150}
            onChange={(val) => onFilterChange("status", val)}
          />
          <FilterAutocomplete
            label="Ecat Name"
            options={filterOptions?.ecatNames}
            value={filters?.ecatName}
            onChange={(val) => onFilterChange("ecatName", val)}
          />
          <FilterAutocomplete
            label="Users"
            options={filterOptions?.users}
            value={filters?.users}
            onChange={(val) => onFilterChange("users", val)}
          />
          <FilterAutocomplete
            label="Notifications"
            options={filterOptions?.notifications}
            value={filters?.notification}
            onChange={(val) => onFilterChange("notification", val)}
          />
          {selectedRowsData?.length > 0 && (
            <Button
              variant="contained"
              endIcon={<MoreVertical size={20} />}
              onClick={handleClick}
            >
              Actions
            </Button>
          )}
          <Tooltip title="More Filters">
            <IconButton onClick={() => setOpenFilterDrawer(!openFilterDrawer)}>

              <Filter size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

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

        <Tooltip title={showSummary ? "Hide Summary" : "Show Summary"} placement="top">
          <IconButton className="icon-btn expand" onClick={handleShowSummary}>
            {showSummary ? <Minimize size={20} /> : <Maximize size={20} />}
          </IconButton>
        </Tooltip>
      </Box>
      <AdvancedFilterDialog
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems?.map(({ label, icon, color }) => {
          const IconComponent = Icons[icon];
          return (
            <MenuItem key={label} onClick={() => handleMenuItemClick(label)}>
              <ListItemIcon sx={{ minWidth: '24px !important' }}>
                <IconComponent size={18} color={color} />
              </ListItemIcon>
              <Typography variant="body2">{label}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
      <ShortcutCustDataUpdate
        open={openShortcutDialog}
        onClose={() => setOpenShortcutDialog(false)}
        initialActiveTab={activeShortcutTab}
        onApply={(activeTabLabel, activeTabData) => {
          console.log("Active Tab:", activeTabLabel);
          console.log("Data to send:", activeTabData);
          setOpenShortcutDialog(false);
        }}
      />

    </Box>
  );
};

export default ActionBar;
