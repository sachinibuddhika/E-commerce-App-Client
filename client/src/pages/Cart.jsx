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
            {cart.length > 0 ? (
              cart.map((product) => (
                <Box key={product.id} mb={3}>
                  <CartProduct product={product} />
                </Box>
              ))
            ) : (
              <Typography>No items in your cart</Typography>
            )}
          </Grid>

          {/* Total chekout price */}
          <Grid item xs={12} md={4} mt={3}>
            <Box
              sx={{
                backgroundColor: "#f6f6f6",
                color: "white",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                boxSizing: "border-box",
                width: { xs: "100%", sm: "100%", md: "calc(80% - 50px)" },
                marginTop: { xs: 2, sm: 2, md: 0 },
                marginRight: { xs: 0, md: "50px" },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffbb48",
                  color: "white",
                  padding: "10px 15px",
                  width: "100%",
                  marginBottom: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Cart Totals
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 15px",
                  border: "1px solid #ddd", // Outline for the box
                  borderRadius: "4px",
                  width: "100%",
                  marginBottom: 2, // Space below the item
                }}
              >
                <Typography variant="body2" sx={{ color: "black" }}>
                  Total Items:
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  {totalItems(cart)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 15px",
                  border: "1px solid #ddd", // Outline for the box
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <Typography variant="body2" sx={{ color: "black" }}>
                  Total Price:
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  {totalPrice(cart)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  marginTop: 2,
                  backgroundColor: "black", // Black background color
                  color: "white", // White text color
                  "&:hover": {
                    backgroundColor: "#333", // Darker black on hover
                  },
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
