import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Users, Truck, Factory, Briefcase, ArrowRight, BriefcaseBusinessIcon } from "lucide-react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <Box className="home-container">
            {/* Header */}
            <Box className="header">
                <Typography className="logo">Optigo</Typography>
                <Box className="nav-links">
                    <Typography className="nav-link">Features</Typography>
                    <Typography className="nav-link">About</Typography>
                    <Typography className="nav-link">Contact</Typography>
                </Box>
            </Box>

            {/* Hero Section */}
            <Box className="hero-section">
                <Box className="hero-content">
                    <Typography variant="h2" component="h1" className="hero-title">
                        Streamline Your Business Operations
                    </Typography>
                    <Typography variant="h6" component="p" className="hero-subtitle">
                        Comprehensive management platform for customers, suppliers, manufacturing, and employees
                    </Typography>
                    <Box className="hero-actions">
                        <Button
                            variant="contained"
                            size="large"
                            className="cta-primary"
                            startIcon={<BriefcaseBusinessIcon />}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            className="cta-secondary"
                        >
                            Learn More
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Main Cards */}
            <Box className="modules-section">
                <Typography variant="h5" className="section-title">
                    Management Modules
                </Typography>
                <Grid container spacing={3} className="modules-grid">
                    {[
                        {
                            icon: <Users size={24} />,
                            title: "Customers",
                            desc: "Manage customer data and relationships",
                            link: "customers",
                        },
                        {
                            icon: <Truck size={24} />,
                            title: "Suppliers",
                            desc: "Track suppliers and procurement",
                            link: "suppliers",
                        },
                        {
                            icon: <Factory size={24} />,
                            title: "Manufacturers",
                            desc: "Oversee production and inventory",
                            link: "manufacturer",
                        },
                        {
                            icon: <Briefcase size={24} />,
                            title: "Employees",
                            desc: "Manage HR and employee records",
                            link: "employer",
                        },
                    ].map((module, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Card className="module-card" onClick={() => handleClick(module.link)}>
                                <CardContent className="module-content">
                                    <Box className="module-icon">
                                        {module.icon}
                                    </Box>
                                    <Typography variant="h6" className="module-title">
                                        {module.title}
                                    </Typography>
                                    <Typography variant="body2" className="module-desc">
                                        {module.desc}
                                    </Typography>
                                    <Box className="module-arrow">
                                        <ArrowRight size={16} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Footer */}
            <Box className="footer">
                <Typography variant="body2" className="footer-text">
                    © 2025 Optigo. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;
