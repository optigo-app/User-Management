// import React from "react";
// import { Box, Typography } from "@mui/material";

// const Header = () => {
//   return (
//     <Box
//       sx={{
//         py: 2,
//         borderBottom: "1px solid #ddd",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       {/* Left Section */}
//       <Box>
//         <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
//           Customer Management
//         </Typography>
//         <Typography sx={{ fontSize: "14px" }}>
//           Manage customer data, policies, and account information across your
//           business operations.
//         </Typography>
//       </Box>

//       {/* Right Section */}
//       <Box sx={{ display: "flex", gap: 3 }}>
//         {["Customer", "Supplier", "Manufactory", "Employer"].map((item) => (
//           <Typography
//             key={item}
//             sx={{
//               fontSize: "16px",
//               cursor: "pointer",
//               "&:hover": { color: "primary.main" },
//             }}
//           >
//             {item}
//           </Typography>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import { Box, Typography, Tabs, Tab } from "@mui/material";

// const Header = () => {
//   const [value, setValue] = useState(0);

//   return (
//     <Box sx={{ borderBottom: "1px solid #ddd" }}>
//       <Box
//         sx={{
//           py: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Left Section */}
//         <Box>
//           <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
//             Customer Management
//           </Typography>
//           <Typography sx={{ fontSize: "14px" }}>
//             Manage customer data, policies, and account information across your
//             business operations.
//           </Typography>
//         </Box>

//         {/* Right Section (Tabs) */}
//         <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
//           <Tab label="Customer" />
//           <Tab label="Supplier" />
//           <Tab label="Manufactory" />
//           <Tab label="Employer" />
//         </Tabs>
//       </Box>
//     </Box>
//   );
// };

// export default Header;


// import React, { useState } from "react";
// import { Box, Typography, Tabs, Tab } from "@mui/material";

// const Header = () => {
//   const [value, setValue] = useState(0);

//   return (
//     <Box sx={{ borderBottom: "1px solid #ddd" }}>
//       <Box
//         sx={{
//           py: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Left Section */}
//         <Box>
//           <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
//             Customer Management
//           </Typography>
//           <Typography sx={{ fontSize: "14px" }}>
//             Manage customer data, policies, and account information across your
//             business operations.
//           </Typography>
//         </Box>

//         {/* Right Section (Tabs) */}
//         <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
//           <Tab label="Customer" />
//           <Tab label="Supplier" />
//           <Tab label="Manufactory" />
//           <Tab label="Employer" />
//         </Tabs>
//       </Box>
//     </Box>
//   );
// };

// export default Header;

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Truck, Factory, Briefcase, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.toLowerCase();

    // Common header content
    const headerData = {
        "/customers": {
            title: "Customer",
            subtitle: "Manage customer data, policies, and account information across your business operations."
        },
        "/suppliers": {
            title: "Supplier",
            subtitle: "Track suppliers, contracts, and procurement processes efficiently."
        },
        "/manufactorys": {
            title: "Manufactory",
            subtitle: "Manage production units, resources, and manufacturing details."
        },
        "/employer": {
            title: "Employees",
            subtitle: "Handle employee records, payroll, and organizational hierarchy."
        }
    };

    // Navigation buttons config
    const navButtons = [
        { path: "/customers", label: "Customer", icon: <UserRound size={20} /> },
        { path: "/suppliers", label: "Supplier", icon: <Truck size={20} /> },
        { path: "/manufactorys", label: "Manufactory", icon: <Factory size={20} /> },
        { path: "/employer", label: "Employees", icon: <Briefcase size={20} /> }
    ];

    const current = headerData[path] || {
        title: "Dashboard",
        subtitle: "Overview of your business operations."
    };

    return (
        <Box
            sx={{
                py: 2,
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {/* Left Section */}
            <Box>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                    {current.title}
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                    {current.subtitle}
                </Typography>
            </Box>

            {/* Right Section - Dynamic Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
                {navButtons.map((btn) => (
                    <Button
                        key={btn.path}
                        variant="text"
                        startIcon={btn.icon}
                        onClick={() => navigate(btn.path)}
                        sx={{
                            textTransform: "capitalize",
                            background: "transparent !important",
                            boxShadow: "none",
                            fontSize: "16.5px",
                            color: path === btn.path ? "primary.main" : "#000000de",
                        }}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default Header;



// import React, { useState } from "react";
// import './style.scss'
// import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

// const Header = () => {
//   const [selected, setSelected] = useState("Customer");

//   const handleChange = (event, newValue) => {
//     if (newValue !== null) {
//       setSelected(newValue);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         py: 2,
//         borderBottom: "1px solid #ddd",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       {/* Left Section */}
//       <Box>
//         <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
//           Customer Management
//         </Typography>
//         <Typography sx={{ fontSize: "14px" }}>
//           Manage customer data, policies, and account information across your
//           business operations.
//         </Typography>
//       </Box>

//       <Box className="toggle-group-container">
//       <ToggleButtonGroup
//         value={selected}
//         exclusive
//         onChange={handleChange}
//         className="toggle-group"
//       >
//         <ToggleButton className="toggle-button" value="Customer">Customer</ToggleButton>
//         <ToggleButton className="toggle-button" value="Supplier">Supplier</ToggleButton>
//         <ToggleButton className="toggle-button" value="Manufactory">Manufactory</ToggleButton>
//         <ToggleButton className="toggle-button" value="Employer">Employer</ToggleButton>
//       </ToggleButtonGroup>
//       </Box>
//     </Box>
//   );
// };

// export default Header;
