import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  memo,
  lazy,
  Suspense,
} from "react";
import initialManufactureData from "../../../Data/manufacture.json";
import { getManufacturerColumns } from "./Manufacturelist";
import { Box, useMediaQuery } from "@mui/material";
import { useAdvancedFilters } from "../../../hooks/useAdvancedFilters";
import ConfirmationDialog from "../../../Common/ConfirmationDialog/ConfirmationDialog";
import CenteredCircularLoader from "../../../Common/Loder/CustomLoder";
import { useManufactureActions } from "../../../hooks/useManufactureActions";
import { useManufactureData } from "../../../hooks/useManufactureData";
import { useLocation } from "react-router-dom";
import Header from "../../Customer/Grid/Header";
import PurityRatioModal from "../../../Components/CustomerForm/Grid/Modal/PurityRatioModal";
import BrandsModal from "../../../Components/ManufactureForm/Modal/BrandsModal";
import CustomerSummaryConfig from "../../../Components/CustomerForm/Grid/Summary/CustomerSummaryConfig";
import LoadingOverlay from "../../../Components/CustomerForm/Grid/LoadingOverlay";

// Lazy imports
const CustomerDataGrid = lazy(() =>
  import("../../../Components/CustomerForm/Grid/CustomerGrid")
);
const ActionBar = lazy(() =>
  import("../../../Components/CustomerForm/Grid/Filter/ActionBar")
);

// menu items for manufacturers
const manufactureMenuItems = [
  { label: "Update Purity Ratio", icon: "Percent", color: "#4caf50" },
  { label: "Update Brand", icon: "Tag", color: "#2196f3" },
  { label: "Update Status", icon: "Info", color: "#f44336" },
  { label: "Update Permissions", icon: "Shield", color: "#ff9800" },
];

// Main filters for manufacturers (displayed in action bar)
const manufactureMainFilterConfig = [
  { key: "active", label: "Status", type: "select", options: ["Active", "Inactive"] },
  { key: "roaming", label: "Roaming", type: "select", options: ["Enabled", "Disabled"] },
  { key: "notification", label: "Notifications", type: "select", options: [{ id: 1, labelname: "Notification 1" }, { id: 2, labelname: "Notification 2" }] },
];

// Advanced filters for manufacturers (displayed in advanced filter dialog)
const manufactureAdvancedFilterConfig = [
  { key: "melt", label: "Melt", type: "select", options: ["Enabled", "Disabled"] },
  { key: "login", label: "Login", type: "select", options: ["Enabled", "Disabled"] },
  { key: "purityRatio", label: "Purity Ratio", type: "text" },
  { key: "brand", label: "Brand", type: "text" },
  { key: "createdDate", label: "Created Date", type: "text" },
];

