import { createContext, useReducer } from "react";

export const Store = createContext();
const initState = {
  cart: {
    cartItems: [],
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-TO-CART": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (el) => el._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((el) =>
            el._id === existItem._id ? newItem : el
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
