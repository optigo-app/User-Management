import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCustomer } from "./useCustomerFormat";

export const useManufactureActions = (data, setData, updateFilter) => {
  const navigate = useNavigate();
  const custActive = "manufacturer"
  const [dialogState, setDialogState] = useState({ open: false, selectedRow: null });
  const [dialogArchiveState, setDialogArchiveState] = useState({ open: false, selectedRow: null });
  const [dialogAllSynchroze, setDialogAllSynchronize] = useState({ open: false, selectedRow: null })
  const [dialogPurityState, setDialogPurityState] = useState({ open: false, selectedRow: null });
  const [dialogBrandsState, setDialogBrandsState] = useState({ open: false, selectedRow: null });
  
  // Initialize showSummary from localStorage with fallback to true
  const [showSummary, setShowSummaryState] = useState(() => {
    const saved = localStorage.getItem('manufacturer-showSummary');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Wrapper function to update both state and localStorage
  const setShowSummary = useCallback((value) => {
    setShowSummaryState(prevState => {
      const newValue = typeof value === 'function' ? value(prevState) : value;
      localStorage.setItem('manufacturer-showSummary', JSON.stringify(newValue));
      return newValue;
    });
  }, []);
  
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSetSelectedIds = useCallback((selection) => {
    if (Array.isArray(selection)) {
      setSelectedIds(selection);
      return;
    }
    console.log("selection", selection);
    if (selection?.type === 'include' && selection.ids) {
      const idsArray = selection.ids instanceof Set
        ? [...selection.ids]
        : Object.keys(selection.ids);
      setSelectedIds(idsArray);
    } else if (selection?.type === 'exclude' && selection.ids) {
      const excludedSet = selection.ids instanceof Set
        ? selection.ids
        : new Set(Object.keys(selection.ids));
      const idsArray = data.filter(row => !excludedSet.has(row.id)).map(row => row.id);
      setSelectedIds(idsArray);
    } else {
      setSelectedIds([]);
    }
  }, [data]);

  useEffect(() => {
    if (!selectedIds.length || !data?.length) {
      setSelectedRowsData([]);
      return;
    }
    const selectedData = [];
    const selectedSet = new Set(selectedIds);
    for (let i = 0; i < data.length && selectedData.length < selectedIds.length; i++) {
      if (selectedSet.has(data[i].id)) {
        selectedData.push(data[i]);
      }
    }
    setSelectedRowsData(selectedData);
  }, [selectedIds, data.length]);

  const handleAdd = useCallback(() => {
    const formattedData = formatCustomer({});
    navigate("/manufacturer-register", { state: { data: formattedData, step: 1 } });
  }, []);

  const onToggleActive = useCallback((row) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === row.id ? { ...item, active: !item.active } : item
      )
    );
    toast.success(`Manufacturer ${row.active ? 'deactivated' : 'activated'} successfully`);
  }, [setData]);

  const onToggleRoaming = useCallback((row) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === row.id ? { ...item, roaming: !item.roaming } : item
      )
    );
    toast.success(`Roaming ${row.roaming ? 'disabled' : 'enabled'} for ${row.firmName}`);
  }, [setData]);

  const onToggleMelt = useCallback((row) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === row.id ? { ...item, melt: !item.melt } : item
      )
    );
    toast.success(`Melt permission ${row.melt ? 'disabled' : 'enabled'} for ${row.firmName}`);
  }, [setData]);

  const onToggleLogin = useCallback((row) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === row.id ? { ...item, login: !item.login } : item
      )
    );
    toast.success(`Login ${row.login ? 'disabled' : 'enabled'} for ${row.firmName}`);
  }, [setData]);

  const handleDelete = useCallback((row) => {
    setDialogState({ open: true, selectedRow: row });
  }, []);

  const onDeleteUser = useCallback(() => {
    const { selectedRow } = dialogState;
    setData(prevData => prevData.filter(item => item.id !== selectedRow.id));
    setDialogState({ open: false, selectedRow: {} });
    toast.success(`Manufacturer ${selectedRow.firmName} deleted successfully`);
  }, [dialogState, setData]);

  const handleCloseDialog = useCallback(() => {
    setDialogState({ open: false, selectedRow: {} });
  }, []);

  const onEditUser = useCallback((row) => {
    const formattedData = formatCustomer(row);
    navigate(`/manufacturer-register`, { state: { data: formattedData, step: 1 } });
  }, [navigate, custActive]);

  const onSearch = useCallback((searchTerm) => {
    updateFilter('search', searchTerm);
  }, [updateFilter]);

  const handleShowSummary = useCallback(() => {
    setShowSummary(prev => !prev);
  }, []);

  const handleExcel = useCallback((data) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Manufacturers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, `manufacturers_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }, []);

  const handleArchive = useCallback(() => {
    if (selectedIds.length === 0) {
      toast.error("Please select manufacturers to archive");
      return;
    }
    setDialogArchiveState({ open: true });
  }, [selectedIds]);

  const handleCloseArchiveDialog = useCallback(() => {
    setDialogArchiveState({ open: false });
  }, []);

  const handleSynchronize = useCallback((row) => {
    setDialogAllSynchronize({ open: true, selectedRow: row });
  }, []);

  const handleCloseSynchronize = useCallback(() => {
    setDialogAllSynchronize({ open: false, selectedRow: null });
  }, []);

  const onChangeCustStatus = useCallback((status) => {
    if (selectedIds.length === 0) {
      toast.error("Please select manufacturers to update status");
      return;
    }

    setData(prevData =>
      prevData.map(item =>
        selectedIds.includes(item.id)
          ? { ...item, active: status === 'Active' }
          : item
      )
    );

    toast.success(`${selectedIds.length} manufacturer(s) status updated to ${status}`);
    setSelectedIds([]);
  }, [selectedIds, setData]);

  const handleViewDocument = useCallback((row) => {
    // View document - placeholder for now
    console.log("View document for:", row);
    toast.success(`View document for ${row.firmName}`);
  }, []);

  const onPurityRatio = useCallback((row) => {
    setDialogPurityState({ open: true, selectedRow: row });
  }, []);

  const onBrandManagement = useCallback((row) => {
    setDialogBrandsState({ open: true, selectedRow: row });
  }, []);

  return {
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
    selectedRowsData,
    dialogArchiveState,
    dialogAllSynchroze,
    handleCloseArchiveDialog,
    handleCloseSynchronize,
    onChangeCustStatus,
    setSelectedIds: handleSetSelectedIds,
    handleViewDocument,
    onPurityRatio,
    onBrandManagement,
    dialogPurityState,
    setDialogPurityState,
    dialogBrandsState,
    setDialogBrandsState,
  };
};