function ManufactureGrid() {
  const { manufactureData } = useMemo(() => ({
    manufactureData: initialManufactureData,
  }), []);

  const [data, setData] = useState(manufactureData);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const pageSizeOptions = useMemo(() => [20, 25, 50, 100], []);

  const {
    // Main filters
    mainFilters,
    updateMainFilter,
    clearMainFilters,
    hasMainFilters,
    
    // Advanced filters
    advancedFilters,
    applyAdvancedFilters,
    clearAdvancedFilters,
    hasAdvancedFilters,
    
    // Combined filters
    allFilters,
    debouncedFilters,
    clearAllFilters,
    
    // Individual filter management
    clearFilter,
    
    // Filter chips
    getFilterChips,
    
    // Status
    isFiltering,
    hasActiveFilters,
  } = useAdvancedFilters({}, 300);

  const memoizedUpdateMainFilter = useCallback((key, value) => {
    updateMainFilter(key, value);
    setPaginationModel(prev => ({
      ...prev,
      page: 0
    }));
  }, [updateMainFilter]);

  const handleAdvancedFilterApply = useCallback((filterValues) => {
    applyAdvancedFilters(filterValues);
    setPaginationModel(prev => ({
      ...prev,
      page: 0
    }));
  }, [applyAdvancedFilters]);

  const handleFilterRemove = useCallback((key) => {
    clearFilter(key);
    setPaginationModel(prev => ({
      ...prev,
      page: 0
    }));
  }, [clearFilter]);

  const filterChips = useMemo(() => getFilterChips(), [getFilterChips]);

  const actions = useManufactureActions(data, setData, memoizedUpdateMainFilter);

  const {
    handleAdd,
    onToggleLogin,
    onToggleActive,
    onToggleRoaming,
    onToggleMelt,
    onDeleteUser,
    handleDelete,
    handleCloseDialog,
    onEditUser,
    onSearch,
    handleShowSummary,
    handleExcel,
    handleArchive,
    handleSynchronize,
    custActive,
    showSummary,
    dialogState,
    selectedIds,
    selectedRowsData = [],
    dialogArchiveState,
    dialogAllSynchroze,
    handleCloseArchiveDialog,
    handleCloseSynchronize,
    onChangeCustStatus,
    setSelectedIds,
    handleViewDocument,
    onPurityRatio,
    onBrandManagement,
    dialogPurityState,
    setDialogPurityState,
    dialogBrandsState,
    setDialogBrandsState,
  } = actions;

  const { filteredData, summaryData } = useManufactureData(data, debouncedFilters, hasActiveFilters);

  const columns = useMemo(
    () => getManufacturerColumns({
      onToggleLogin,
      onToggleActive,
      onToggleRoaming,
      onToggleMelt,
      handleDelete,
      onEditManufacturer: onEditUser,
      onPolicyRatio: onPurityRatio,
      onBrandsModal: onBrandManagement,
    }),
    [onToggleLogin, onToggleActive, onToggleRoaming, onToggleMelt, handleDelete, onEditUser, onPurityRatio, onBrandManagement]
  );

  const isWide = useMediaQuery(`(min-width:1950px)`);

  return (
    <Box sx={{ width: "100%", height: "100vh", px: 2, bgcolor: "#fff" }}>
      <Header />
      <CustomerSummaryConfig
        showSummary={showSummary}
        custActive={custActive}
        summaryData={summaryData}
      />
      <Box sx={{ mb: 2 }}>
        <Suspense fallback={<CenteredCircularLoader />}>
          <ActionBar
            custActive="manufacture"
            showSummary={false}
            selectedIds={selectedIds}
            selectedRowsData={selectedRowsData}
            onAdd={handleAdd}
            onExcel={() => handleExcel(filteredData)}
            onSearch={onSearch}
            onArchive={handleArchive}
            onSynchronize={handleSynchronize}
            onChangeCustStatus={onChangeCustStatus}
            handleShowSummary={handleShowSummary}
            filters={mainFilters}
            onFilterChange={memoizedUpdateMainFilter}
            menuItems={manufactureMenuItems}
            filterConfig={manufactureMainFilterConfig}
            // Advanced filter props
            advancedFilterConfig={manufactureAdvancedFilterConfig}
            advancedFilters={advancedFilters}
            onAdvancedFilterApply={handleAdvancedFilterApply}
            onAdvancedFilterClear={clearAdvancedFilters}
            onFilterRemove={handleFilterRemove}
            filterChips={filterChips}
          />
        </Suspense>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Suspense fallback={<CenteredCircularLoader />}>
          <CustomerDataGrid
            deliveryData={filteredData}
            columns={columns}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            pageSizeOptions={pageSizeOptions}
            loading={false}
            showSummary={showSummary}
            isWide={isWide}
            onSelectionModelChange={setSelectedIds}
          />
        </Suspense>
        <LoadingOverlay 
          isVisible={isFiltering} 
          message="Applying filters..." 
        />
      </Box>

      <ConfirmationDialog
        open={dialogState.open}
        onClose={handleCloseDialog}
        onConfirm={onDeleteUser}
        title="Confirm"
        content="Are you sure you want to remove this manufacturer?"
      />

      <ConfirmationDialog
        open={dialogArchiveState.open}
        onClose={handleCloseArchiveDialog}
        onConfirm={() => { }}
        title="Confirm"
        cancelLabel="Cancel"
        confirmLabel="Archive"
        content="Are you sure you want to Archive this manufacturer?"
      />

      <ConfirmationDialog
        open={dialogAllSynchroze.open}
        onClose={handleCloseSynchronize}
        onConfirm={() => { }}
        title="Confirm"
        cancelLabel="Cancel"
        confirmLabel="Synchronize"
        content="Are you sure you want to Synchronize All customer?"
      />

      <PurityRatioModal
        open={dialogPurityState?.open}
        onClose={() =>
          setDialogPurityState({ open: false, selectedRow: {} })
        }
      />

      <BrandsModal
        open={dialogBrandsState?.open}
        onClose={() =>
          setDialogBrandsState({ open: false, selectedRow: {} })
        }
      />
    </Box>
  );
}

export default memo(ManufactureGrid);
