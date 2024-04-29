import "./Cart.css";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

function Cart({ cart }) {
  const cartQty = cart?.CartItem?.reduce((acc, curr) => acc + curr.qty, 0);
  const cartSubtotal = cart?.CartItem?.reduce(
    (acc, curr) => acc + curr.qty * curr.product.price,
    0
  );
  const shippingCost = 495;
  const taxCost = 347;
  const total = cartSubtotal + shippingCost + taxCost;
  // console.log(cart);
  // console.log(cartSubtotal);
  return (
    <div className="cart-root">
      <h1 className="cart-title">My Cart ({cartQty})</h1>
      <div className="cart-cartItems-container">
        {cart?.CartItem?.map((item) => (
          <CartItem key={item.product.id} item={item} cartId={cart.id} />
        ))}
      </div>
      <div className="cart-order-summary-wrapper">
        <h1 className="cart-order-summary-title">Order Summary</h1>
        <div className="cart-order-summary-info">
          <div className="cart-order-summary-container">
            <span>Item Subtotal</span>
            <span>$ {(cartSubtotal / 100).toFixed(2)}</span>
          </div>
          <div className="cart-order-summary-container">
            <span>Shipping Cost</span>
            <span>$ {(shippingCost / 100).toFixed(2)}</span>
          </div>
          <div className="cart-order-summary-container">
            <span>Tax</span>
            <span>$ {(taxCost / 100).toFixed(2)}</span>
          </div>
          <div className="cart-order-summary-container total">
            <span>Total</span>
            <span>$ {(total / 100).toFixed(2)}</span>
          </div>
        </div>
        {/* <button className="cart-order-summary-checkout"> */}
        <Link className="cart-order-summary-checkout" to={"/checkout"}>
          <span>Checkout</span>
        </Link>
        {/* </button> */}
      </div>
    </div>
  );
}

export default Cart;
