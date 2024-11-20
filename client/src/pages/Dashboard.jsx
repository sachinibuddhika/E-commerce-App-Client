import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import Product from "../components/Product";
import Data from "../../Data.json";
import { Grid, Container } from "@mui/material";

const Dashboard = () => {
  const { userInfo } = useUser();
  const [products, setProducts] = useState(Data.products);

  return (
    <div>
      <h6>Dashboard {JSON.stringify(userInfo)}</h6>
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
