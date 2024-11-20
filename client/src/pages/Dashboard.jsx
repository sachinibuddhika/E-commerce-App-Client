import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import Product from "../components/Product";
import Data from "../../Data.json";
import { Grid, Container, Box, Typography } from "@mui/material";

const Dashboard = () => {
  const { userInfo } = useUser();
  const [products, setProducts] = useState(Data.products);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Hello {userInfo.name.split(" ")[0]}! These are the picks for you
          today....
        </Typography>
      </Box>
      <Container
        sx={{
          marginTop: "100px",
          marginBottom: "100px",
          marginLeft: "220px",
          marginRight: "225px",
        }}
      >
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={2.7} key={p.id}>
              {" "}
              <Product product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
