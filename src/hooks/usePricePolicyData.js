import { useMemo } from 'react';

// Build a searchable string for each row
const buildSearchText = (item) => {
  const fields = [
    'manufacturer','brand','productType','collection','category','style','makeType','metalType',
    'labourSet','lessPolicy','purWastage','purMaking','salesWastage','salesMaking',
    'purMetalLoss','saleMetalLoss','mrpDiscount','weightRange','weightRangeOn','srNo','id'
  ];
  return fields
    .map((k) => (item?.[k] != null ? String(item[k]) : ''))
    .join(' | ')
    .toLowerCase();
};

export function usePricePolicyData(data = [], debouncedFilters = {}, hasActiveFilters = false) {
  const processedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      ...item,
      _searchText: buildSearchText(item),
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    if (!hasActiveFilters || !debouncedFilters) return processedData;

    return processedData.filter((item) => {
      return Object.entries(debouncedFilters).every(([key, value]) => {
        if (value == null || value === '') return true;
        const filterVal = String(typeof value === 'object' ? value?.labelname ?? value?.value : value)
          .toLowerCase()
          .trim();

        switch (key) {
          case 'globalSearch':
            return item._searchText.includes(filterVal);
          default: {
            const v = item[key];
            return v != null && String(v).toLowerCase().includes(filterVal);
          }
        }
      });
    });
  }, [processedData, debouncedFilters, hasActiveFilters]);

  return { filteredData };
}
