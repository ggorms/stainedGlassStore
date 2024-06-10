import "./CartItem.css";
import { useDispatch } from "react-redux";
import Placeholder from "../../../assets/placeholder.png";
import {
  removeFromCartThunk,
  updateItemQuantityThunk,
} from "../../../store/cart";

function CartItem({ item, cartId }) {
  const dispatch = useDispatch();
  const cartItemInfo = {
    cartId,
    productId: item.product.id,
    qty: item.qty,
  };
  const removeFromCart = () => {
    dispatch(removeFromCartThunk(cartItemInfo));
  };

  const increaseQty = () => {
    if (cartItemInfo.qty < 5) {
      cartItemInfo.qty += 1;
      dispatch(updateItemQuantityThunk(cartItemInfo));
    }
  };

  const decreaseQty = () => {
    if (cartItemInfo.qty > 1) {
      cartItemInfo.qty -= 1;
      dispatch(updateItemQuantityThunk(cartItemInfo));
    }
  };

  return (
    <div className="cartItem-root">
      <div className="cartItem-image-wrapper">
        <img className="cartItem-image" src={Placeholder} />
      </div>
      <div className="cartItem-info">
        <h5 className="cartItem-name">{item.product.name}</h5>
        <h6 className="cartItem-price">
          $ {(item.product.price / 100).toFixed(2)}
        </h6>
      </div>
      <div className="cartItem-augmentations">
        <div className="cartItem-delete-wrapper">
          <svg
            //   xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cartItem-delete"
            onClick={removeFromCart}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
        <div className="cartItem-qty-wrapper">
          <button
            className={
              cartItemInfo.qty > 1
                ? "cartItem-qty-button"
                : "cartItem-qty-button unavailable"
            }
            onClick={decreaseQty}
          >
            -
          </button>
          <h6 className="cartItem-qty">{item.qty}</h6>
          <button
            className={
              cartItemInfo.qty < 5
                ? "cartItem-qty-button"
                : "cartItem-qty-button unavailable"
            }
            onClick={increaseQty}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
