import React, { memo, useState } from "react";
import "./ActionBar.scss";
import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { Plus, Search, FileSpreadsheet, RefreshCw, Archive, Maximize, Minimize, Filter, IdCard } from "lucide-react";
import { useLocation } from "react-router-dom";
import ActionMenu from "./ActionMenu";
import AdvancedFilterDialog from "./AdvancedFilterDialog";
import FilterAutocomplete from "../../../../Common/FilterAutocomplete";
import ShortcutCustDataUpdate from "../Modal/ShortcutCustDataUpdate";

const customerTabconfig = [
  {
    label: "Update Price Policy",
    fields: [
      { name: "Diamond Price", type: "text" },
      { name: "ColorStone/misc/service Price", type: "text" },
      { name: "Labour Price", type: "text" },
      { name: "Setting/Secondary Metal Price", type: "text" },
      { name: "Payment Due Days", type: "date" },
      { name: "Policy Due Date", type: "date" },
      { name: "Discount", type: "text" },
      { name: "Web Discount", type: "text" },
    ],
  },
  {
    label: "Update Customer Type",
    fields: [
      { name: "Customer Type", type: "select", options: [{ id: 1, labelname: "Retail" }, { id: 2, labelname: "Wholesale" }] },
    ],
  },
  {
    label: "Update Sales Rep",
    fields: [
      { name: "Reference By", type: "text" },
      { name: "Reference User Code", type: "text" },
    ],
  },
  {
    label: "Update Adhoc",
    fields: [
      { name: "Adhoc Package", type: "select", options: [{ id: 1, labelname: "Package A" }, { id: 2, labelname: "Package B" }] },
    ],
  },
  {
    label: "Update Status",
    fields: [
      { name: "Customer Status", type: "select", options: ["Active", "Inactive"] },
    ],
  },
]

const employerTabConfig = [
  {
    label: "Update Designation",
    fields: [
      { name: "Designation", type: "select", options: [{ id: 1, labelname: "Manager" }, { id: 2, labelname: "Lead" }] },
    ],
  },
  {
    label: "Update Department",
    fields: [
      { name: "Department", type: "select", options: [{ id: 1, labelname: "HR" }, { id: 2, labelname: "IT" }] },
    ],
  },
  {
    label: "Update Status",
    fields: [
      { name: "Status", type: "select", options: ["Active", "Inactive"] },
    ],
  },
]

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
  filters,
  onFilterChange,
  menuItems = [],
  filterConfig = [],
}) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openShortcutDialog, setOpenShortcutDialog] = useState(false);
  const [activeShortcutTab, setActiveShortcutTab] = useState(0);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuItemClick = (label) => {
    const index = menuItems.findIndex((item) => item.label === label);
    if (index >= 0) {
      setActiveShortcutTab(index);
      setOpenShortcutDialog(true);
    }
    handleMenuClose();
  };

  const shortCuttabConfig = location.pathname === "/customers" ? customerTabconfig : employerTabConfig;

  return (
    <Box className="action-bar">
      <Box className="action-left">
        <Button variant="contained" color="primary" startIcon={<Plus size={18} />} onClick={onAdd}>
          Add
        </Button>

        {location.pathname === "/customers" && (
          <Box className="cust_toogleBtn">
            <ToggleButtonGroup className="toggle-group" value={custActive} exclusive size="small" onChange={onChangeCustStatus}>
              <ToggleButton className="toggle-button" value="customer">Customer</ToggleButton>
              <ToggleButton className="toggle-button" value="lead">Lead</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        {location.pathname === "/employer" && (
          <Button
            variant="outlined"
            startIcon={<IdCard size={20} />}
            size="medium"
          >
            ID Card
          </Button>
        )}

        <Box className="additional-filters">
          {filterConfig.map((filter) =>
            filter.type === "text" ? (
              <div className="location-box" key={filter.label}>
                <input
                  type="text"
                  placeholder={filter.label}
                  onChange={(e) => onFilterChange(filter.key, e.target.value)}
                />
              </div>
            ) : (
              <FilterAutocomplete
                key={filter.label}
                label={filter.label}
                options={filter.options}
                value={filters?.[filter.key]}
                minWidth={filter.minWidth || 200}
                onChange={(val) => onFilterChange(filter.key, val)}
              />
            )
          )}

          {selectedRowsData?.length > 0 && menuItems.length > 0 && (
            <Button variant="contained" endIcon={<Plus size={20} />} onClick={handleMenuClick}>
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
          <input type="text" placeholder="Search..." onChange={(e) => onSearch?.(e.target.value)} />
        </div>

        <Tooltip title="Export to Excel">
          <IconButton onClick={onExcel} className="icon-btn excel">
            <FileSpreadsheet size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Synchronize">
          <IconButton onClick={onSynchronize} className="icon-btn sync">
            <RefreshCw size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Archive">
          <IconButton onClick={onArchive} className="icon-btn archive">
            <Archive size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title={showSummary ? "Hide Summary" : "Show Summary"}>
          <IconButton onClick={handleShowSummary}>
            {showSummary ? <Minimize size={20} /> : <Maximize size={20} />}
          </IconButton>
        </Tooltip>
      </Box>

      <AdvancedFilterDialog
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        filtersList={filterConfig}
        criteriaOptions={filterConfig.reduce((acc, f) => ({ ...acc, [f.label]: f.options }), {})}
        onApply={(values) => console.log("Filters applied:", values)}
      />

      <ActionMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} menuItems={menuItems} onItemClick={handleMenuItemClick} />

      <ShortcutCustDataUpdate
        open={openShortcutDialog}
        onClose={() => setOpenShortcutDialog(false)}
        initialActiveTab={activeShortcutTab}
        onApply={(tabLabel, data) => console.log(tabLabel, data)}
        tabsConfig={shortCuttabConfig}
      />


    </Box>
  );
};

export default memo(ActionBar);
