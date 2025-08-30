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

export const useDebounceFilters = (initialFilters = {}, delay = 300) => {
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);
  const debounceRef = useRef(null);
  const prevFiltersRef = useRef(initialFilters);

  // Only update debounced filters if they've actually changed
  useEffect(() => {
    if (areFiltersEqual(filters, prevFiltersRef.current)) {
      return;
    }
    
    prevFiltersRef.current = filters;
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedFilters({...filters});
    }, delay);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [filters, delay]);

  // Memoize the updateFilter function to prevent unnecessary re-renders
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => {
      // Skip update if value hasn't changed
      if (prev[key] === value || 
          (typeof prev[key] === 'object' && JSON.stringify(prev[key]) === JSON.stringify(value))) {
        return prev;
      }
      return {
        ...prev,
        [key]: value
      };
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setDebouncedFilters({});
  }, []);

  const clearFilter = useCallback((key) => {
    setFilters(prev => {
      if (!(key in prev)) return prev;
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  // Memoize derived values
  const { isFiltering, hasActiveFilters } = useMemo(() => ({
    isFiltering: !areFiltersEqual(filters, debouncedFilters),
    hasActiveFilters: Object.values(filters).some(value => 
      value !== undefined && 
      value !== null && 
      value !== '' && 
      !(Array.isArray(value) && value.length === 0)
    )
  }), [filters, debouncedFilters]);

  return useMemo(() => ({
    filters,
    debouncedFilters,
    updateFilter,
    clearAllFilters,
    clearFilter,
    isFiltering,
    hasActiveFilters,
    setFilters
  }), [
    filters, 
    debouncedFilters, 
    updateFilter, 
    clearAllFilters, 
    clearFilter, 
    isFiltering, 
    hasActiveFilters
  ]);
};