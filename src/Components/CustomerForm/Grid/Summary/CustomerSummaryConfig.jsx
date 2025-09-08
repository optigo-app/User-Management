import React, { memo } from 'react'
import CustomerSummary from './CustomerSummary';
import { CheckCircle, Clock, TrendingUp, Users, XCircle } from 'lucide-react';
import { Box } from '@mui/material';

const CustomerSummaryConfig = ({ showSummary, custActive, summaryData }) => {
    const summaryConfig = React.useMemo(() => {
        if (custActive === "customer") {
            return [
                { label: "Total Customers", value: summaryData.totalCustomers, icon: <Users />, color: "blue" },
                { label: "Active Customers", value: summaryData.activeUsers, icon: <Users />, color: "green" },
                { label: "Premium Package", value: summaryData.premiumPackage, icon: <CheckCircle />, color: "green" },
                { label: "Policy Due Soon", value: summaryData.policyDueSoon, icon: <Clock />, color: "orange" },
                { label: "Inactive Customers", value: summaryData.inactiveUsers, icon: <XCircle />, color: "red" },
            ];
        } else if (custActive === "lead") {
            return [
                { label: "Total Leads", value: summaryData.totalLeads, icon: <Users />, color: "blue" },
                { label: "Verified Leads", value: summaryData.verifiedLeads, icon: <CheckCircle />, color: "green" },
                { label: "Rejected Leads", value: summaryData.rejectedLeads, icon: <XCircle />, color: "red" },
                { label: "Premium Leads", value: summaryData.premiumLeads, icon: <TrendingUp />, color: "purple" },
                { label: "Active Cities", value: summaryData.activeCities, icon: <Clock />, color: "orange" },
            ];
        } else if (custActive === "manufacturer") {
            return [
                { label: "Total Manufacturers", value: summaryData.totalManufacturers, icon: <Users />, color: "blue" },
                { label: "Active Manufacturers", value: summaryData.activeManufacturers, icon: <Users />, color: "green" },
                { label: "Inactive Manufacturers", value: summaryData.inactiveManufacturers, icon: <XCircle />, color: "red" },
                { label: "Roaming", value: summaryData.roaming, icon: <Users />, color: "blue" },
                { label: "Melt Enabled", value: summaryData.meltEnabled, icon: <Users />, color: "blue" },
            ];
        }
        return [];
    }, [custActive, summaryData]);

    return (
        <>
            {showSummary && (
                <Box sx={{ mt: 2, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <CustomerSummary config={summaryConfig} />
                </Box>
            )}
        </>
    )
}

export default memo(CustomerSummaryConfig)