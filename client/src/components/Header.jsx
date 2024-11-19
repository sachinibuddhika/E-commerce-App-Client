import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Badge,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { deleteCookie } from "../utils/common";
import { useUser } from "../contexts/UserContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Add Cart Icon

function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();
  const location = useLocation(); // Get the current location/path

  const logout = () => {
    deleteCookie("_USER_AUTH_");
    navigate("/");
    localStorage.removeItem("loggedInUser");
    setUserInfo(null);
  };

  // Check if the user is logged in and is on a private route (like 'dashboard')
  const isLoggedIn = userInfo || localStorage.getItem("loggedInUser");
  const isPrivateRoute = location.pathname.includes("dashboard");

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Isuri Group
          </Typography>

          {/* Left side: contains navigation buttons and logout */}
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {/* If user is logged in and on a private route (like 'dashboard'), show simplified nav */}
            {!isPrivateRoute ? (
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
              // Only show Cart Icon on private routes like dashboard
              <Box sx={{ flexGrow: 1 }} />
            )}
          </Box>

          {/* Right side: contains Cart Icon and Logout */}
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
              <IconButton color="inherit" sx={{ marginRight: 2 }}>
                <Badge badgeContent={4} color="error">
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
