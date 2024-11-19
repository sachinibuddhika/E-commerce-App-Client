import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
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
          {/* Navbar Brand */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Isuri Group
          </Typography>

          {/* Navigation Links */}
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

            {/* Register/Login Button */}
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/login"
            >
              Register/Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
