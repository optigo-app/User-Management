import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { User, Truck, DollarSign, Zap, Phone, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { goToStep } from "../../../../Redux/customerFormSlice";

export default function RegistrationComplete({ shippingAddresses }) {
    const currentStep = useSelector((state) => state.customerForm.currentStep);
    const dispatch = useDispatch();

    const handleGotoStep = (stepName) => {
        setTimeout(() => {
            dispatch(goToStep(stepName));
        }, 300);
    }

    return (
        <Box sx={{ "& > *:not(:last-child)": { mb: 6 } }}>
            <Box>
                <Grid container spacing={2}>
                    {[
                        {
                            icon: <User size={20} color="#2563eb" />,
                            title: "Personal Information",
                            subtitle: "Complete profile details",
                            stepName: 2,
                        },
                        {
                            icon: <Truck size={20} color="#16a34a" />,
                            title: "Shipping Setup",
                            subtitle: `${shippingAddresses.length} addresses configured`,
                            stepName: 3,
                        },
                        {
                            icon: <DollarSign size={20} color="#7c3aed" />,
                            title: "Payment Terms",
                            subtitle: "Pricing and payment configured",
                            stepName: 4,
                        },
                        {
                            icon: <Zap size={20} color="#ea580c" />,
                            title: "Account Ready",
                            subtitle: "Ready for transactions",
                            stepName: 5,
                        },
                    ]?.map(({ icon, title, subtitle, stepName }, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                px={2}
                                py={1}
                                bgcolor="#f0fdf4"
                                borderRadius={2}
                                sx={{ cursor: 'pointer', border: '1px solid #16a34a36' }}
                                onClick={() => handleGotoStep(stepName)}

                            >
                                {icon}
                                <Box flex={1}>
                                    <Typography fontWeight="medium">{title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {subtitle}
                                    </Typography>
                                </Box>
                                <Check size={16} color="#16a34a" />
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Box mt={3} px={2} py={1} borderRadius={2} bgcolor="#f0fdf4" border="1px solid #16a34a36">

                    <Box display="flex" gap={2} alignItems="center">
                        <Phone size={20} color="#2563eb" />
                        <Box>
                            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                                Next Steps
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Your account will be activated within 24 hours. You'll receive login credentials via email and
                                can start placing orders immediately.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
