import React, { useState } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Divider,
    Typography,
} from "@mui/material";
import { DollarSign, Diamond, Gem, Hammer, Settings } from "lucide-react";
import PricePolicyDialog from "./PricePolicyDialog";

const PricePolicyCell = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // Sample price policy data - replace with actual data from row
    const pricePolicies = row?.pricePolicies || [
        {
            name: "Diamond",
            icon: "Diamond",
            color: "#e3f2fd",
            borderColor: "#2196f3",
            value:"A_diamond",
            levels: [
                { level: "VVS1", value: "₹5,500/ct" },
                { level: "VVS2", value: "₹5,200/ct" },
                { level: "VS1", value: "₹4,800/ct" },
                { level: "VS2", value: "₹4,500/ct" },
                { level: "SI1", value: "₹4,000/ct" },
                { level: "SI2", value: "₹3,500/ct" }
            ]
        },
        {
            name: "ColorStone / Misc / Services Price",
            icon: "Gem",
            color: "#f3e5f5",
            borderColor: "#9c27b0",
            value:"Am_CS",
            levels: [
                { level: "Ruby Premium", value: "₹2,500/ct" },
                { level: "Ruby Standard", value: "₹2,000/ct" },
                { level: "Emerald Premium", value: "₹3,000/ct" },
                { level: "Emerald Standard", value: "₹2,200/ct" },
                { level: "Sapphire Premium", value: "₹2,800/ct" },
                { level: "Misc Services", value: "₹500/pc" }
            ]
        },
        {
            name: "Labour Policy",
            icon: "Hammer",
            color: "#fff3e0",
            borderColor: "#ff9800",
            value:"AA1_dia",
            levels: [
                { level: "Ring Making", value: "₹800/pc" },
                { level: "Pendant Making", value: "₹600/pc" },
                { level: "Earring Making", value: "₹1,200/pair" },
                { level: "Bracelet Making", value: "₹1,500/pc" },
                { level: "Chain Making", value: "₹200/gm" },
                { level: "Repair Work", value: "₹300/hr" }
            ]
        },
        {
            name: "Setting / Secondary Metal Price",
            icon: "Settings",
            color: "#e8f5e8",
            borderColor: "#4caf50",
            value:"A-finding",
            levels: [
                { level: "Gold 22K", value: "₹6,200/gm" },
                { level: "Gold 18K", value: "₹4,800/gm" },
                { level: "Silver 925", value: "₹85/gm" },
                { level: "Platinum", value: "₹3,200/gm" },
                { level: "Palladium", value: "₹4,500/gm" },
                { level: "White Gold", value: "₹5,200/gm" }
            ]
        }
    ];

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleSelectPolicy = (policy) => {
        setSelectedPolicy(policy);
        setAnchorEl(null);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPolicy(null);
    };

    const getIcon = (iconName) => {
        const icons = {
            Diamond: Diamond,
            Gem: Gem,
            Hammer: Hammer,
            Settings: Settings
        };
        const IconComponent = icons[iconName] || DollarSign;
        return <IconComponent size={18} />;
    };

    return (
        <>
            {/* Price Policy Icon */}
            <Tooltip title="View Price Policy">
                <IconButton onClick={handleOpenMenu}>
                    <DollarSign size={18} color="gray" />
                </IconButton>
            </Tooltip>

            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 6,
                    sx: { minWidth: 280, borderRadius: 2, p: 1 },
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ px: 1.5, py: 0.5, color: "text.secondary" }}
                >
                    Price Policy Categories
                </Typography>
                <Divider sx={{ mb: 1 }} />
                {pricePolicies?.map((policy, i) => (
                    <MenuItem
                        key={i}
                        onClick={() => handleSelectPolicy(policy)}
                        sx={{ 
                            borderRadius: 1, 
                            "&:hover": { backgroundColor: "action.hover" },
                            mb: 0.5
                        }}
                    >
                        <ListItemIcon sx={{ color: policy.borderColor }}>
                            {getIcon(policy.icon)}
                        </ListItemIcon>
                        <ListItemText
                            primary={policy.name}
                            secondary={policy.value}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 500, color:'text.secondary' }}
                            secondaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: policy.borderColor }}
                        />
                    </MenuItem>
                ))}
            </Menu>

            {/* Price Policy Dialog */}
            <PricePolicyDialog
                open={openModal}
                onClose={handleCloseModal}
                selectedPolicy={selectedPolicy}
            />
        </>
    );
};

export default PricePolicyCell;
