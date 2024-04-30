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
        <div className="checkout-title-wrapper">
          <div className="checkout-title-container">
            <div
              className={
                shippingInfo.addressEntered && shippingInfo.shippingSpeedEntered
                  ? "checkout-circle green"
                  : "checkout-circle"
              }
            >
              {/* Display check mark if all shipping info is confirmed */}
              {shippingInfo.addressEntered &&
              shippingInfo.shippingSpeedEntered ? (
                <svg
                  // xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="check-mark"
                >
                  <path
                    // fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                    // clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span>1</span>
              )}
            </div>
            <h2
              className={
                shippingInfo.addressEntered && shippingInfo.shippingSpeedEntered
                  ? "checkout-title gray"
                  : "checkout-title"
              }
            >
              Shipping
            </h2>
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
      <div className="checkout-payment-wrapper">
        <div className="checkout-title-wrapper">
          <div className="checkout-title-container">
            <div
              className={
                shippingInfo.addressEntered && shippingInfo.shippingSpeedEntered
                  ? "checkout-circle"
                  : "checkout-circle-gray"
              }
            >
              <span>2</span>
            </div>
            <h2
              className={
                shippingInfo.addressEntered && shippingInfo.shippingSpeedEntered
                  ? "checkout-title"
                  : "checkout-title gray"
              }
            >
              Payment
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;