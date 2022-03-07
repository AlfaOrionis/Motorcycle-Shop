import cookie from "react-cookies";
import {
  USER_CART_ADD,
  USER_AUTH,
  USER_EDIT_EMAIL,
  USER_EDIT_PROFILE,
  USER_SIGN_OUT,
  USER_CART_REMOVE,
} from "../types";

const DEFAULT_USER_STATE = {
  data: {
    _id: null,
    firstname: null,
    lastname: null,
    email: null,
    favourites: null,
    history: [],
    verified: null,
  },
  auth: null,
  cart: { cart: [], cartPrice: 0 },
};
let cookieCart;
export default function usersReducer(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        auth: action.payload.auth,
      };

    case USER_SIGN_OUT:
      return { ...state, data: { ...DEFAULT_USER_STATE.data }, auth: false };

    case USER_EDIT_PROFILE:
      return {
        ...state,
        data: {
          ...state.data,
          firstname: action.payload.data.user.firstname,
          lastname: action.payload.data.user.lastname,
        },
      };

    case USER_EDIT_EMAIL:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data.user },
      };

    case USER_CART_ADD:
      let { item } = action.payload;
      let cart = [...state.cart.cart];
      // checking if there is already such an item with same size
      const existingItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.item._id === item._id &&
          cartItem.size === action.payload.size
      );
      // if there is i wanna update his quantity and totalPrice
      if (existingItemIndex > -1) {
        const existingItem = cart[existingItemIndex];

        if (existingItem.size === action.payload.size) {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
            totalPrice: existingItem.totalPrice + existingItem.item.price,
          };
          cart[existingItemIndex] = updatedItem;
        } //If there isnt i will just add it as a new item
      } else {
        cart = [
          ...cart,
          {
            ...action.payload,
            quantity: 1,
            totalPrice: action.payload.item.price,
          },
        ];
      }

      // cartPrice is just a total price of a whole cart
      let cartPrice = 0;

      cart.forEach((item) => (cartPrice += item.totalPrice));

      return {
        ...state,
        data: { ...state.data },
        cart: { cart: [...cart], cartPrice },
      };

    case USER_CART_REMOVE:
      //I am basically doing similar thing as above so i could do it maybe in one function, but its already got big, so i prefer to split it

      let cartItems = [...state.cart.cart];

      //This is the type of action that will tell me if i should just decrease qunatity by 1, or remove whole item from the cart
      const type = action.payload.type;

      const targetItemIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.item._id === action.payload.item._id &&
          cartItem.size === action.payload.size
      );
      const targetItem = cartItems[targetItemIndex];
      if (targetItem.quantity > 1 && type === "decrease") {
        const updatedItem = {
          ...targetItem,
          quantity: targetItem.quantity - 1,
          totalPrice: targetItem.totalPrice - targetItem.item.price,
        };
        cartItems[targetItemIndex] = updatedItem;

        //Now if quantiny is not higher than 1, or it is but the type is remove, i will just remove whole item
      } else if (targetItem.quantity === 1 || type === "remove") {
        cartItems.splice(targetItemIndex, 1);
      }

      let newCartPrice = 0;

      cartItems.forEach((item) => (newCartPrice += item.totalPrice));

      return {
        ...state,
        cart: { cart: [...cartItems], cartPrice: newCartPrice },
      };

    default:
      return state;
  }
}
