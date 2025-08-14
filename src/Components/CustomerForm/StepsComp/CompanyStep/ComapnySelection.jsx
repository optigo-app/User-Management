import React from "react";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    RadioGroup,
    FormControlLabel,
    Typography,
    Grid,
    Radio,
} from "@mui/material";
import { Building2 } from "lucide-react";

export default function CompanySelection({ companyType, onCompanyTypeChange }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Card variant="outlined" sx={{ border: "2px dashed", borderColor: "grey.300" }}>
                <CardHeader
                    avatar={<Building2 size={20} />}
                    title="Company Selection"
                    subheader="Choose how you want to set up the company information"
                />
                <CardContent>
                    <RadioGroup
                        value={companyType}
                        onChange={(e) => onCompanyTypeChange(e.target.value)}
                    >
                        <Grid container rowSpacing={0} columnSpacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        cursor: "pointer",
                                        "&:hover": { bgcolor: "action.hover" },
                                        border: companyType === "existing" ? "2px solid" : "1px solid",
                                        borderColor: companyType === "existing" ? "primary.main" : "grey.300",
                                    }}
                                >
                                    <FormControlLabel
                                        value="existing"
                                        control={<Radio />}
                                        label={
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    Select Existing Company
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Link to a company already in the system
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{ margin: 0, alignItems: "flex-start" }}
                                    />
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        cursor: "pointer",
                                        "&:hover": { bgcolor: "action.hover" },
                                        border: companyType === "new" ? "2px solid" : "1px solid",
                                        borderColor: companyType === "new" ? "primary.main" : "grey.300",
                                    }}
                                >
                                    <FormControlLabel
                                        value="new"
                                        control={<Radio />}
                                        label={
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    Create New Company
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Set up a completely new company profile
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{ margin: 0, alignItems: "flex-start" }}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </CardContent>
            </Card>
        </Box>
    );
}
