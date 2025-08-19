import { useMemo } from "react";
import { formatDate } from "../Utils/globalFuc";

export function useCustomerData(data, debouncedFilters, hasActiveFilters) {
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

    const filteredCustomerData = useMemo(() => {
        if (!hasActiveFilters) return preprocessedData;

        return preprocessedData.filter((item) =>
            Object.entries(debouncedFilters).every(([key, value]) => {
                if (!value) return true;

                const filterVal = value.toString().toLowerCase().trim();
                if (key === "globalSearch") {
                    return Object.entries(item._lowered).some(([fieldKey, val]) => {
                        if (!val) return false;
                        if (fieldKey === "dateOfBirth" || fieldKey === "joiningDate") {
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

    const summaryData = useMemo(() => {
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
    }, [data]);

    return {
        preprocessedData,
        filteredCustomerData,
        summaryData,
    };
}
