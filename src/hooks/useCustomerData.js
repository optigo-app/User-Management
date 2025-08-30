import { useMemo } from "react";
import { formatDate } from "../Utils/globalFuc";

export function useCustomerAndLeadData(
  data = [],
  debouncedFilters = {},
  hasActiveFilters = false,
  custActive = "customer"
) {
  const { filteredData, summaryData } = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return { filteredData: [], summaryData: {} };
    }

    // Pre-process data for faster searching if not already done
    const processedData = data.map(item => {
      if (item._searchText) return item;

      const searchableValues = [
        item.customerName,
        item.email,
        item.mobileNo,
        item.city,
        item.state,
        item.country,
        item.ecatAdhocPackage,
        item.designation,
        item.department,
        item.location,
        formatDate(item.joiningDate),
        formatDate(item.dateOfBirth)
      ];

      return {
        ...item,
        _searchText: searchableValues.join(' ').toLowerCase(),
        _lowered: {
          ecatAdhocPackage: String(item.ecatAdhocPackage || '').toLowerCase(),
          customerName: String(item.customerName || '').toLowerCase(),
          designation: String(item.designation || '').toLowerCase(),
          department: String(item.department || '').toLowerCase(),
          location: String(item.location || '').toLowerCase()
        }
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
                return item._searchText.includes(filterVal);
              
              case 'status':
                return item.active === (value === "Active");
                
              case 'ecatName':
                return item._lowered.ecatAdhocPackage === filterVal;
                
              case 'users':
                return item._lowered.customerName === filterVal;
                
              case 'designation':
                return item._lowered.designation === filterVal;
                
              case 'department':
                return item._lowered.department === filterVal;
                
              case 'location':
                return item._lowered.location === filterVal;
                
              case 'roaming':
                return item.roaming === (value === "Roaming on");
                
              default:
                const itemValue = item[key];
                return itemValue != null && String(itemValue).toLowerCase().includes(filterVal);
            }
          });
        })
      : processedData;

    // Calculate summary data
    let summary = {};
    if (custActive === "customer") {
      const total = filtered.length;
      const activeUsers = filtered.filter(c => c.status === "active").length;
      const premiumPackage = filtered.filter(c => c.package === "premium").length;
      const policyDueSoon = filtered.filter(c => c.policyDueDays <= 30).length;
      
      summary = {
        totalCustomers: total,
        activeUsers,
        premiumPackage,
        policyDueSoon,
        inactiveUsers: total - activeUsers,
      };
    } else if (custActive === "lead") {
      const totalLeads = filtered.length;
      const verifiedLeads = filtered.filter(l => l.verified).length;
      const rejectedLeads = filtered.filter(l => l.Reject === true).length;
      const premiumLeads = filtered.filter(l => l.eCatalogPackage === "Premium").length;
      const activeCities = new Set(filtered.map(l => l.city).filter(Boolean)).size;

      summary = {
        totalLeads,
        verifiedLeads,
        rejectedLeads,
        premiumLeads,
        activeCities,
      };
    }

    return { filteredData: filtered, summaryData: summary };
  }, [data, debouncedFilters, hasActiveFilters, custActive]);

  return { filteredData, summaryData };
}
