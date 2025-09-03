import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  memo,
  lazy,
  Suspense,
} from "react";
import initialData from "../../../Data/empData.json";
import initialLeadData from "../../../Data/leadData.json";
import initialEmployerData from "../../../Data/employerData.json";
import { getCustomerColumns } from "./ColumnList";
import { Box, useMediaQuery } from "@mui/material";
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
import { useLocation } from "react-router-dom";
import { getEmployeeColumns } from "../../Employer/Grid/EmpList";

// Lazy imports
const CustomerDataGrid = lazy(() =>
  import("../../../Components/CustomerForm/Grid/CustomerGrid")
);
const ActionBar = lazy(() =>
  import("../../../Components/CustomerForm/Grid/Filter/ActionBar")
);

// menu items for customers
const customerMenuItems = [
  { label: "Update Price Policy", icon: "DollarSign", color: "#4caf50" },
  { label: "Update Customer Type", icon: "Users", color: "#2196f3" },
  { label: "Update Sales Rep", icon: "User", color: "#ff9800" },
  { label: "Update Adhoc", icon: "PlusSquare", color: "#9c27b0" },
  { label: "Customer Status", icon: "Info", color: "#f44336" },
];

// filters for customers
const customerFilterConfig = [
  { key: "status", label: "Status", type: "select", options: ["Active", "Deactive"] },
  { key: "ecatName", label: "Ecat Name", type: "select", options: [{ id: 1, labelname: "Intelligent Frozen Chicken" }, { id: 2, labelname: "Rustic Cotton Cheese" }] },
  { key: "users", label: "Users", type: "select", options: [{ id: 1, labelname: "Miss Timmy Murazik" }, { id: 2, labelname: "Wesley Bradtke I" }] },
  { key: "notification", label: "Notifications", type: "select", options: [{ id: 1, labelname: "Notification 1" }, { id: 2, labelname: "Notification 2" }] },
];

const employerMenuItems = [
  { label: "Update Designation", icon: "UserCheck", color: "#3b82f6" },
  { label: "Update Department", icon: "Layers", color: "#ff9800" },
  { label: "Update Status", icon: "Info", color: "#f44336" },
];

const employerFilterConfig = [
  {
    key: "designation",
    label: "Designation",
    type: "select",
    options: [
      { id: 1, labelname: "HR Manager" },
      { id: 2, labelname: "Recruitment Specialist" },
      { id: 3, labelname: "Training & Development Manager" },
      { id: 4, labelname: "Payroll Administrator" },
      { id: 5, labelname: "Employee Relations Manager" },
      { id: 6, labelname: "Compensation & Benefits Analyst" },
      { id: 7, labelname: "HR Business Partner" },
      { id: 8, labelname: "HR Assistant" },
      { id: 9, labelname: "HR Coordinator" },
      { id: 10, labelname: "Talent Acquisition Manager" },
    ],
  },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      { id: 1, labelname: "Human Resources" },
      { id: 2, labelname: "Finance" },
      { id: 3, labelname: "Marketing" },
      { id: 4, labelname: "Sales" },
      { id: 5, labelname: "Operations" },
      { id: 6, labelname: "IT" },
      { id: 7, labelname: "Legal" },
      { id: 8, labelname: "Customer Support" },
      { id: 9, labelname: "Product Management" },
      { id: 10, labelname: "Research & Development" },
    ],
  },
  { key: "location", label: "Location", type: "text" },
  { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
  { key: "roamingStatus", label: "Roaming Status", type: "select", options: ["Roaming on", "Roaming off"] },
];


