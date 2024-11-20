import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import Data from "../../Data.json"; // Import your products from Data.json
import Product from "../components/Product"; // Import the reusable Product component

const SearchResults = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const queryParams = new URLSearchParams(location.search); // Get query parameters from the URL
  const searchQuery = queryParams.get("q"); // Extract the 'q' parameter

  useEffect(() => {
    // Filter the products from Data.json based on the searchQuery
    if (searchQuery) {
      const results = Data.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive filtering
      );
      setFilteredProducts(results);
    }
  }, [searchQuery]); // Trigger when searchQuery changes

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>

      {/* Show filtered products if any, or show a message if no results */}
      {filteredProducts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              {/* Use the Product component to display the product */}
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">
          No products found for "{searchQuery}".
        </Typography>
      )}
    </Box>
  );
};

export default SearchResults;
