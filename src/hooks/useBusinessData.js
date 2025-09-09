import { useMemo } from "react";

export function useBusinessData(
  data = [],
  debouncedFilters = {},
  hasActiveFilters = false,
  businessType = "supplier"
) {
  const { filteredData, summaryData } = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return { filteredData: [], summaryData: {} };
    }

    // Pre-process data for faster searching if not already done
    const processedData = data.map(item => {
      if (item._searchText) return item;

      const searchableValues = [
        item.firstName,
        item.middleName,
        item.lastName,
        item.firmName,
        item.userId,
        item.code,
        item.purityRatio,
        ...(businessType === "manufacturer" && item.brands ? 
          (Array.isArray(item.brands) ? item.brands : [item.brands]) : [])
      ];

      return {
        ...item,
        _searchText: searchableValues.join(' ').toLowerCase(),
        _lowered: {
          firmName: String(item.firmName || '').toLowerCase(),
          firstName: String(item.firstName || '').toLowerCase(),
          lastName: String(item.lastName || '').toLowerCase(),
          code: String(item.code || '').toLowerCase(),
          userId: String(item.userId || '').toLowerCase(),
          purityRatio: String(item.purityRatio || '').toLowerCase()
        },
        // Format brands for manufacturer
        ...(businessType === "manufacturer" && {
          brands: Array.isArray(item.brands) ? item.brands.join(', ') : item.brands || ''
        })
      };
    });

    // Filter data if there are active filters
    const filtered = hasActiveFilters
      ? processedData.filter(item => {
          return Object.entries(debouncedFilters).every(([key, value]) => {
            if (!value) return true;
            const filterVal = String(typeof value === 'object' ? value?.labelname : value).toLowerCase().trim();
            
            switch (key) {
              case 'globalSearch':
              case 'search':
                return item._searchText.includes(filterVal);
              
              case 'status':
              case 'active':
                return item.active === (value === "Active");
                
              case 'firmName':
                return item._lowered.firmName === filterVal;
                
              case 'firstName':
                return item._lowered.firstName === filterVal;
                
              case 'lastName':
                return item._lowered.lastName === filterVal;
                
              case 'code':
                return item._lowered.code === filterVal;
                
              case 'userId':
                return item._lowered.userId === filterVal;
                
              case 'roaming':
                return item.roaming === (value === "Enabled");
                
              case 'melt':
                return item.melt === (value === "Enabled");
                
              case 'login':
                return item.login === (value === "Enabled");
                
              case 'purityRatio':
                return item._lowered.purityRatio.includes(filterVal);
                
              case 'brand':
                return businessType === "manufacturer" && 
                       item.brands && 
                       item.brands.toLowerCase().includes(filterVal);
                
              default:
                const itemValue = item[key];
                return itemValue != null && String(itemValue).toLowerCase().includes(filterVal);
            }
          });
        })
      : processedData;

    // Calculate summary data
    const total = filtered.length;
    const active = filtered.filter(item => item.active === true).length;
    const roamingEnabled = filtered.filter(item => item.roaming === true).length;
    const meltEnabled = filtered.filter(item => item.melt === true).length;
    const loginEnabled = filtered.filter(item => item.login === true).length;
    
    // Create summary based on business type
    const summary = businessType === "supplier" ? {
      totalSuppliers: total,
      activeSuppliers: active,
      inactiveSuppliers: total - active,
      roamingEnabled,
      meltEnabled,
      loginEnabled,
    } : {
      totalManufacturers: total,
      activeManufacturers: active,
      inactiveManufacturers: total - active,
      roaming: roamingEnabled,
      meltEnabled,
      loginEnabled,
    };

    return { filteredData: filtered, summaryData: summary };
  }, [data, debouncedFilters, hasActiveFilters, businessType]);

  return { filteredData, summaryData };
}
