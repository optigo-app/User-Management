import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const areFiltersEqual = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every(key => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === bVal) return true;
    if (aVal == null || bVal == null) return false;

    // Handle object comparison for filter values
    if (typeof aVal === 'object' && aVal !== null) {
      return JSON.stringify(aVal) === JSON.stringify(bVal);
    }

    return String(aVal) === String(bVal);
  });
};

const isValidFilterValue = (value) => {
  return value !== undefined &&
    value !== null &&
    value !== '' &&
    !(Array.isArray(value) && value.length === 0);
};

export const useAdvancedFilters = (initialFilters = {}, delay = 300) => {
  const [mainFilters, setMainFilters] = useState(initialFilters);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);
  const debounceRef = useRef(null);
  const prevFiltersRef = useRef(initialFilters);
  const allFilters = useMemo(() => ({ ...mainFilters, ...advancedFilters }), [mainFilters, advancedFilters]);
  
  useEffect(() => {
    if (areFiltersEqual(allFilters, prevFiltersRef.current)) {
      return;
    }
    prevFiltersRef.current = allFilters;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedFilters({ ...allFilters });
    }, delay);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [allFilters, delay]);

  const updateMainFilter = useCallback((key, value) => {
    setMainFilters(prev => {
      if (prev[key] === value ||
        (typeof prev[key] === 'object' && prev[key] !== null && JSON.stringify(prev[key]) === JSON.stringify(value))) {
        return prev;
      }
      if (!isValidFilterValue(value)) {
        const { [key]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const applyAdvancedFilters = useCallback((filters) => {
    const validFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (isValidFilterValue(value)) {
        acc[key] = value;
      }
      return acc;
    }, {});

    setAdvancedFilters(validFilters);
  }, []);

  const clearFilter = useCallback((key) => {
    setMainFilters(prev => {
      if (!(key in prev)) return prev;
      const { [key]: removed, ...rest } = prev;
      return rest;
    });

    setAdvancedFilters(prev => {
      if (!(key in prev)) return prev;
      const { [key]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearMainFilters = useCallback(() => {
    setMainFilters({});
  }, []);

  const clearAdvancedFilters = useCallback(() => {
    setAdvancedFilters({});
  }, []);

  const clearAllFilters = useCallback(() => {
    setMainFilters({});
    setAdvancedFilters({});
    setDebouncedFilters({});
  }, []);

  const getFilterChips = useCallback(() => {
    const chips = [];
    const createChip = (key, value, type) => ({
      key,
      label: key,
      value: typeof value === 'object' ? value.labelname || value.label || JSON.stringify(value) : value,
      type
    });

    Object.entries(mainFilters).forEach(([key, value]) => {
      if (isValidFilterValue(value)) {
        chips.push(createChip(key, value, 'main'));
      }
    });

    Object.entries(advancedFilters).forEach(([key, value]) => {
      if (isValidFilterValue(value)) {
        chips.push(createChip(key, value, 'advanced'));
      }
    });

    return chips;
  }, [mainFilters, advancedFilters]);

  const { isFiltering, hasActiveFilters, hasMainFilters, hasAdvancedFilters } = useMemo(() => ({
    isFiltering: !areFiltersEqual(allFilters, debouncedFilters),
    hasActiveFilters: Object.values(allFilters).some(isValidFilterValue),
    hasMainFilters: Object.values(mainFilters).some(isValidFilterValue),
    hasAdvancedFilters: Object.values(advancedFilters).some(isValidFilterValue)
  }), [allFilters, debouncedFilters, mainFilters, advancedFilters]);

  return useMemo(() => ({
    mainFilters,
    updateMainFilter,
    clearMainFilters,
    hasMainFilters,
    advancedFilters,
    applyAdvancedFilters,
    clearAdvancedFilters,
    hasAdvancedFilters,
    allFilters,
    debouncedFilters,
    clearAllFilters,
    clearFilter,
    getFilterChips,
    isFiltering,
    hasActiveFilters,
    filters: allFilters,
    debouncedFilters,
    updateFilter: updateMainFilter,
    setFilters: setMainFilters
  }), [
    mainFilters,
    updateMainFilter,
    clearMainFilters,
    hasMainFilters,
    advancedFilters,
    applyAdvancedFilters,
    clearAdvancedFilters,
    hasAdvancedFilters,
    allFilters,
    debouncedFilters,
    clearAllFilters,
    clearFilter,
    getFilterChips,
    isFiltering,
    hasActiveFilters
  ]);
};
