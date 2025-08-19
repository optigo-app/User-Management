import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatCustomer } from "./useCustomerFormat";

export function useCustomerActions(setData, updateFilter) {
  const navigate = useNavigate();

  // Dialog states
  const [dialogState, setDialogState] = useState({ open: false, selectedRow: null });
  const [dialogPurityState, setDialogPurityState] = useState({ open: false, selectedRow: null });
  const [dialogSynchronizeState, setDialogSynchronizeState] = useState({ open: false, selectedRow: null });
  const [showSummary, setShowSummary] = useState(false);

  const handleAdd = useCallback(() => {
    const formattedData = formatCustomer({});
    navigate("/customer-register", { state: { data: formattedData, step: 1 } });
  }, [navigate]);

  const onToggleLogin = useCallback((row) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, loginFlag: !row.loginFlag } : item
      )
    );
  }, [setData]);

  const onToggleActive = useCallback((row) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, active: !row.active } : item
      )
    );
  }, [setData]);

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
    const formattedData = formatCustomer(row);
    navigate(`/customer-register`, { state: { data: formattedData, step: 1 }});
  }, [navigate]);

  const onPolicyRatio = useCallback((row) => {
    setDialogPurityState({ open: true, selectedRow: row });
  }, []);

  const onSynchronize = useCallback((row) => {
    setDialogSynchronizeState({ open: true, selectedRow: row });
  }, []);

  const handleCloseSynchronizeDialog = useCallback(() => {
    setDialogSynchronizeState({ open: false, selectedRow: null });
  }, []);

  const onPolicyApply = useCallback((row) => {
    const formattedData = formatCustomer(row);
    navigate(`/customer-register`, { state: { data: formattedData, step: 7 } });
  }, [navigate]);

  const onSearch = useCallback((searchText) => {
    updateFilter("globalSearch", searchText);
  }, [updateFilter]);

  const handleShowSummary = useCallback(() => {
    setShowSummary(!showSummary);
  }, [showSummary]);


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
    handleCloseSynchronizeDialog,
    onPolicyApply,
    onSearch,
    handleShowSummary,
    showSummary,
    dialogState,
    setDialogState,
    dialogPurityState,
    setDialogPurityState,
    dialogSynchronizeState,
    setDialogSynchronizeState,
  };
}
