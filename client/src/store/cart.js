import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const GET_CART = "GET_CART";
const FULFILL_CART = "FULFILL_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";
const LOGOUT = "LOGOUT";

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart,
});

const fulfillCart = (cart) => ({
  type: FULFILL_CART,
  payload: cart,
});

const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  payload: cartItem,
});

const removeFromCart = (cartItem) => ({
  type: REMOVE_FROM_CART,
  payload: cartItem,
});

const updateItemQuantity = (cartItem) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: cartItem,
});

export const getCartThunk = (userId) => async (dispatch) => {
  try {
    const { data: cart } = await axios.get(`${BASE_URL}/api/cart/${userId}`);
    return dispatch(getCart(cart));
  } catch (error) {
    console.error(error);
  }
};

export const fulfillCartThunk = (cartId) => async (dispatch) => {
  try {
    const { data: cart } = await axios.post(
      `${BASE_URL}/api/cart/fulfill/${cartId}`
    );
    return dispatch(fulfillCart(cart));
  } catch (error) {
    console.error(error);
  }
};

export const addToCartThunk = (cartItemInfo) => async (dispatch) => {
  try {
    const { cartId, productId } = cartItemInfo;
    const { data: cartItem } = await axios.post(
      `${BASE_URL}/api/cartItem/add`,
      {
        cartId,
        productId,
      }
    );
    return dispatch(addToCart(cartItem));
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCartThunk = (cartItemInfo) => async (dispatch) => {
  try {
    const { cartId, productId } = cartItemInfo;
    const { data: cartItem } = await axios.delete(
      `${BASE_URL}/api/cartItem/remove/${cartId}/${productId}`
    );
    return dispatch(removeFromCart(cartItem));
  } catch (error) {
    console.error(error);
  }
};

export const updateItemQuantityThunk = (cartItemInfo) => async (dispatch) => {
  try {
    const { cartId, productId, qty } = cartItemInfo;
    const { data: cartItem } = await axios.put(
      `${BASE_URL}/api/cartItem/update`,
      {
        cartId,
        productId,
        qty,
      }
    );
    return dispatch(updateItemQuantity(cartItem));
  } catch (error) {
    console.error(error);
  }
};

export const logoutCartHandler = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};

const initialState = {
  cart: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return { ...state, cart: action.payload };
    case GET_CART:
      return { ...state, cart: action.payload };
    case FULFILL_CART:
      return { ...state, cart: action.payload };
    case ADD_TO_CART:
      // If the item already exists in the cart - replace it, else - add it
      if (
        state.cart.CartItem.some(
          (item) => item.product.id === action.payload.product.id
        )
      ) {
        // Replace
        return {
          ...state,
          cart: {
            ...state.cart,
            CartItem: state.cart.CartItem.map((item) =>
              item.product.id === action.payload.product.id
                ? action.payload
                : item
            ),
          },
        };
      } else {
        // Add
        return {
          ...state,
          cart: {
            ...state.cart,
            CartItem: [...state.cart.CartItem, action.payload],
          },
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          CartItem: state.cart.CartItem.filter(
            (item) => item.product.id !== action.payload.product.id
          ),
        },
      };
    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        cart: {
          ...state.cart,
          CartItem: state.cart.CartItem.map((item) =>
            item.product.id === action.payload.product.id
              ? action.payload
              : item
          ),
        },
      };
    default:
      return state;
  }
}
