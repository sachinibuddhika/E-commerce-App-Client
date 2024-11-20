import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">Cart here</div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default Cart;
