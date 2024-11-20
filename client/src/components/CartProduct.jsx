import React, { useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import { Remove, Add } from "@mui/icons-material"; // For minus and plus icons

const CartProduct = ({ product }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        border: "1px solid",
        mt: 3,
        padding: 2,
        alignItems: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          maxWidth: "150px",
          height: "auto",
          objectFit: "contain",
        }}
      />
      <Box sx={{ marginLeft: { sm: 3 }, mt: { xs: 2, sm: 0 }, flexGrow: 1 }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            maxWidth: "100%",
            fontSize: { xs: "1rem", sm: "1.25rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "1rem", sm: "1.25rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.price}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <IconButton sx={{ borderRadius: "50%" }}>
            <Remove />
          </IconButton>
          <Button
            variant="outlined"
            sx={{
              width: "40px",
              textAlign: "center",
              minWidth: "40px",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {product.quantity}
          </Button>
          <IconButton sx={{ borderRadius: "50%" }}>
            <Add />
          </IconButton>
        </Box>
        <Button variant="contained" color="warning" size="small" sx={{ mt: 1 }}>
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default CartProduct;