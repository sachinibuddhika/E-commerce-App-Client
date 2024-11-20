import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useUser } from "../contexts/UserContext.jsx";
import CartProduct from "../components/CartProduct.jsx";
import { totalItems, totalPrice } from "../contexts/CartReducer.jsx";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const { userInfo } = useUser();

  // Check if user is logged in before showing cart
  if (!userInfo) {
    return <p>Please log in to view your cart.</p>;
  }

  return (
    <div>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          {/* The list of added items */}
          <Grid item xs={12} md={8}>
            {cart.map((product) => (
              <Box key={product.id} mb={3}>
                <CartProduct product={product} />
              </Box>
            ))}
          </Grid>

          {/* Total chekout price */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                boxSizing: "border-box",
                width: { xs: "100%", sm: "100%", md: "33%" },
                marginTop: { xs: 2, sm: 2, md: 0 },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Total Items:{totalItems(cart)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Total Price:{totalPrice(cart)}
              </Typography>
              <Button
                variant="contained"
                color="warning"
                sx={{
                  width: "100%",
                  marginTop: 2,
                }}
              >
                Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Cart;
