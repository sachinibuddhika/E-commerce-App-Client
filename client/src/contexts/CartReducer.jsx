//function to perform different actions according to cart state
const CartReducer = (state, action) => {
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
    default:
      state;
  }
};

export default CartReducer;
