import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Badge,
  IconButton,
  TextField,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { deleteCookie } from "../utils/common";
import { useUser } from "../contexts/UserContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../contexts/CartContext";

function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();
  const location = useLocation(); // To check the current route
  const { cart } = useContext(CartContext);

  if (!cart) {
    return <p>Loading...</p>; // Return loading message if cart is not available yet
  }

  // Safely access cart.length
  const cartLength = cart.length;

  const logout = () => {
    deleteCookie("_USER_AUTH_");
    navigate("/");
    localStorage.removeItem("loggedInUser");
    setUserInfo(null);
  };

  // Check if the user is logged in
  const isLoggedIn = userInfo || localStorage.getItem("loggedInUser");

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("searched for ", event.value);
    if (searchQuery) {
      // Redirect to the search results page with the query as a URL parameter
      navigate(`/search?q=${searchQuery}`);
    }
  };

  // Check if the current route is 'dashboard' or any route starting with '/dashboard'
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Isuri Group
          </Typography>

          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {/* If user is logged in and on a private route, show simplified nav */}
            {!isDashboardPage ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="dashboard"
                  sx={{ marginRight: 2 }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="admin"
                  sx={{ marginRight: 2 }}
                >
                  AdminPanel
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="user-info"
                  sx={{ marginRight: 2 }}
                >
                  User Info
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="users"
                  sx={{ marginRight: 2 }}
                >
                  Users
                </Button>
              </>
            ) : (
              <Box sx={{ flexGrow: 1 }} />
            )}
          </Box>

          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {/* Render the search bar only when logged in and on the 'dashboard' page */}
            {isLoggedIn && isDashboardPage && (
              <form
                onSubmit={handleSearchSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "20px",
                }}
              >
                <TextField
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  size="small"
                  sx={{ marginRight: 2 }}
                />
                <Button type="submit" variant="contained" color="secondary">
                  Search
                </Button>
              </form>
            )}
          </Box>

          <Box sx={{ display: "flex" }}>
            {isLoggedIn ? (
              <Button
                variant="contained"
                color="error"
                onClick={logout}
                sx={{ marginRight: 2 }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/login"
                sx={{ marginRight: 2 }}
              >
                Register/Login
              </Button>
            )}

            {isLoggedIn && (
              <IconButton
                color="inherit"
                sx={{ marginRight: 2 }}
                component={RouterLink}
                to="/cart"
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
