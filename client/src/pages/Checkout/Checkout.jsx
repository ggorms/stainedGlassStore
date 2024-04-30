import "./Checkout.css";
import ShippingForm from "./ShippingForm/ShippingForm";
import { useState } from "react";
import ShippingSpeed from "./ShippingSpeed/ShippingSpeed";

function Checkout() {
  const [shippingInfo, setShippingInfo] = useState({
    addressEntered: false,
    fName: "",
    lName: "",
    phone: "",
    address: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    shippingSpeedEntered: false,
    shippingSpeed: "",
  });
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
          {/* Edit confirmed shipping speed */}
          {shippingInfo.addressEntered && shippingInfo.shippingSpeedEntered && (
            <button
              onClick={() =>
                setShippingInfo({
                  ...shippingInfo,
                  shippingSpeedEntered: false,
                })
              }
            >
              Edit
            </button>
          )}
        </div>
        <ShippingForm
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
        />
        {/* Only show shipping speed selection if address info is confirmed */}
        {shippingInfo.addressEntered && !shippingInfo.shippingSpeedEntered && (
          <ShippingSpeed
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;
