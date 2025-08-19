import React, {
  useState,
  useMemo,
  useEffect,
  memo,
  lazy,
  Suspense,
} from "react";
import initialData from "../../../Data/empData.json";
import { getCustomerColumns } from "./ColumnList";
import { Box, Typography, FormControlLabel, Switch } from "@mui/material";
import CustomerSummary from "../../../Components/CustomerForm/Grid/Summary/CustomerSummary";
import { useDebounceFilters } from "../../../hooks/useDebounceFilters";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../Common/ConfirmationDialog/ConfirmationDialog";
import PurityRatioModal from "../../../Components/CustomerForm/Grid/Modal/PurityRatioModal";
import CenteredCircularLoader from "../../../Common/Loder/CustomLoder";
import { useCustomerActions } from "../../../hooks/useCustomerActions";
import { useCustomerData } from "../../../hooks/useCustomerData";

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
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
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
  } = useDebounceFilters({}, 500);

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
    handleCloseSynchronizeDialog,
    onPolicyApply,
    onSearch,
    handleShowSummary,
    showSummary,
    dialogState,
    dialogPurityState,
    setDialogPurityState,
    dialogSynchronizeState,
  } = useCustomerActions(setData, updateFilter);


  const { filteredCustomerData, summaryData } =
    useCustomerData(data, debouncedFilters, hasActiveFilters);

  useEffect(() => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, [debouncedFilters]);

  const navHandlers = {
    handleLead: () => navigate("/lead"),
    handleExcel: () => navigate("/excel"),
    handleSynchronize: () => navigate("/synchronize"),
    handleLeadList: () => navigate("/lead-list"),
    handleArchive: () => navigate("/archive"),
  };

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

  return (
    <Box sx={{ width: "100%", height: "100vh", px: 2, bgcolor: "#fff" }}>
      <Box sx={{ py: 2, borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }} variant="h2">
            Customer Management
          </Typography>
          <Typography sx={{ fontSize: "14px" }} variant="body1">
            Manage customer data, policies, and account information across your
            business operations.
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={showSummary}
                onChange={handleShowSummary}
                color="primary"
              />
            }
            label={showSummary ? "Hide Summary" : "Show Summary"}
          />
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Suspense fallback={<CenteredCircularLoader />}>
          <ActionBar
            onAdd={handleAdd}
            onLead={navHandlers.handleLead}
            onExcel={navHandlers.handleExcel}
            onSynchronize={navHandlers.handleSynchronize}
            onLeadList={navHandlers.handleLeadList}
            onSearch={onSearch}
            onArchive={navHandlers.handleArchive}
          />
        </Suspense>
      </Box>
      {/* <Suspense fallback={<CenteredCircularLoader />}>
        <Box sx={{ mb: 2 }}>
          <FilterBar
            filtersConfig={filtersConfig}
            filters={filters}
            onFilterChange={updateFilter}
            onClearAll={clearAllFilters}
            onAdd={handleAdd}
            addIcon={<Plus size={18} />}
            isFiltering={isFiltering} />
        </Box>
      </Suspense> */}
      {showSummary && (
        <Box sx={{ mb: 2 }}>
          <CustomerSummary summary={summaryData} />
        </Box>
      )}
      <Suspense fallback={<CenteredCircularLoader />}>
        <CustomerDataGrid
          deliveryData={filteredCustomerData}
          columns={columns}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          pageSizeOptions={pageSizeOptions}
          loading={isFiltering}
          showSummary={showSummary}
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
        onClose={handleCloseSynchronizeDialog}
        onConfirm={() => { }}
        title="Confirm"
        cancelLabel="Cancel"
        confirmLabel="Synchronize"
        content="Are you sure you want to Synchronize this customer?"
      />
      <PurityRatioModal
        open={dialogPurityState?.open}
        onClose={() =>
          setDialogPurityState({ open: false, selectedRow: {} })
        }
      />
    </Box>
  );
}

export default memo(CustomerGrid);
