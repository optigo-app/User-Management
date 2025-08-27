import React, { memo } from "react";
import { Grid } from "@mui/material";
import SummaryCard from "../../../Ui/SummaryCard";

const CustomerSummary = ({ config }) => {
    return (
        <Grid container spacing={2}>
            {config.map(({ label, value, icon, color }, index) => (
                <Grid key={index} size={{ xs: 12, sm: 4, md: 2.4 }}>
                    <SummaryCard value={value} label={label} icon={icon} color={color} />
                </Grid>
            ))}
        </Grid>
    );
}

export default memo(CustomerSummary);