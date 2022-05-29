import { createContext, useReducer } from "react";
import logger from "use-reducer-logger";

export const Store = createContext();
const initState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
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

      return { ...state, userInfo: action.payload };
    }
    case "DISCONNECT": {
      return {
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    }
    case "ADD_SHIPPING_ADDRESS": {
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };
  // console.log(value);
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
