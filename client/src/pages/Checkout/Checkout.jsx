import "./Checkout.css";
import ShippingForm from "./ShippingForm/ShippingForm";

function Checkout() {
  return (
    <div className="checkout-root">
      <div className="checkout-shipping-wrapper">
        <div className="checkout-shipping-title-wrapper">
          <div className="checkout-shipping-title-container">
            <div className="checkout-circle">
              <span>1</span>
            </div>
            <h2 className="checkout-title">Shipping</h2>
          </div>
        </div>
        <ShippingForm />
      </div>
    </div>
  );
}

export default Checkout;
