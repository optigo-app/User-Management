import React, { useState, useMemo, useEffect } from "react";
import CustomerDataGrid from "../../../Components/CustomerForm/Grid/CustomerGrid";
import filteredData from "../../../Data/empData.json";
import { getCustomerColumns } from "./ColumnList";
import { Box, Typography } from "@mui/material";
import CustomerSummary from "../../../Components/CustomerForm/Grid/Summary/CustomerSummary";
import FilterBar from "../../../Components/Ui/FilterBar";
import { Plus } from "lucide-react";
import { useDebounceFilters } from "../../../hooks/useDebounceFilters";
import { useNavigate } from "react-router-dom";

// Pre-lowercase data for faster filtering
const preprocessedData = filteredData.map((item) => {
    const lowered = {};
    for (let key in item) {
        lowered[key] =
            typeof item[key] === "string"
                ? item[key].toLowerCase()
                : item[key];
    }
    return { ...item, _lowered: lowered };
});

const filtersConfig = [
    { key: "customerName", label: "Customer Name", type: "text", alwaysVisible: true },
    { key: "company", label: "Company", type: "text", alwaysVisible: true },
    {
        key: "countryCode",
        label: "Country",
        type: "select",
        options: [
            { value: "KY", label: "Cayman Islands" },
            { value: "US", label: "United States" },
        ],
        alwaysVisible: true,
    },
    { key: "policy", label: "Policy", type: "text", alwaysVisible: true },
    { key: "state", label: "State", type: "text", alwaysVisible: true },
    { key: "city", label: "City", type: "text", alwaysVisible: true },
];

export default function CustomerGrid() {
    const navigate = useNavigate();
    const columns = getCustomerColumns();
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
    const pageSizeOptions = [20, 25, 50, 100, 200];
    const {
        filters,
        debouncedFilters,
        updateFilter,
        clearAllFilters,
        isFiltering,
        hasActiveFilters
    } = useDebounceFilters({}, 500);

    useEffect(() => {
        setPaginationModel(prev => ({ ...prev, page: 0 }));
    }, [debouncedFilters]);

    const handleAdd = () => {
        navigate("/customer-register");
    };

    const filteredCustomerData = useMemo(() => {
        if (!hasActiveFilters) {
            return preprocessedData;
        }
        return preprocessedData.filter((item) => {
            return Object.entries(debouncedFilters).every(([key, value]) => {
                if (!value || value === "") return true;

                const filterVal = value.toString().toLowerCase().trim();
                const itemValue = item._lowered[key];

                if (itemValue === null || itemValue === undefined) return false;

                return itemValue.toString().includes(filterVal);
            });
        });
    }, [debouncedFilters, hasActiveFilters]);

    const summaryData = useMemo(() => {
        const totalCustomers = filteredData?.length;
        const activeUsers = filteredData?.filter(c => c.status === "active").length;
        const avgPurity =
            filteredData?.length > 0
                ? (
                    filteredData?.reduce((sum, c) => sum + (c.purity || 0), 0) /
                    filteredData?.length
                ).toFixed(1) + "%"
                : "0%";
        const premiumPackage = filteredData?.filter(c => c.package === "premium").length;
        const policyDueSoon = filteredData?.filter(c => c.policyDueDays <= 30).length;
        const inactiveUsers = totalCustomers - activeUsers;

        return {
            totalCustomers,
            activeUsers,
            avgPurity,
            premiumPackage,
            policyDueSoon,
            inactiveUsers
        };
    }, [filteredData]);

    return (
        <Box sx={{ width: "100%", height: "100vh", px: 2, bgcolor: "#fff" }}>
            <Box sx={{
                py: 2,
                borderBottom: "1px solid #ddd",
            }}>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }} variant="h2">Customer Management</Typography>
                <Typography sx={{ fontSize: '14px' }} variant="body1">Manage customer data, policies, and account information across your business operations.</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <FilterBar
                    filtersConfig={filtersConfig}
                    filters={filters}
                    onFilterChange={updateFilter}
                    onClearAll={clearAllFilters}
                    onAdd={handleAdd}
                    addIcon={<Plus size={18} />}
                    isFiltering={isFiltering}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <CustomerSummary summary={summaryData} />
            </Box>

            <CustomerDataGrid
                deliveryData={filteredCustomerData}
                columns={columns}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                pageSizeOptions={pageSizeOptions}
                loading={isFiltering}
            />
        </Box>
    );
}