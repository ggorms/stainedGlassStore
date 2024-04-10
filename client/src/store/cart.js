import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const GET_CART = "GET_CART";
const FULFILL_CART = "FULFILL_CART";

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart,
});

const fulfillCart = (cart) => ({
  type: FULFILL_CART,
  payload: cart,
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

const initialState = {
  cart: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return { ...state, cart: action.payload };
    case FULFILL_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
}
