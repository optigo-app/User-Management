import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export default function CenteredCircularLoader({ size = 60 }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      position="fixed"
      top={0}
      right={0}
      left={0}
      bottom={0}
      zIndex={9999}
      bgcolor="rgba(255,255,255,0.6)" // optional dim background
    >
      <CustomCircularLoader size={size} />
    </Box>
  );
}

const LoaderContainer = styled(Box)(() => ({
  width: "4.25em",
  transformOrigin: "center",
  animation: "rotate4 2s linear infinite",
  "@keyframes rotate4": {
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const StyledCircle = styled("circle")({
  fill: "none",
  strokeWidth: 8,
  strokeDasharray: "2, 200",
  strokeDashoffset: 0,
  strokeLinecap: "round",
  animation: "dash4 1.5s ease-in-out infinite",
  "@keyframes dash4": {
    "0%": {
      strokeDasharray: "1, 200",
      strokeDashoffset: 0,
    },
    "50%": {
      strokeDasharray: "90, 200",
      strokeDashoffset: "-35px",
    },
    "100%": {
      strokeDashoffset: "-125px",
    },
  },
});

// Main loader component
function CustomCircularLoader({ size }) {
  return (
    <LoaderContainer
      component="svg"
      viewBox="25 25 50 50"
      sx={{ width: size, height: size }}
    >
      <defs>
        <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(115, 103, 240, 0.7)" />
          <stop offset="100%" stopColor="#7367f0" />
        </linearGradient>
      </defs>
      <StyledCircle cx="50" cy="50" r="20" stroke="url(#loaderGradient)" />
    </LoaderContainer>
  );
}
