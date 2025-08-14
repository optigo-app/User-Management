import React from "react";
import { Grid } from "@mui/material";
import { Users, CheckCircle, TrendingUp, Clock, XCircle } from "lucide-react";
import SummaryCard from "../../../Ui/SummaryCard";

export default function CustomerSummary({ summary }) {
    return (
        <Grid container spacing={2}>
            <Grid size={{xs:12, sm:4, md:2}}>
                <SummaryCard value={summary.totalCustomers} label="Total Customers" icon={<Users />} color="blue" />
            </Grid>
            <Grid size={{xs:12, sm:4, md:2}}>
                <SummaryCard value={summary.activeUsers} label="Active Users" icon={<Users />} color="green" />
            </Grid>
            <Grid size={{xs:12, sm:4, md:2}}>
                <SummaryCard value={summary.avgPurity} label="Avg Purity" icon={<TrendingUp />} color="purple" />
            </Grid>
            <Grid size={{xs:12, sm:4, md:2}}>
                <SummaryCard value={summary.premiumPackage} label="Premium Package" icon={<CheckCircle />} color="green" />
            </Grid>
            <Grid size={{xs:12, sm:4, md:2}}>
                <SummaryCard value={summary.policyDueSoon} label="Policy Due Soon" icon={<Clock />} color="orange" />
            </Grid>
            <Grid size={{xs:12, sm:4, md:2}}>
                <SummaryCard value={summary.inactiveUsers} label="Inactive Users" icon={<XCircle />} color="red" />
            </Grid>
        </Grid>
    );
}
