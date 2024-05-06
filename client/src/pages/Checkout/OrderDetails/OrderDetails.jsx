import "./OrderDetails.css";
import placeholder from "../../../assets/placeholder.png";

function OrderDetails({ cart, shippingSpeed }) {
  const cartSubtotal = cart?.CartItem?.reduce(
    (acc, curr) => acc + curr.qty * curr.product.price,
    0
  );
  const shippingCost = 495;
  const taxCost = 347;
  const total = cartSubtotal + shippingCost + taxCost;
  return (
    <div className="orderDetails-root">
      <div className="orderDetails-wrapper">
        <h4>Order Summary</h4>
        <div className="orderDetails-summary-info">
          <span>Subtotal</span>
          <span>$ {(cartSubtotal / 100).toFixed(2)}</span>
        </div>
        <div className="orderDetails-summary-info">
          <span>{shippingSpeed} Shipping</span>
          <span>$ {(shippingCost / 100).toFixed(2)}</span>
        </div>
        <div className="orderDetails-summary-info">
          <span>Tax</span>
          <span>$ {(taxCost / 100).toFixed(2)}</span>
        </div>
        <div className="orderDetails-summary-info">
          <h5>Order Total</h5>
          <h5>$ {(total / 100).toFixed(2)}</h5>
        </div>
      </div>
      <div className="orderDetails-wrapper">
        <h4>Order Details</h4>
        {cart?.CartItem?.map((item) => (
          <div key={item.product.id} className="orderDetails-product-wrapper">
            <img src={placeholder} />
            <div className="orderDetails-product-info">
              <span>{item.product.name}</span>
              <div>
                <span>$ {(item.product.price / 100).toFixed(2)}</span>
                <span className="gray">Qty: {item.qty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
