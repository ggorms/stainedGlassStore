// import axios from "axios";
// import { BASE_URL } from "./BASE_URL";

// const ADD_TO_CART = "ADD_TO_CART";
// const REMOVE_FROM_CART = "REMOVE_FROM_CART";
// const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

// const addToCart = (cartItem) => ({
//   type: ADD_TO_CART,
//   payload: cartItem,
// });

// const removeFromCart = (cartItem) => ({
//   type: REMOVE_FROM_CART,
//   payload: cartItem,
// });

// const updateItemQuantity = (cartItem) => ({
//   type: UPDATE_ITEM_QUANTITY,
//   payload: cartItem,
// });

// export const addToCartThunk = (cartItemInfo) => async (dispatch) => {
//   try {
//     const { cartId, productId } = cartItemInfo;
//     const { data: cartItem } = await axios.post(
//       `${BASE_URL}/api/cartItem/add`,
//       {
//         cartId,
//         productId,
//       }
//     );
//     return dispatch(addToCart(cartItem));
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const removeFromCartThunk = (cartItemInfo) => async (dispatch) => {
//   try {
//     const { cartId, productId } = cartItemInfo;
//     const { data: cartItem } = await axios.delete(
//       `${BASE_URL}/api/cartItem/remove`,
//       {
//         cartId,
//         productId,
//       }
//     );
//     return dispatch(removeFromCart(cartItem));
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const updateItemQuantityThunk = (cartItemInfo) => async (dispatch) => {
//   try {
//     const { cartId, productId, qty } = cartItemInfo;
//     const { data: cartItem } = await axios.put(
//       `${BASE_URL}/api/cartItem/update`,
//       {
//         cartId,
//         productId,
//         qty,
//       }
//     );
//     return dispatch(updateItemQuantity(cartItem));
//   } catch (error) {
//     console.error(error);
//   }
// };

// const initialState = {
//   newCartItem: {},
//   updatedCartItem: {},
//   deletedCartItem: {},
// };

// export default function (state = initialState, action) {
//   switch (action.type) {
// case ADD_TO_CART:
//   return { ...state, newCartItem: action.payload };
// case UPDATE_ITEM_QUANTITY:
//   return { ...state, updatedCartItem: action.payload };
// case REMOVE_FROM_CART:
//   return { ...state, deletedCartItem: action.payload };
//     default:
//       return state;
//   }
// }
