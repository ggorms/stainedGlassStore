import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const GET_CART = "GET_CART";
const FULFILL_CART = "FULFILL_CART";
const ADD_TO_CART = "ADD_TO_CART";

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

const initialState = {
  cart: {
    CartItem: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
