import { useState, useEffect, useRef, useCallback } from 'react';

export const useDebounceFilters = (initialFilters = {}, delay = 500) => {
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
    }, delay);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [filters, delay]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setDebouncedFilters({});
  }, []);

  const clearFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const isFiltering = JSON.stringify(filters) !== JSON.stringify(debouncedFilters);
  const hasActiveFilters = Object.values(filters).some(value => value && value !== "");

  return {
    filters,
    debouncedFilters,
    updateFilter,
    clearAllFilters,
    clearFilter,
    isFiltering,
    hasActiveFilters,
    setFilters
  };
};