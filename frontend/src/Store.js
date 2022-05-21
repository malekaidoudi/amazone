import { createContext, useReducer } from "react";

export const Store = createContext();
const initState = {
  cart: {
    cartItems: [],
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-TO-CART":
      return {
        ...state,
        cart: {
          ...state.cart.cartItem,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
