import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  memo,
  lazy,
  Suspense,
} from "react";
import initialData from "../../../Data/pricePolicyData.json";
import { getPricePolicyColumns } from "./ColumnList";
import { Box, useMediaQuery } from "@mui/material";
import { useAdvancedFilters } from "../../../hooks/useAdvancedFilters";
import ConfirmationDialog from "../../../Common/ConfirmationDialog/ConfirmationDialog";
import CenteredCircularLoader from "../../../Common/Loder/CustomLoder";
import { usePricePolicyActions } from "../../../hooks/usePricePolicyActions";
import { usePricePolicyData } from "../../../hooks/usePricePolicyData";
import Header from "../../Customer/Grid/Header";
import LoadingOverlay from "../../../Components/CustomerForm/Grid/LoadingOverlay";
import toast from "react-hot-toast";
import PricePolicyFormDrawer from "../../../Components/PricePolicy/PricePolicyFormDrawer";

// Lazy imports
const CustomerDataGrid = lazy(() =>
  import("../../../Components/CustomerForm/Grid/CustomerGrid")
);
const ActionBar = lazy(() =>
  import("../../../Components/CustomerForm/Grid/Filter/ActionBar")
);

// menu items for customers
const pricePolicyMenuItems = [
  { label: "Update Price Policy", icon: "DollarSign", color: "#4caf50" },
  { label: "Update Customer Type", icon: "Users", color: "#2196f3" },
];

// Main filters for customers (displayed in action bar)
const pricePolicyMainFilterConfig = [
  { key: "status", label: "Status", type: "select", options: ["Active", "Deactive"] },
  { key: "manufacturer", label: "Manufacturer", type: "select", options: [{ id: 1, labelname: "Manufacturer 1" }, { id: 2, labelname: "Manufacturer 2" }] },
];

// Advanced filters for customers (displayed in advanced filter dialog)
const pricePolicyAdvancedFilterConfig = [
  { key: "brand", label: "Brand", type: "select", options: [{ id: 1, labelname: "Brand 1" }, { id: 2, labelname: "Brand 2" }] },
  { key: "productType", label: "Product Type", type: "text" },
];

function AdvancedPricePolicyGrid() {
  const { data: initialGridData } = useMemo(() => ({
    data: initialData,
  }), []);

  const [data, setData] = useState(initialGridData);
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const pageSizeOptions = useMemo(() => [20, 25, 50, 100], []);

  const {
    mainFilters,
    updateMainFilter,
    advancedFilters,
    applyAdvancedFilters,
    clearAdvancedFilters,
    debouncedFilters,
    clearFilter,
    getFilterChips,
    isFiltering,
    hasActiveFilters,
  } = useAdvancedFilters({}, 300);

  const memoizedUpdateMainFilter = useCallback((key, value) => {
    updateMainFilter(key, value);
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  }, [updateMainFilter]);

  const handleAdvancedFilterApply = useCallback((filterValues) => {
    applyAdvancedFilters(filterValues);
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  }, [applyAdvancedFilters]);

  const handleFilterRemove = useCallback((key) => {
    clearFilter(key);
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  }, [clearFilter]);

  const filterChips = useMemo(() => getFilterChips(), [getFilterChips]);

  const onDuplicateRow = useCallback((row) => {
    try {
      console.log('Duplicating row:', row);
      if (!data || data.length === 0) {
        toast.error('No data available to duplicate');
        return;
      }
      const currentRowIndex = data.findIndex(item => item.id === row.id);
      const maxId = Math.max(...data.map(item => item.id || 0));
      const duplicatedRow = {
        ...row,
        id: maxId + 1,
        srNo: row.srNo + 1,
      };
      console.log('New duplicated row:', duplicatedRow);
      console.log('Inserting at index:', currentRowIndex + 1);
      setData(prevData => {
        const newData = [...prevData];
        newData.splice(currentRowIndex + 1, 0, duplicatedRow);
        for (let i = currentRowIndex + 2; i < newData.length; i++) {
          newData[i] = {
            ...newData[i],
            srNo: newData[i].srNo + 1
          };
        }
        console.log('Updated data length:', newData.length);
        return newData;
      });
      setHighlightedRowId(maxId + 1);
      setTimeout(() => {
        setHighlightedRowId(null);
      }, 5000);
      toast.success(`Row duplicated successfully! New Sr.No: ${row.srNo + 1}`);
    } catch (error) {
      console.error('Error duplicating row:', error);
      toast.error('Failed to duplicate row');
    }
  }, [data]);

  const actions = usePricePolicyActions(data, setData, memoizedUpdateMainFilter);

  const {
    handleAdd,
    onDeleteUser,
    handleDelete,
    handleCloseDialog,
    onEditUser,
    onSearch,
    handleExcel,
    dialogState,
    selectedIds,
    selectedRowsData = [],
    setSelectedIds,
    drawerState,
    closeDrawer,
    savePricePolicy,
  } = actions;

  useEffect(() => {
    setData(initialGridData);
  }, [initialGridData]);

  const { filteredData } = usePricePolicyData(data, debouncedFilters, hasActiveFilters);

  const columns = useMemo(
    () => getPricePolicyColumns({
      handleDelete,
      onEditUser,
      onDuplicateRow,
      onEditChange: actions.onEditChange,
      onEditKeyDown: actions.onEditKeyDown,
    }),
    [handleDelete, onEditUser, onDuplicateRow, actions.onEditChange, actions.onEditKeyDown]
  );

  const isWide = useMediaQuery(`(min-width:1925px)`);

  return (
    <Box sx={{ width: "100%", height: "100vh", px: 2, bgcolor: "#fff" }}>
      <Header />
      <Box sx={{ mb: 2 }}>
        <Suspense fallback={<CenteredCircularLoader />}>
          <ActionBar
            showSummary={actions.showSummary}
            selectedIds={selectedIds}
            selectedRowsData={selectedRowsData}
            onAdd={handleAdd}
            onExcel={() => handleExcel(filteredData)}
            onSearch={onSearch}
            onSynchronize={actions.onSynchronize}
            onArchive={actions.onArchive}
            showSynchronize={false}
            showArchive={false}
            handleShowSummary={actions.handleShowSummary}
            filters={mainFilters}
            onFilterChange={memoizedUpdateMainFilter}
            menuItems={pricePolicyMenuItems}
            filterConfig={pricePolicyMainFilterConfig}
            advancedFilterConfig={pricePolicyAdvancedFilterConfig}
            advancedFilters={advancedFilters}
            onAdvancedFilterApply={handleAdvancedFilterApply}
            onAdvancedFilterClear={clearAdvancedFilters}
            onFilterRemove={handleFilterRemove}
            filterChips={filterChips}
            isFiltering={isFiltering}
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
            showSummary={false}
            isWide={isWide}
            onSelectionModelChange={setSelectedIds}
            highlightedRowId={highlightedRowId}
            getRowClassName={(params) => 
              params.row.id === highlightedRowId ? 'highlighted-row' : ''
            }
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
        content={`Are you sure you want to remove this price policy?`}
      />

      <PricePolicyFormDrawer
        open={drawerState.open}
        editData={drawerState.editData}
        onClose={closeDrawer}
        onSave={savePricePolicy}
      />
    </Box>
  );
}

export default memo(AdvancedPricePolicyGrid);
