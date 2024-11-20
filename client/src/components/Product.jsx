import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { dispatch } = useContext(CartContext);
  return (
    <Card
      sx={{
        width: "100%",
        height: 350,
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        overflow: "hidden",
      }}
    >
      <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "180px",
            objectFit: "contain",
          }}
          image={product.image}
          alt={product.name}
        />

        <Box sx={{ width: "100%", padding: "0 8px" }}>
          <CardContent
            sx={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontWeight: "normal",
                fontSize: "1rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",

                fontSize: "0.8rem",
                marginBottom: "auto",
              }}
            >
              {product.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                marginTop: "5px",
                fontSize: "0.8rem",
              }}
            >
              {product.price}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
      <CardActions
        sx={{
          paddingBottom: "5px",
          paddingRight: "0px",
        }}
      >
        <Button
          size="small"
          color="primary"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            "&:hover": {
              backgroundColor: "blue",
              color: "white",
            },
          }}
          onClick={() => dispatch({ type: "Add", product: product })}
        >
          <ShoppingCartIcon sx={{ color: "inherit", fontSize: "17px" }} /> Add
          to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
