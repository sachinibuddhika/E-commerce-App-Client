import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/home.jpg"
            alt="Shoe Store"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: { xs: "2rem", md: "4rem" },
                marginTop: "-60px",
              }}
            >
              Explore the Exclusive Offers
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: 2,
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.25rem", marginTop: "60px" },
              }}
            >
              Step into comfort and style with our latest shoe collections.
              Whether you're looking for trendy sneakers or classic boots, we
              have the perfect pair for every occasion.
            </Typography>

            <Box sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "1rem",
                  padding: "12px 24px",
                  textTransform: "none",
                  marginTop: "20px",
                  backgroundColor: "black",
                  color: "white",
                }}
                component={Link}
                to="/login"
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
