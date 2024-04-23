import "./Cart.css";
import CartItem from "./CartItem/CartItem";

function Cart({ cart }) {
  const cartQty = cart?.CartItem?.reduce((acc, curr) => acc + curr.qty, 0);
  // console.log(cart);
  return (
    <div className="cart-root">
      <h1 className="cart-title">My Cart ({cartQty})</h1>
      <div className="cart-cartItems-container">
        {cart?.CartItem?.map((item) => (
          <CartItem key={item.product.id} item={item} cartId={cart.id} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
