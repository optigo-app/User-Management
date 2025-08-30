import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { Users, Truck, Factory, Briefcase, Star, ShieldCheck, Clock } from "lucide-react";
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
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <Button variant="contained" className="nav-cta">Get Started</Button>
                </Box>
            </Box>

            {/* Hero Section */}
            <Box className="hero-section">
                <Typography variant="h2" component="h1" className="hero-title">
                    Streamline Your <span>Business</span> Operations
                </Typography>
                <Typography variant="h5" component="p" className="hero-subtitle">
                    Manage your customers, suppliers, manufacturing, and employees all in one smart platform.
                </Typography>
                <Button variant="contained" className="cta-button">
                    Start Free Trial
                </Button>
            </Box>

            {/* Main Cards */}
            <Box className="card-section" id="features">
                <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                    {[
                        {
                            icon: <Users size={48} />,
                            title: "Customer Management",
                            desc: "Manage customer data, track interactions, and strengthen relationships.",
                            link: "customers",
                        },
                        {
                            icon: <Truck size={48} />,
                            title: "Supplier Management",
                            desc: "Track suppliers, contracts, and streamline your procurement process.",
                            link: "suppliers",
                        },
                        {
                            icon: <Factory size={48} />,
                            title: "Manufacturer Management",
                            desc: "Oversee production, schedules, and inventory efficiently.",
                            link: "manufacturers",
                        },
                        {
                            icon: <Briefcase size={48} />,
                            title: "Employee Management",
                            desc: "Manage employee records, payroll, and HR operations with ease.",
                            link: "employees",
                        },
                    ]?.map((card, i) => (
                        <Grid size={{xs: 12, sm: 6, md: 3}} key={i}>
                            <Paper elevation={3} className="management-card">
                                <Box className="icon-wrapper">{card.icon}</Box>
                                <Typography variant="h6" className="card-title">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" className="card-description">
                                    {card.desc}
                                </Typography>
                                <Button onClick={() => handleClick(card.link)} className="card-link">
                                    Go to Dashboard →
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Why Choose Us */}
            <Box className="why-choose-section">
                <Typography variant="h4" className="section-title">
                    Why Choose <span>Optigo</span>?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid size={{xs: 12, sm: 4}}>
                        <Box className="why-card">
                            <Star size={40} />
                            <Typography variant="h6">Easy to Use</Typography>
                            <Typography>Intuitive UI that requires minimal training.</Typography>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, sm: 4}}>
                        <Box className="why-card">
                            <ShieldCheck size={40} />
                            <Typography variant="h6">Secure & Reliable</Typography>
                            <Typography>Data protection and 99.9% uptime guaranteed.</Typography>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, sm: 4}}>
                        <Box className="why-card">
                            <Clock size={40} />
                            <Typography variant="h6">Save Time</Typography>
                            <Typography>Automated processes free up valuable hours.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Box component="footer" className="footer">
                <Typography variant="body2">© 2025 Optigo. All rights reserved.</Typography>
                <Box className="footer-links">
                    <a href="#privacy">Privacy</a>
                    <a href="#terms">Terms</a>
                    <a href="#support">Support</a>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
