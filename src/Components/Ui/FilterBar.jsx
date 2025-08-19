import React, { useState, useCallback } from "react";
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    TextField,
    Tooltip,
    CircularProgress,
} from "@mui/material";
import {
    Plus,
    X,
    Filter,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const FilterBar = ({
    filtersConfig = [],
    filters = {},
    onFilterChange = () => { },
    onClearAll = () => { },
    isFiltering = false,
}) => {
    const [showMore, setShowMore] = useState(false);

    const handleChange = useCallback((key, value) => {
        onFilterChange(key, value);
    }, [onFilterChange]);

    const handleClearFilter = useCallback((key) => {
        onFilterChange(key, "");
    }, [onFilterChange]);

    const visibleFilters = filtersConfig.filter(
        (f) => f.alwaysVisible || showMore
    );

    const hasActiveFilters = Object.values(filters).some(value => value && value !== "");

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
                py: 2,
                borderBottom: "1px solid #ddd",
            }}
        >
            {visibleFilters?.map(({ key, label, type, options }) => (
                <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TextField
                        select={type === "select"}
                        label={label}
                        value={filters[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        size="small"
                        sx={{
                            minWidth: 220,
                            '& .MuiOutlinedInput-root': {
                                transition: 'border-color 0.2s ease',
                                ...(isFiltering && filters[key] && {
                                    borderColor: '#1976d2',
                                })
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    >
                        {type === "select" && [
                            <MenuItem key="all" value="">
                                All
                            </MenuItem>,
                            ...(options?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            )) || []),
                        ]}
                    </TextField>

                    {filters[key] && (
                        <Tooltip title={`Clear ${label}`}>
                            <IconButton
                                size="small"
                                onClick={() => handleClearFilter(key)}
                                sx={{
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                        color: '#f44336',
                                    }
                                }}
                            >
                                <X size={16} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            ))}

            {filtersConfig.some((f) => !f.alwaysVisible) && (
                <Button
                    startIcon={showMore ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    onClick={() => setShowMore(!showMore)}
                    variant="text"
                >
                    {showMore ? "Less Filters" : "More Filters"}
                </Button>
            )}

            <Button
                variant="outlined"
                color="secondary"
                startIcon={<Filter size={18} />}
                onClick={onClearAll}
                disabled={!hasActiveFilters}
                sx={{
                    transition: 'all 0.2s ease',
                    ...(hasActiveFilters && {
                        borderColor: '#f44336',
                        color: '#f44336',
                        '&:hover': {
                            borderColor: '#f44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        }
                    })
                }}
            >
                Clear All
            </Button>
        </Box>
    );
};

export default FilterBar;