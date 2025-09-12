import React, { useState, useMemo } from "react";
import {
    Box,
    TextField,
    IconButton,
    Tooltip,
    Stack,
    Chip,
    FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Search, Filter, Trash2, Edit, Plus, Pencil } from "lucide-react";
import CustomAutocomplete from "../Components/Ui/ReusableAutocomplete";
import { ToggleSwitch } from "../Components/Ui/ToggleSwitch";

const PricePolicyTable = ({ policyType, data = [], onEdit, onDelete }) => {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({});
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    // Common column definitions
    const getCommonColumns = () => [
        {
            field: "sr",
            headerName: "Sr#",
            width: 70,
            renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
    ];

    const getActionColumns = () => [
        {
            field: "isWebDefault",
            headerName: "Web Default",
            width: 120,
            renderCell: (params) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems:'center', width: "100%", height:'100%' }}>
                    <ToggleSwitch
                        checked={params?.value}
                        onChange={() => console.log(params?.row)}
                        activeColor="#2196f3"
                        inactiveColor="#f44336"
                    />
                </div>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => onEdit?.(params.row)}>
                            <Pencil size={18} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => onDelete?.(params.row)}>
                            <Trash2 size={18} />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    // Policy-specific column definitions
    const getPolicyColumns = () => {
        switch (policyType) {
            case "diamond":
                return [
                    ...getCommonColumns(),
                    { field: "materialTypeName", headerName: "Material Type", width: 150 },
                    { field: "type", headerName: "Type", width: 120 },
                    { field: "shape", headerName: "Shape", width: 120 },
                    { field: "quality", headerName: "Quality", width: 120 },
                    { field: "color", headerName: "Color", width: 100 },
                    { field: "size", headerName: "Size", width: 100 },
                    { field: "pointerFrom", headerName: "Pointer From", width: 120 },
                    { field: "pointerTo", headerName: "Pointer To", width: 120 },
                    { field: "price", headerName: "Price", width: 120, renderCell: (params) => `₹${params.value}` },
                    ...getActionColumns(),
                ];

            case "colorstone":
                return [
                    ...getCommonColumns(),
                    { field: "type", headerName: "Type", width: 150 },
                    { field: "shape", headerName: "Shape", width: 120 },
                    { field: "quality", headerName: "Quality", width: 120 },
                    { field: "color", headerName: "Color", width: 100 },
                    { field: "size", headerName: "Size", width: 100 },
                    { field: "pointerFrom", headerName: "Pointer From", width: 120 },
                    { field: "pointerTo", headerName: "Pointer To", width: 120 },
                    { field: "price", headerName: "Price", width: 120, renderCell: (params) => `₹${params.value}` },
                    ...getActionColumns(),
                ];

            case "labour":
                return [
                    ...getCommonColumns(),
                    { field: "metalRateOn", headerName: "Metal Rate On", width: 150 },
                    { field: "makingOn", headerName: "Making On", width: 150 },
                    { field: "making", headerName: "Making", width: 120 },
                    { field: "price", headerName: "Price", width: 120, renderCell: (params) => `₹${params.value}` },
                    ...getActionColumns(),
                ];

            case "setting":
                return [
                    ...getCommonColumns(),
                    { field: "materialType", headerName: "Material Type", width: 150 },
                    { field: "settingType", headerName: "Setting Type", width: 150 },
                    { field: "metalType", headerName: "Metal Type", width: 120 },
                    { field: "shape", headerName: "Shape", width: 120 },
                    { field: "size", headerName: "Size", width: 100 },
                    { field: "pointerFrom", headerName: "Pointer From", width: 120 },
                    { field: "pointerTo", headerName: "Pointer To", width: 120 },
                    { field: "price", headerName: "Price", width: 120, renderCell: (params) => `₹${params.value}` },
                    { field: "fixed", headerName: "Fixed", width: 100, renderCell: (params) => params.value ? "Yes" : "No" },
                    ...getActionColumns(),
                ];

            default:
                return getCommonColumns();
        }
    };

    // Filter options based on policy type
    const getFilterOptions = () => {
        const commonFilters = ["type", "shape", "quality", "color"];

        switch (policyType) {
            case "diamond":
                return [...commonFilters, "materialTypeName"];
            case "colorstone":
                return commonFilters;
            case "labour":
                return ["metalRateOn", "makingOn"];
            case "setting":
                return ["materialType", "settingType", "metalType", "shape"];
            default:
                return [];
        }
    };

    // Sample data generator
    const getSampleData = () => {
        switch (policyType) {
            case "diamond":
                return [
                    { id: 1, materialTypeName: "Natural Diamond", type: "Round", shape: "Brilliant", quality: "VVS1", color: "D", size: "1.0ct", pointerFrom: "0.90", pointerTo: "1.10", price: 5500, isWebDefault: true },
                    { id: 2, materialTypeName: "Lab Diamond", type: "Princess", shape: "Square", quality: "VVS2", color: "E", size: "0.8ct", pointerFrom: "0.70", pointerTo: "0.90", price: 4200, isWebDefault: false },
                    { id: 3, materialTypeName: "Natural Diamond", type: "Emerald", shape: "Rectangle", quality: "VS1", color: "F", size: "1.2ct", pointerFrom: "1.10", pointerTo: "1.30", price: 4800, isWebDefault: false },
                ];
            case "colorstone":
                return [
                    { id: 1, type: "Ruby", shape: "Oval", quality: "Premium", color: "Red", size: "1.0ct", pointerFrom: "0.90", pointerTo: "1.10", price: 2500, isWebDefault: true },
                    { id: 2, type: "Emerald", shape: "Emerald Cut", quality: "Standard", color: "Green", size: "0.8ct", pointerFrom: "0.70", pointerTo: "0.90", price: 2200, isWebDefault: false },
                    { id: 3, type: "Sapphire", shape: "Round", quality: "Premium", color: "Blue", size: "1.2ct", pointerFrom: "1.10", pointerTo: "1.30", price: 2800, isWebDefault: false },
                ];
            case "labour":
                return [
                    { id: 1, metalRateOn: "Gold Weight", makingOn: "Per Piece", making: "Ring Making", price: 800, isWebDefault: true },
                    { id: 2, metalRateOn: "Silver Weight", makingOn: "Per Gram", making: "Chain Making", price: 200, isWebDefault: false },
                    { id: 3, metalRateOn: "Platinum Weight", makingOn: "Per Piece", making: "Pendant Making", price: 600, isWebDefault: false },
                ];
            case "setting":
                return [
                    { id: 1, materialType: "Gold", settingType: "Prong", metalType: "22K", shape: "Round", size: "6mm", pointerFrom: "5.5", pointerTo: "6.5", price: 1200, fixed: true, isWebDefault: true },
                    { id: 2, materialType: "Silver", settingType: "Bezel", metalType: "925", shape: "Square", size: "8mm", pointerFrom: "7.5", pointerTo: "8.5", price: 800, fixed: false, isWebDefault: false },
                    { id: 3, materialType: "Platinum", settingType: "Channel", metalType: "950", shape: "Oval", size: "10mm", pointerFrom: "9.5", pointerTo: "10.5", price: 1500, fixed: true, isWebDefault: false },
                ];
            default:
                return [];
        }
    };

    const columns = getPolicyColumns();
    const sampleData = data.length > 0 ? data : getSampleData();

    // Filter data based on search and filters
    const filteredData = useMemo(() => {
        let filtered = sampleData;

        // Apply search filter
        if (searchText) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }

        // Apply column filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter((row) =>
                    String(row[key]).toLowerCase().includes(String(value).toLowerCase())
                );
            }
        });

        return filtered;
    }, [sampleData, searchText, filters]);

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            {/* Search and Filter Bar */}
            <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center", flexWrap: "wrap" }}>
                <TextField
                    size="small"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        startAdornment: <Search size={16} style={{ marginRight: 8 }} />,
                    }}
                    sx={{ minWidth: 200 }}
                />

                {/* Dynamic Filters */}
                {getFilterOptions().map((filterField) => (
                    <CustomAutocomplete
                        key={filterField}
                        fullWidth={false}
                        height={38}
                        minWidth={200}
                        placeholder={`Filter by ${filterField}`}
                        value={filters[filterField] || ""}
                        onChange={(e, newValue) => handleFilterChange(filterField, newValue)}
                        options={[
                            { value: "", label: "All" },
                            ...[...new Set(sampleData.map(row => row[filterField]))].map((value) => ({
                                value: value,
                                label: value
                            }))
                        ]}
                    />
                ))}
            </Stack>

            {/* Active Filters */}
            {Object.entries(filters).some(([_, value]) => value) && (
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
                    {Object.entries(filters).map(([key, value]) =>
                        value ? (
                            <Chip
                                key={key}
                                label={`${key}: ${value}`}
                                onDelete={() => handleFilterChange(key, "")}
                                size="small"
                                variant="outlined"
                            />
                        ) : null
                    )}
                </Stack>
            )}

            {/* DataGrid */}
            <DataGrid
                rows={filteredData}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                    "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #f0f0f0",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f8f9fa",
                        borderBottom: "2px solid #e0e0e0",
                    },
                }}
            />
        </Box>
    );
};

export default PricePolicyTable;
