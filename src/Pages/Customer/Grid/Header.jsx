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
import { User, Truck, Factory, Briefcase, UserRound } from "lucide-react"; // lucide icons

const Header = () => {
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
                    Customer Management
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                    Manage customer data, policies, and account information across your
                    business operations.
                </Typography>
            </Box>

            {/* Right Section - Buttons with Lucide Icons */}
            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    variant="text"
                    startIcon={<UserRound size={20} />}
                    sx={{ textTransform: "none", background: 'transparent !important', boxShadow: 'none', fontSize: '16.5px', textTransform: "captalize" }}
                >
                    Customer
                </Button>

                <Button
                    variant="text"
                    startIcon={<Truck size={20} />}
                    sx={{ textTransform: "none", background: 'transparent !important', boxShadow: 'none', fontSize: '16.5px', textTransform: "captalize", color: "#000000de" }}
                >
                    Supplier
                </Button>

                <Button
                    variant="text"
                    startIcon={<Factory size={20} />}
                    sx={{ textTransform: "none", background: 'transparent !important', boxShadow: 'none', fontSize: '16.5px', textTransform: "captalize", color: "#000000de" }}
                >
                    Manufactory
                </Button>

                <Button
                    variant="text"
                    startIcon={<Briefcase size={20} />}
                    sx={{ textTransform: "none", background: 'transparent !important', boxShadow: 'none', fontSize: '16.5px', textTransform: "captalize", color: "#000000de" }}
                >
                    Employer
                </Button>
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
