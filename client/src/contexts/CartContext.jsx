import React, { createContext, useReducer, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import CartReducer from "./CartReducer";

//create a new context for cart
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { userInfo } = useUser();
  const [cart, dispatch] = useReducer(CartReducer, []);

  useEffect(() => {
    console.log("Logged-in user:", userInfo);
    if (userInfo && userInfo.email) {
      // When the user is logged in, load their cart from local storage
      const storedCart = localStorage.getItem(userInfo.email);
      console.log("Stored cart:", storedCart);
      if (storedCart) {
        try {
          // Try to parse the stored cart
          dispatch({ type: "LOAD", cart: JSON.parse(storedCart) });
        } catch (error) {
          console.error("Error parsing cart from localStorage", error);
          dispatch({ type: "LOAD", cart: [] }); // Fallback to empty cart
        }
      } else {
        // If there's no cart stored, initialize an empty cart
        dispatch({ type: "LOAD", cart: [] });
      }
    }
  }, [userInfo]);

  useEffect(() => {
    console.log("Saving cart to localStorage", cart);
    if (userInfo && userInfo.email) {
      try {
        localStorage.setItem(userInfo.email, JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to localStorage", error);
      }
    }
  }, [cart, userInfo]);

  return (
    //ensure all inside the context access cart and the reducer actions
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
