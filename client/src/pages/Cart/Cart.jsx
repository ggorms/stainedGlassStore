import "./Cart.css";
import CartItem from "./CartItem/CartItem";
import sadFace from "../../assets/sadFace.png";
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
      {cartQty > 0 ? (
        <>
          <h1 className="cart-title">My Cart ({cartQty})</h1>
          {/* Display cart items */}
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
            <Link className="cart-order-summary-checkout" to={"/checkout"}>
              <span>Checkout</span>
            </Link>
          </div>
        </>
      ) : (
        <div className="cart-empty-container">
          <h1 className="cart-empty-text">Your Cart is Empty</h1>
          <img src={sadFace} />
          <Link className="cart-empty-link" to={"/premade"}>
            Start Shopping {">"}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
