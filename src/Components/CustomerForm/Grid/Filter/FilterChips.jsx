import React, { memo } from 'react';
import { Box, Chip, Button, Typography } from '@mui/material';
import { X, FilterX } from 'lucide-react';
import './FilterChips.scss';

const FilterChips = ({
  filterChips = [],
  onRemoveFilter,
  onClearAll,
  showClearAll = true
}) => {
  if (filterChips.length === 0) {
    return null;
  }

  const getChipColor = (type) => {
    switch (type) {
      case 'main':
        return 'primary';
      case 'advanced':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const formatChipLabel = (chip) => {
    const maxLength = 20;
    const displayValue = typeof chip.value === 'string' ? chip.value : String(chip.value);
    const truncatedValue = displayValue.length > maxLength
      ? `${displayValue.substring(0, maxLength)}...`
      : displayValue;

    return `${chip.label}: ${truncatedValue}`;
  };

  return (
    <Box className="filter-chips-container">
      <Box className="filter-chips-header">
        <Box className="filter-chips-box">
          <Typography variant="body2" className="filter-chips-title">
            Active Filters ({filterChips.length})
          </Typography>
          <Box className="filter-chips-list">
            {filterChips.map((chip) => (
              <Chip
                key={`${chip.type}-${chip.key}`}
                label={formatChipLabel(chip)}
                variant="filled"
                size="small"
                onDelete={() => onRemoveFilter(chip.key)}
                deleteIcon={<X size={14} />}
                className={`filter-chip filter-chip-${chip.type}`}
                title={`${chip.label}: ${chip.value}`}
              />
            ))}
          </Box>
        </Box>
        {showClearAll && filterChips.length > 0 && (
          <Button
            size="small"
            variant="text"
            color="error"
            startIcon={<FilterX size={16} />}
            onClick={onClearAll}
            className="clear-all-btn"
          >
            Clear All
          </Button>
        )}
      </Box>

    </Box>
  );
};

// Memoize to prevent unnecessary re-renders
const areEqual = (prevProps, nextProps) => {
  if (prevProps.filterChips.length !== nextProps.filterChips.length) {
    return false;
  }

  if (prevProps.showClearAll !== nextProps.showClearAll) {
    return false;
  }


  // Compare each chip
  for (let i = 0; i < prevProps.filterChips.length; i++) {
    const prevChip = prevProps.filterChips[i];
    const nextChip = nextProps.filterChips[i];

    if (
      prevChip.key !== nextChip.key ||
      prevChip.label !== nextChip.label ||
      prevChip.value !== nextChip.value ||
      prevChip.type !== nextChip.type
    ) {
      return false;
    }
  }

  return true;
};

export default memo(FilterChips, areEqual);
