import { createContext, useReducer } from "react";

export const Store = createContext();
const initState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
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
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "REMOVE-ITEM-CART": {
      const cartItems = state.cart.cartItems.filter(
        (el) => el._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "SUCCESS_CONNECTED": {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, user: { ...state.user, userInfo: action.payload } };
    }
    case "FAIL_CONNECTED": {
      return { ...state, user: { ...state.user, error: action.payload } };
    }
    case "DISCONNECT": {
      localStorage.removeItem("userInfo");
      return { ...state, user: { ...state.user, userInfo: action.payload } };
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
