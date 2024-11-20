//function to calculate total number of items  in the cart
export const totalItems = (cart) => {
  return cart.reduce((sum, product) => sum + product.quantity, 0);
};

//functions to calculate total price in the cart
export const totalPrice = (cart) => {
  return cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
};

//function to perform different actions according to cart state
const CartReducer = (state = [], action) => {
  switch (action.type) {
    case "Add":
      return [...state, action.product];
    case "Remove":
      return state.filter((p) => p.id !== action.id);
    case "Increase":
      return state.map((product) =>
        product.id === action.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    case "Decrease":
      return state.map((product) =>
        product.id === action.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

    case "LOAD":
      return action.cart;

    default:
      state;
  }
};

export default CartReducer;
