import React, { createContext, useReducer } from "react";
import { getAuthToken } from "../utils/common";
import CartReducer from "./CartReducer";

//create a new context for cart
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(CartReducer, []);

  return (
    //ensure all inside the context access cart and the reducer actions
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
