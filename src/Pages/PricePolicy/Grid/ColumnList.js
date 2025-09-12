import React from 'react';
import { IconButton } from '@mui/material';
import { Pencil, Trash2, Copy } from 'lucide-react';
import dropdownOptions from '../../../Data/dropdownOptions.json';
import AutocompleteEditCell from '../../../Components/Common/AutocompleteEditCell';

const makeRenderEditCell = (options, parentOnEditChange, parentOnEditKeyDown) => (params) => {
    const defaultOnChange = (newValue) => {
        if (newValue !== null) {
            params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
        }
    };
    const defaultOnKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
            params.api.stopCellEditMode({ id: params.id, field: params.field });
            event.preventDefault();
        } else if (event.key === 'Escape') {
            params.api.stopCellEditMode({ id: params.id, field: params.field, ignoreModifications: true });
            event.preventDefault();
        }
    };
    const handleChange = parentOnEditChange
        ? (newValue) => parentOnEditChange(params, newValue)
        : defaultOnChange;

    const handleKeyDown = parentOnEditKeyDown
        ? (event) => parentOnEditKeyDown(params, event)
        : defaultOnKeyDown;

    return (
        <AutocompleteEditCell
            value={params.value}
            options={options}
            inputHeight={45}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

export const getPricePolicyColumns = ({ handleDelete, onEditUser, onDuplicateRow, onEditChange, onEditKeyDown }) => [
    { field: 'srNo', headerName: 'SrNo', width: 80, editable: false },
    {
        field: 'manufacturer', headerName: 'Manufacturer', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.manufacturers, onEditChange, onEditKeyDown)
    },
    {
        field: 'brand', headerName: 'Brand', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.brands, onEditChange, onEditKeyDown)
    },
    {
        field: 'productType', headerName: 'Product Type', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.productTypes, onEditChange, onEditKeyDown)
    },
    {
        field: 'collection', headerName: 'Collection', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.collections, onEditChange, onEditKeyDown)
    },
    {
        field: 'category', headerName: 'Category', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.categories, onEditChange, onEditKeyDown)
    },
    {
        field: 'style', headerName: 'Style', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.styles, onEditChange, onEditKeyDown)
    },
    {
        field: 'makeType', headerName: 'Make Type', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.makeTypes, onEditChange, onEditKeyDown)
    },
    {
        field: 'metalType', headerName: 'Metal Type', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.metalTypes, onEditChange, onEditKeyDown)
    },
    {
        field: 'labourSet', headerName: 'Labour Set', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.labourSets, onEditChange, onEditKeyDown)
    },
    {
        field: 'lessPolicy', headerName: 'Less Policy', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.lessPolicies, onEditChange, onEditKeyDown)
    },
    {
        field: 'purWastage', headerName: 'Pur. Wastage', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.wastagePercentages, onEditChange, onEditKeyDown)
    },
    {
        field: 'purMaking', headerName: 'Pur. Making', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.makingCharges, onEditChange, onEditKeyDown)
    },
    {
        field: 'salesWastage', headerName: 'Sales Wastage', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.wastagePercentages, onEditChange, onEditKeyDown)
    },
    {
        field: 'salesMaking', headerName: 'Sales Making', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.makingCharges, onEditChange, onEditKeyDown)
    },
    {
        field: 'purMetalLoss', headerName: 'Pur. Metal loss(%)', width: 180, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.metalLossPercentages, onEditChange, onEditKeyDown)
    },
    {
        field: 'saleMetalLoss', headerName: 'Sale Metal loss(%)', width: 180, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.metalLossPercentages, onEditChange, onEditKeyDown)
    },
    {
        field: 'mrpDiscount', headerName: 'MRP Discount', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.discountPercentages, onEditChange, onEditKeyDown)
    },
    {
        field: 'weightRange', headerName: 'Weight Range', width: 150, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.weightRanges, onEditChange, onEditKeyDown)
    },
    {
        field: 'weightRangeOn', headerName: 'Weight Range On', width: 180, editable: true,
        renderEditCell: makeRenderEditCell(dropdownOptions.weightRangeOn, onEditChange, onEditKeyDown)
    },
    {
        field: "edit",
        headerName: "Edit",
        width: 70,
        renderCell: (params) => (
            <IconButton onClick={() => onEditUser(params?.row)}>
                <Pencil size={18} color="gray" />
            </IconButton>
        ),
    },
    {
        field: "duplicate",
        headerName: "Duplicate",
        width: 90,
        renderCell: (params) => (
            <IconButton 
                onClick={() => {
                    console.log('Duplicate button clicked for row:', params?.row);
                    onDuplicateRow(params?.row);
                }}
                sx={{ 
                    '&:hover': { 
                        backgroundColor: 'rgba(0, 123, 255, 0.1)' 
                    } 
                }}
            >
                <Copy size={18} color="blue" />
            </IconButton>
        ),
    },
    {
        field: "Delete",
        headerName: "Delete",
        width: 90,
        renderCell: (params) => (
            <IconButton onClick={() => handleDelete(params?.row)}>
                <Trash2 size={18} color="gray" />
            </IconButton>
        ),
    },
];
