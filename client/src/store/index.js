import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./product.js";
import addressReducer from "./address.js";
import cartItemReducer from "./cartItem.js";
import cartReducer from "./cart.js";
import authReducer from "./auth.js";

const store = configureStore({
  reducer: {
    product: productReducer,
    address: addressReducer,
    cartItem: cartItemReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
