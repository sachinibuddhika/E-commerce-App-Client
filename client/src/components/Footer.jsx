import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        py: 1,
        textAlign: "center",
        color: "white",
        position: "fixed", // Fixes the footer at the bottom
        bottom: 0, // Position it at the bottom of the screen
        width: "100%", // Ensure it spans the full width
        left: 0, // Align to the left edge of the screen
        zIndex: 1000, // Ensure it's above other content if needed
      }}
    >
      <Typography variant="body2">
        &copy; All Rights Reserved @sachini buddhika
      </Typography>
    </Box>
  );
};

export default Footer;
