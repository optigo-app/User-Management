import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  lazy,
  Suspense,
} from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useAdvancedFilters } from "../../../hooks/useAdvancedFilters";
import ConfirmationDialog from "../../../Common/ConfirmationDialog/ConfirmationDialog";
import CenteredCircularLoader from "../../../Common/Loder/CustomLoder";
import { useBusinessActions } from "../../../hooks/useBusinessActions";
import { useBusinessData } from "../../../hooks/useBusinessData";
import Header from "../../../Pages/Customer/Grid/Header";
import PurityRatioModal from "../../CustomerForm/Grid/Modal/PurityRatioModal";
import BrandsModal from "../../ManufactureForm/Modal/BrandsModal";
import CustomerSummaryConfig from "../../CustomerForm/Grid/Summary/CustomerSummaryConfig";
import LoadingOverlay from "../../CustomerForm/Grid/LoadingOverlay";

// Lazy imports
const CustomerDataGrid = lazy(() =>
  import("../../CustomerForm/Grid/CustomerGrid")
);
const ActionBar = lazy(() =>
  import("../../CustomerForm/Grid/Filter/ActionBar")
);

function BusinessGrid({
  businessType, // "supplier" or "manufacturer"
  initialData,
  getColumnsFunction,
  menuItems,
  mainFilterConfig,
  advancedFilterConfig,
  registerRoute,
  confirmationMessages = {}
}) {
  const [data, setData] = useState(initialData);
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

  const actions = useBusinessActions(data, setData, memoizedUpdateMainFilter, businessType, registerRoute);

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

  const { filteredData, summaryData } = useBusinessData(data, debouncedFilters, hasActiveFilters, businessType);

  const columns = useMemo(
    () => getColumnsFunction({
      onToggleLogin,
      onToggleActive,
      onToggleRoaming,
      onToggleMelt,
      handleDelete,
      onEditSupplier: onEditUser,
      onEditManufacturer: onEditUser,
      onPolicyRatio: onPurityRatio,
      onBrandsModal: onBrandManagement,
    }),
    [onToggleLogin, onToggleActive, onToggleRoaming, onToggleMelt, handleDelete, onEditUser, onPurityRatio, onBrandManagement]
  );

  const isWide = useMediaQuery(`(min-width:1925px)`);

  // Default confirmation messages
  const defaultMessages = {
    delete: `Are you sure you want to remove this ${businessType}?`,
    archive: `Are you sure you want to Archive this ${businessType}?`,
    synchronize: `Are you sure you want to Synchronize All ${businessType}s?`
  };

  const messages = { ...defaultMessages, ...confirmationMessages };

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
            custActive={businessType}
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
            menuItems={menuItems}
            filterConfig={mainFilterConfig}
            // Advanced filter props
            advancedFilterConfig={advancedFilterConfig}
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
        content={messages.delete}
      />

      <ConfirmationDialog
        open={dialogArchiveState.open}
        onClose={handleCloseArchiveDialog}
        onConfirm={() => { }}
        title="Confirm"
        cancelLabel="Cancel"
        confirmLabel="Archive"
        content={messages.archive}
      />

      <ConfirmationDialog
        open={dialogAllSynchroze.open}
        onClose={handleCloseSynchronize}
        onConfirm={() => { }}
        title="Confirm"
        cancelLabel="Cancel"
        confirmLabel="Synchronize"
        content={messages.synchronize}
      />

      <PurityRatioModal
        open={dialogPurityState?.open}
        onClose={() =>
          setDialogPurityState({ open: false, selectedRow: {} })
        }
      />

      {businessType === "manufacturer" && (
        <BrandsModal
          open={dialogBrandsState?.open}
          onClose={() =>
            setDialogBrandsState({ open: false, selectedRow: {} })
          }
        />
      )}
    </Box>
  );
}

export default memo(BusinessGrid);
