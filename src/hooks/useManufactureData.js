import { useMemo } from "react";

export const useManufactureData = (data, debouncedFilters, hasActiveFilters) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      _searchText: `${item.userId} ${item.code} ${item.firstName} ${item.middleName} ${item.lastName} ${item.firmName} ${item.purityRatio} ${item.brands?.join(' ')}`.toLowerCase(),
      brands: Array.isArray(item.brands) ? item.brands.join(', ') : item.brands || '',
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    if (!hasActiveFilters) return processedData;

    return processedData.filter(item => {
      // Search filter
      if (debouncedFilters.search && !item._searchText.includes(debouncedFilters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (debouncedFilters.active) {
        const isActive = debouncedFilters.active === 'Active';
        if (item.active !== isActive) return false;
      }

      // Roaming filter
      if (debouncedFilters.roaming) {
        const isRoaming = debouncedFilters.roaming === 'Enabled';
        if (item.roaming !== isRoaming) return false;
      }

      // Melt filter
      if (debouncedFilters.melt) {
        const isMelt = debouncedFilters.melt === 'Enabled';
        if (item.melt !== isMelt) return false;
      }

      // Login filter
      if (debouncedFilters.login) {
        const isLogin = debouncedFilters.login === 'Enabled';
        if (item.login !== isLogin) return false;
      }

      // Firm Name filter
      if (debouncedFilters.firmName && !item.firmName.toLowerCase().includes(debouncedFilters.firmName.toLowerCase())) {
        return false;
      }

      // Purity Ratio filter
      if (debouncedFilters.purityRatio && !item.purityRatio.toLowerCase().includes(debouncedFilters.purityRatio.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [processedData, debouncedFilters, hasActiveFilters]);

  const summaryData = useMemo(() => {
    const totalManufacturers = filteredData.length;
    const activeManufacturers = filteredData.filter(item => item.active).length;
    const inactiveManufacturers = totalManufacturers - activeManufacturers;
    const roaming = filteredData.filter(item => item.roaming).length;
    const meltEnabled = filteredData.filter(item => item.melt).length;
    const loginEnabled = filteredData.filter(item => item.login).length;

    return {
      totalManufacturers,
      activeManufacturers,
      inactiveManufacturers,
      roaming,
      meltEnabled,
      loginEnabled,
    };
  }, [filteredData]);

  return { filteredData, summaryData };
};
