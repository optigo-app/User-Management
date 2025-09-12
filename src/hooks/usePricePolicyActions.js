import { useState, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

export function usePricePolicyActions(data, setData, updateFilter) {
  // Delete dialog state
  const [dialogState, setDialogState] = useState({ open: false, selectedRow: null });
  const [showSummary, setShowSummary] = useState(false);
  // Drawer state for create/edit price policy
  const [drawerState, setDrawerState] = useState({ open: false, editData: null });

  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);

  const handleSetSelectedIds = useCallback((selection) => {
    if (Array.isArray(selection)) {
      setSelectedIds(selection);
      return;
    }
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

  // Basic actions
  const handleAdd = useCallback(() => {
    setDrawerState({ open: true, editData: null });
  }, []);

  const openEditDrawer = useCallback((row) => {
    setDrawerState({ open: true, editData: row || null });
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerState({ open: false, editData: null });
  }, []);

  const savePricePolicy = useCallback((form) => {
    if (!form) return;
    setData(prev => {
      const next = Array.isArray(prev) ? [...prev] : [];
      // If editing (has id), update existing row
      if (form.id) {
        const idx = next.findIndex(x => x.id === form.id);
        if (idx !== -1) {
          next[idx] = { ...next[idx], ...form };
          return next;
        }
      }
      // else create new row with next id and srNo
      const maxId = next.length ? Math.max(...next.map(r => r.id || 0)) : 0;
      const maxSr = next.length ? Math.max(...next.map(r => r.srNo || 0)) : 0;
      next.push({ id: maxId + 1, srNo: maxSr + 1, ...form });
      return next;
    });
    setDrawerState({ open: false, editData: null });
  }, [setData]);

  const onDeleteUser = useCallback(() => {
    if (dialogState.selectedRow) {
      setData(prev => prev.filter(item => item.id !== dialogState.selectedRow.id));
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
    openEditDrawer(row);
  }, []);

  const onSearch = useCallback((searchText) => {
    updateFilter('globalSearch', searchText);
  }, [updateFilter]);

  const handleExcel = useCallback((rows) => {
    const exportData = rows && rows.length ? rows : data;
    if (!exportData || !exportData.length) {
      alert('No data to export');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PricePolicy');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `price_policy_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }, [data]);

  // Toolbar: synchronize and archive actions
  const onSynchronize = useCallback(() => {
    toast.success('Synchronize triggered');
    console.log('Synchronize action triggered');
  }, []);

  const onArchive = useCallback(() => {
    toast.success('Archive triggered');
    console.log('Archive action triggered');
  }, []);

  const handleShowSummary = useCallback(() => {
    setShowSummary(prev => !prev);
  }, []);

  // DataGrid edit handlers
  const onEditChange = useCallback((params, newValue) => {
    if (newValue !== null) {
      params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
    }
  }, []);

  const onEditKeyDown = useCallback((params, event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      params.api.stopCellEditMode({ id: params.id, field: params.field });
      event.preventDefault();
    } else if (event.key === 'Escape') {
      params.api.stopCellEditMode({ id: params.id, field: params.field, ignoreModifications: true });
      event.preventDefault();
    }
  }, []);

  return {
    // toolbar
    handleAdd,
    onSearch,
    handleExcel,
    onSynchronize,
    onArchive,
    handleShowSummary,
    showSummary,

    // row actions / dialog
    onEditUser,
    onDeleteUser,
    handleDelete,
    handleCloseDialog,
    dialogState,
    drawerState,
    closeDrawer,
    savePricePolicy,

    // selection
    selectedIds,
    selectedRowsData,
    setSelectedIds: handleSetSelectedIds,

    // datagrid edit handlers
    onEditChange,
    onEditKeyDown,
  };
}
