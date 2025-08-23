import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { formatCustomer } from "./useCustomerFormat";

export function useCustomerActions(setData, updateFilter) {
  const navigate = useNavigate();

  // Dialog states
  const [dialogState, setDialogState] = useState({ open: false, selectedRow: null });
  const [dialogPurityState, setDialogPurityState] = useState({ open: false, selectedRow: null });
  const [dialogSynchronizeState, setDialogSynchronizeState] = useState({ open: false, selectedRow: null });
  const [dialogArchiveState, setDialogArchiveState] = useState({ open: false, selectedRow: null });
  const [dialogAllSynchroze, setDialogAllSynchronize] = useState({ open: false, selectedRow: null })
  const [drawerleadOpen, setDrawerLeadOpen] = useState({ open: false, selectedRow: null });
  const [showSummary, setShowSummary] = useState(true);
  const [custActive, setCustActive] = useState("customer");

  const handleAdd = useCallback(() => {
    debugger
    const formattedData = formatCustomer({});
    if (custActive == "customer") {
      navigate("/customer-register", { state: { data: formattedData, step: 1 } });
    }
    else {
      setDrawerLeadOpen({ open: true, selectedRow: null });
    }
  }, [custActive]);

  const handleCloseLeadDrawer = useCallback(() => {
    setDrawerLeadOpen(false);
  }, []);

  const onToggleLogin = useCallback((row) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, loginFlag: !row.loginFlag } : item
      )
    );
  }, [setData]);

  const onToggleActive = useCallback(row => {
    setData(prev => {
      const index = prev.findIndex(item => item.id === row.id);
      if (index === -1) return prev;
      const newData = [...prev];
      newData[index] = { ...newData[index], active: !newData[index].active };
      return newData;
    });
  }, []);

  const onDeleteUser = useCallback(() => {
    if (dialogState.selectedRow) {
      setData((prev) =>
        prev.filter((item) => item.id !== dialogState.selectedRow.id)
      );
    }
    setDialogState({ open: false, selectedRow: null });
  }, [dialogState.selectedRow, setData]);

  const handleDelete = useCallback((row) => {
    setDialogState({ open: true, selectedRow: row });
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogState({ open: false, selectedRow: null });
  }, []);

  const onEditUser = useCallback((row) => {
    if (custActive == "customer") {
      const formattedData = formatCustomer(row);
      navigate(`/customer-register`, { state: { data: formattedData, step: 1 } });
    }
    else {
      setDrawerLeadOpen({ open: true, selectedRow: row });
    }
  }, [navigate, custActive]);

  const handleMakeLeadToCustomer = useCallback((row) => {
    const formattedData = formatCustomer(row);
    navigate(`/customer-register`, { state: { data: formattedData, step: 1 } });
  }, [setData]);

  const onPolicyRatio = useCallback((row) => {
    setDialogPurityState({ open: true, selectedRow: row });
  }, []);

  const onSynchronize = useCallback((row) => {
    setDialogSynchronizeState({ open: true, selectedRow: row });
  }, []);

  const onPolicyApply = useCallback((row) => {
    const formattedData = formatCustomer(row);
    navigate(`/customer-register`, { state: { data: formattedData, step: 7 } });
  }, [navigate]);

  const onSearch = useCallback((searchText) => {
    updateFilter("globalSearch", searchText);
  }, [updateFilter]);

  const handleShowSummary = useCallback(() => {
    setShowSummary(prev => !prev);
  }, []);

  const handleArchive = useCallback((row) => {
    setDialogArchiveState({ open: true, selectedRow: row });
  }, []);

  const handleCloseArchiveDialog = useCallback(() => {
    setDialogArchiveState({ open: false, selectedRow: null });
  }, []);

  const handleSynchronize = useCallback((row) => {
    setDialogAllSynchronize({ open: true, selectedRow: row });
  }, []);

  const handleCloseSynchronize = useCallback(() => {
    setDialogAllSynchronize({ open: false, selectedRow: null });
  }, []);


  const onChangeCustStatus = useCallback(e => setCustActive(e.target.value), []);

  const handleExcel = useCallback((data) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, `customers_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }, []);

  return {
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
    handleCloseLeadDrawer,
    dialogSynchronizeState,
    dialogArchiveState,
    dialogAllSynchroze,
    setDialogState,
    setDialogPurityState,
    setDialogSynchronizeState,
    handleCloseArchiveDialog,
    onChangeCustStatus,
    handleMakeLeadToCustomer,
  };
}
