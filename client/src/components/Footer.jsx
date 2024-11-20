import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#b3b3b3",
        py: 1,
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="body2">
        &copy; All Rights Reserved @sachini buddhika
      </Typography>
    </Box>
  );
};

export default Footer;