function CustomerGrid() {
  const location = useLocation();
  const isEmployer = location.pathname === "/employer";
  const { custData, leadData, employerData } = useMemo(() => ({
    custData: initialData,
    leadData: initialLeadData,
    employerData: initialEmployerData
  }), []);

  const dataSource = useMemo(() => {
    if (isEmployer) return employerData;
    return custData;
  }, [isEmployer, custData, employerData]);

  const [data, setData] = useState(dataSource);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const pageSizeOptions = useMemo(() => [20, 25, 50, 100], []);

  const {
    filters,
    debouncedFilters,
    updateFilter,
    clearAllFilters,
    isFiltering,
    hasActiveFilters,
  } = useDebounceFilters({}, 300);

  const memoizedUpdateFilter = useCallback((key, value) => {
    updateFilter(key, value);
    setPaginationModel(prev => ({
      ...prev,
      page: 0
    }));
  }, [updateFilter]);

  const actions = useCustomerActions(data, setData, memoizedUpdateFilter);

  const {
    handleAdd,
    onToggleLogin,
    onToggleActive,
    onToggleSupport,
    onToggleRoaming,
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
    custActive = isEmployer ? 'employer' : 'customer',
    drawerleadOpen,
    selectedIds,
    selectedRowsData = [],
    handleCloseLeadDrawer,
    setDialogPurityState,
    dialogAllSynchroze,
    dialogSynchronizeState,
    dialogArchiveState,
    setDialogSynchronizeState,
    handleCloseArchiveDialog,
    onChangeCustStatus,
    handleMakeLeadToCustomer,
    setSelectedIds,
    handleViewDocument,
  } = actions;

  useEffect(() => {
    if (isEmployer) {
      setData(employerData);
    } else if (custActive === "lead") {
      setData(leadData);
    } else {
      setData(custData);
    }
  }, [custActive, isEmployer, custData, leadData, employerData]);

  const { filteredData, summaryData } = useCustomerAndLeadData(data, debouncedFilters, hasActiveFilters, custActive);

  const columns = useMemo(
    () => getCustomerColumns({
      onToggleLogin,
      onToggleActive,
      handleDelete,
      onEditUser,
      onPolicyRatio,
      onSynchronize,
      onPolicyApply,
      handleViewDocument,
    }),
    [onToggleLogin, onToggleActive, handleDelete, onEditUser, onPolicyRatio, onSynchronize, onPolicyApply, handleViewDocument]
  );

  const leadColumns = useMemo(
    () => getLeadColumns({
      onToggleActive,
      onEditUser,
      handleDelete,
      handleMakeLeadToCustomer,
    }),
    [onToggleActive, onEditUser, handleDelete, handleMakeLeadToCustomer]
  );

  const employerColumns = useMemo(
    () => getEmployeeColumns({
      onToggleActive,
      onToggleLogin,
      onToggleSupport,
      onToggleRoaming,
      onEditUser,
      handleDelete,
      handleMakeLeadToCustomer,
    }),
    [onToggleActive, onToggleLogin, onToggleSupport, onToggleRoaming, onEditUser, handleDelete, handleMakeLeadToCustomer]
  );

  const columnsData = useMemo(() => {
    if (isEmployer) return employerColumns;
    return custActive === "customer" ? columns : leadColumns;
  }, [isEmployer, custActive, columns, leadColumns, employerColumns]);

  const { menuItems, filterConfig } = useMemo(() => ({
    menuItems: isEmployer ? employerMenuItems : customerMenuItems,
    filterConfig: isEmployer ? employerFilterConfig : customerFilterConfig
  }), [isEmployer]);

  const isWide = useMediaQuery(`(min-width:${(isEmployer || custActive === "lead" ? 1925 : 2425)}px)`);

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
            showSummary={false}
            selectedIds={selectedIds}
            selectedRowsData={selectedRowsData}
            onAdd={handleAdd}
            onExcel={() => handleExcel(filteredData)}
            onSynchronize={handleSynchronize}
            onSearch={onSearch}
            onArchive={handleArchive}
            onChangeCustStatus={onChangeCustStatus}
            handleShowSummary={handleShowSummary}
            filters={filters}
            onFilterChange={memoizedUpdateFilter}
            menuItems={menuItems}
            filterConfig={filterConfig}
          />
        </Suspense>
      </Box>
      <Suspense fallback={<CenteredCircularLoader />}>
        <CustomerDataGrid
          deliveryData={filteredData}
          columns={columnsData}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          pageSizeOptions={pageSizeOptions}
          loading={isFiltering}
          showSummary={showSummary}
          isWide={isWide}
          onSelectionModelChange={setSelectedIds}
        />
      </Suspense>
      <ConfirmationDialog
        open={dialogState.open}
        onClose={handleCloseDialog}
        onConfirm={onDeleteUser}
        title="Confirm"
        content={`Are you sure you want to remove this ${location.pathname === "/customers" ? custActive : "employee"}?`}
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
