import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const ALL_PRODUCTS = "ALL_PRODUCTS";
const SINGLE_PRODUCT = "SINGLE_PRODUCT";

const allProducts = (products) => ({
  type: ALL_PRODUCTS,
  payload: products,
});

const singleProduct = (product) => ({
  type: SINGLE_PRODUCT,
  payload: product,
});

export const allProductsThunk = () => async (dispatch) => {
  try {
    const { data: products } = await axios.get(`${BASE_URL}/api/product`);
    return dispatch(allProducts(products));
  } catch (error) {
    console.error(error);
  }
};

export const singleProductThunk = (id) => async (dispatch) => {
  try {
    const { data: product } = await axios.get(`${BASE_URL}/api/product/${id}`);
    return dispatch(singleProduct(product));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  allProducts: [],
  singleProduct: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case SINGLE_PRODUCT:
      return { ...state, singleProduct: action.payload };
    default:
      return state;
  }
}
