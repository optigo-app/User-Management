import { useMemo } from "react";
import { formatDate } from "../Utils/globalFuc";

export function useCustomerAndLeadData(
  data,
  debouncedFilters,
  hasActiveFilters,
  custActive = "customer"
) {
  // 🔹 Preprocess (lowercased version for search)
  const preprocessedData = useMemo(() => {
    return data?.map((item) => {
      const lowered = {};
      for (let key in item) {
        lowered[key] =
          typeof item[key] === "string" ? item[key].toLowerCase() : item[key];
      }
      return { ...item, _lowered: lowered };
    });
  }, [data]);

  // 🔹 Filtering (works for both customers & leads)
  const filteredData = useMemo(() => {
    if (!hasActiveFilters) return preprocessedData;

    return preprocessedData.filter((item) =>
      Object.entries(debouncedFilters).every(([key, value]) => {
        if (!value) return true;

        const filterVal = value.toString().toLowerCase().trim();
        if (key === "globalSearch") {
          return Object.entries(item._lowered).some(([fieldKey, val]) => {
            if (!val) return false;

            // Date fields
            if (fieldKey === "joiningDate" || fieldKey === "dateOfBirth") {
              const formattedDate = formatDate(val);
              return formattedDate.includes(filterVal);
            }

            return val.toString().includes(filterVal);
          });
        }

        const itemValue = item._lowered[key];
        if (itemValue == null) return false;

        return itemValue.toString().includes(filterVal);
      })
    );
  }, [debouncedFilters, hasActiveFilters, preprocessedData]);

  // 🔹 Summary (different for customers vs leads)
  const summaryData = useMemo(() => {
    if (custActive === "customer") {
      const totalCustomers = data?.length ?? 0;
      const activeUsers = data?.filter((c) => c.status === "active").length ?? 0;
      const avgPurity =
        totalCustomers > 0
          ? (
            data.reduce((sum, c) => sum + (c.purity || 0), 0) / totalCustomers
          ).toFixed(1) + "%"
          : "0%";
      const premiumPackage =
        data?.filter((c) => c.package === "premium").length ?? 0;
      const policyDueSoon =
        data?.filter((c) => c.policyDueDays <= 30).length ?? 0;
      const inactiveUsers = totalCustomers - activeUsers;

      return {
        totalCustomers,
        activeUsers,
        avgPurity,
        premiumPackage,
        policyDueSoon,
        inactiveUsers,
      };
    }

    if (custActive === "lead") {
      const totalLeads = data?.length ?? 0;
      const verifiedLeads = data?.filter((l) => l.verified).length ?? 0;
      const rejectedLeads = data?.filter((l) => l.Reject === true).length ?? 0;
      const premiumLeads =
        data?.filter((l) => l.eCatalogPackage === "Premium").length ?? 0;
      const standardLeads =
        data?.filter((l) => l.eCatalogPackage === "Standard").length ?? 0;
      const activeCities = new Set(data?.map((l) => l.city)).size ?? 0;

      return {
        totalLeads,
        verifiedLeads,
        rejectedLeads,
        premiumLeads,
        standardLeads,
        activeCities,
      };
    }

    return {};
  }, [data, custActive]);

  return {
    preprocessedData,
    filteredData,
    summaryData,
  };
}
