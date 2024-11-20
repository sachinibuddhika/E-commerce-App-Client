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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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
    <div>
      <Box
        sx={{
          backgroundColor: "#000000",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
          fontSize: "14px",
        }}
      >
        Limited time offer, Buy Nike products with 20% discount for summer sale
        !
      </Box>

      <AppBar position="sticky" sx={{ backgroundColor: "#ffbb48" }}>
        <Container sx={{ maxWidth: "100%", padding: 0 }}>
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                height: "auto",
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  width: "auto",
                  height: "55px",
                  marginRight: "10px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              {/* If user is logged in and on a private route, show simplified nav */}
              {!isDashboardPage ? (
                <>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="dashboard"
                    sx={{
                      marginRight: 2,
                      color: "#000000",
                      marginLeft: "80%",
                      marginRight: "30%",
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="admin"
                    sx={{
                      marginRight: 2,
                      color: "#000000",
                      marginRight: "10%",
                    }}
                  >
                    AdminPanel
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#000000",
                      marginLeft: "130px",
                      borderRadius: "30px",
                      padding: "0 10px",
                      "&:focus-within": {
                        borderColor: "#ffbb48",
                      },
                    }}
                  >
                    <TextField
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      size="small"
                      placeholder="Type here..."
                      sx={{
                        flex: 1,
                        backgroundColor: "#000000",
                        color: "white",
                        borderRadius: "30px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "transparent",
                          },
                          "&:hover fieldset": {
                            borderColor: "transparent",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "transparent",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#f6f6f6",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        backgroundColor: "#000000",
                        color: "white",
                        borderRadius: "30px",
                        padding: "8px 16px",
                        marginLeft: "10px",
                        marginRight: "-10px",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      }}
                    >
                      Search
                    </Button>
                  </Box>
                </form>
              )}
            </Box>

            <Box sx={{ display: "flex" }}>
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={logout}
                  sx={{
                    marginRight: 2,
                    backgroundColor: "#000000",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333333",
                    },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    marginRight: 2,
                    backgroundColor: "#000000",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333333",
                    },
                  }}
                >
                  Register / Login
                </Button>
              )}

              {isLoggedIn && (
                <IconButton
                  color="inherit"
                  sx={{
                    marginRight: 2,
                    marginLeft: 3,
                    color: "#000000",
                  }}
                  component={RouterLink}
                  to="/cart"
                >
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                  </Badge>
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
