import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { deleteCookie } from "../utils/common";
import { useUser } from "../contexts/UserContext.jsx";

function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();

  const logout = () => {
    deleteCookie("_USER_AUTH_");
    navigate("/");
  };

  return (
    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">Isuri Group</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Link className="ms-2 nav-link" to="dashboard">
    //           Home
    //         </Link>
    //         <Link className="ms-2 nav-link" to="admin">
    //           AdminPanel
    //         </Link>
    //         <Link className="ms-2 nav-link" to="user-info">
    //           User Info
    //         </Link>
    //         <Link className="ms-2 nav-link" to="users">
    //           Users
    //         </Link>
    //         <Button variant="primary" className="ms-3">
    //           <Link to="/login" className="text-white">
    //             Register/Login
    //           </Link>
    //         </Button>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Isuri Group
          </Typography>

          <Box sx={{ display: "flex" }}>
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

            {userInfo ? (
              <Button
                variant="contained"
                color="error"
                component={RouterLink}
                to="/login"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/login"
              >
                Register/Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;