import React, {
  useState,
  useMemo,
  useEffect,
  memo,
  lazy,
  Suspense,
} from "react";
import initialData from "../../../Data/empData.json";
import initialLeadData from "../../../Data/leadData.json";
import { getCustomerColumns } from "./ColumnList";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDebounceFilters } from "../../../hooks/useDebounceFilters";
import ConfirmationDialog from "../../../Common/ConfirmationDialog/ConfirmationDialog";
import PurityRatioModal from "../../../Components/CustomerForm/Grid/Modal/PurityRatioModal";
import CenteredCircularLoader from "../../../Common/Loder/CustomLoder";
import { useCustomerActions } from "../../../hooks/useCustomerActions";
import { useCustomerAndLeadData } from "../../../hooks/useCustomerData";
import { getLeadColumns } from "./LeadList";
import LeadFromDrawer from "../../../Components/CustomerForm/Lead/LeadFromDrawer";
import CustomerSummaryConfig from "../../../Components/CustomerForm/Grid/Summary/CustomerSummaryConfig";
import Header from "./Header";

// Lazy imports
const CustomerDataGrid = lazy(() =>
  import("../../../Components/CustomerForm/Grid/CustomerGrid")
);
const FilterBar = lazy(() => import("../../../Components/Ui/FilterBar"));
const ActionBar = lazy(() =>
  import("../../../Components/CustomerForm/Grid/Filter/ActionBar")
);

const filtersConfig = [{ key: "customerName", label: "Customer Name", type: "text", alwaysVisible: true }, { key: "company", label: "Company", type: "text", alwaysVisible: true }, { key: "countryCode", label: "Country", type: "select", options: [{ value: "KY", label: "Cayman Islands" }, { value: "US", label: "United States" },], alwaysVisible: true, }, { key: "policy", label: "Policy", type: "text", alwaysVisible: true }, { key: "state", label: "State", type: "text", alwaysVisible: true }, { key: "city", label: "City", type: "text", alwaysVisible: true },];

function CustomerGrid() {
  const custData = useMemo(() => initialData, []);
  const leadData = useMemo(() => initialLeadData, []);
  const [data, setData] = useState(custData);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const pageSizeOptions = [20, 25, 50, 100];
  const {
    filters,
    debouncedFilters,
    updateFilter,
    clearAllFilters,
    isFiltering,
    hasActiveFilters,
  } = useDebounceFilters({}, 100);
  console.log('filters: ', filters);

  const {
    handleAdd,
    onToggleLogin,
    onToggleActive,
    onDeleteUser,
    handleDelete,
    handleCloseDialog,
    onEditUser,
    onPolicyRatio,
    onSynchronize,
    handleSynchronize,
    handleCloseSynchronize,
    onPolicyApply,
    onSearch,
    handleShowSummary,
    handleExcel,
    handleArchive,
    showSummary,
    dialogState,
    dialogPurityState,
    custActive,
    drawerleadOpen,
    selectedRowsData,
    handleCloseLeadDrawer,
    setDialogPurityState,
    dialogAllSynchroze,
    dialogSynchronizeState,
    dialogArchiveState,
    setDialogSynchronizeState,
    handleCloseArchiveDialog,
    onChangeCustStatus,
    handleMakeLeadToCustomer,
    setSelectedRowsData,
  } = useCustomerActions(setData, updateFilter);

  useEffect(() => {
    if (custActive === "customer") {
      setData(custData);
    }
    if (custActive === "lead") {
      setData(leadData);
    }
  }, [custActive]);


  const { filteredData, summaryData } =
    useCustomerAndLeadData(data, debouncedFilters, hasActiveFilters, custActive);

  useEffect(() => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, [debouncedFilters]);

  const columns = useMemo(
    () =>
      getCustomerColumns({
        onToggleLogin,
        onToggleActive,
        handleDelete,
        onEditUser,
        onPolicyRatio,
        onSynchronize,
        onPolicyApply,
      }),
    [onToggleLogin, onToggleActive, handleDelete, onEditUser, onPolicyRatio, onSynchronize, onPolicyApply]
  );

  const leadColumns = useMemo(
    () =>
      getLeadColumns({
        onToggleActive,
        onEditUser,
        handleDelete,
        handleMakeLeadToCustomer,
      }),
    [onToggleActive, onEditUser, handleDelete, handleMakeLeadToCustomer]
  );

  const isWide = useMediaQuery(`(min-width:${(custActive === "customer" ? 2425 : 1925)}px)`);

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
            custActive={custActive}
            showSummary={showSummary}
            selectedRowsData={selectedRowsData}
            filters={filters}
            onFilterChange={updateFilter}
            onClearAll={clearAllFilters}
            onAdd={handleAdd}
            onExcel={() => handleExcel(filteredData)}
            onSynchronize={handleSynchronize}
            onSearch={onSearch}
            onArchive={handleArchive}
            onChangeCustStatus={onChangeCustStatus}
            handleShowSummary={handleShowSummary}
          />
        </Suspense>
      </Box>
      <Suspense fallback={<CenteredCircularLoader />}>
        <CustomerDataGrid
          deliveryData={filteredData}
          columns={custActive === "customer" ? columns : leadColumns}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          pageSizeOptions={pageSizeOptions}
          loading={isFiltering}
          showSummary={showSummary}
          isWide={isWide}
          setSelectedRowsData={setSelectedRowsData}
        />
      </Suspense>
      <ConfirmationDialog
        open={dialogState.open}
        onClose={handleCloseDialog}
        onConfirm={onDeleteUser}
        title="Confirm"
        content="Are you sure you want to remove this customer?"
      />
      <ConfirmationDialog
        open={dialogSynchronizeState.open}
        onClose={() => setDialogSynchronizeState({ open: false })}
        onConfirm={() => { }}
        title="Confirm"
        cancelLabel="Cancel"
        confirmLabel="Synchronize"
        content="Are you sure you want to Synchronize this customer?"
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

      <ConfirmationDialog
        open={dialogArchiveState.open}
        onClose={handleCloseArchiveDialog}
        onConfirm={() => { }}
        title="Confirm"
        cancelLabel="Cancel"
        confirmLabel="Archive"
        content="Are you sure you want to Archive this customer?"
      />

      <PurityRatioModal
        open={dialogPurityState?.open}
        onClose={() =>
          setDialogPurityState({ open: false, selectedRow: {} })
        }
      />
      <LeadFromDrawer open={drawerleadOpen.open} editData={drawerleadOpen?.selectedRow} onClose={handleCloseLeadDrawer} />
    </Box>
  );
}

export default memo(CustomerGrid);
