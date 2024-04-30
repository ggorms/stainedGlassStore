import "./ShippingForm.css";
import StyledCustomization from "./ShippingInput";
import { useState } from "react";

function ShippingForm({ shippingInfo, setShippingInfo }) {
  console.log(shippingInfo);
  return (
    <>
      {!shippingInfo.addressEntered && (
        <form className="checkout-shipping-form">
          <h3>Enter Shipping Details</h3>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="First Name"
              value={"fName"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="Last Name"
              value={"lName"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="Phone Number"
              value={"phone"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="Address"
              value={"address"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="Apt / Suite (optional)"
              value={"unit"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="City"
              value={"city"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="State"
              value={"state"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="checkout-shipping-input-wrapper">
            <StyledCustomization
              label="Zip Code"
              value={"zip"}
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <button
            className="checkout-shipping-button"
            onClick={(e) => {
              e.preventDefault();
              setShippingInfo({ ...shippingInfo, addressEntered: true });
            }}
          >
            Use this Address
          </button>
        </form>
      )}
      {shippingInfo.addressEntered && (
        <div className="checkout-shipping-entered-root">
          <h3>Your Shipping Address</h3>
          <div className="checkout-shipping-entered-wrapper">
            <div className="checkout-shipping-entered-info">
              <span className="checkout-shipping-entered-info-subtitle">
                Shipping Address
              </span>
              <p>
                {shippingInfo.fName} {shippingInfo.lName},{" "}
                {shippingInfo.address}, {shippingInfo.unit}, {shippingInfo.city}
                , {shippingInfo.state}, {shippingInfo.zip}, (
                {shippingInfo.phone})
              </p>
              {shippingInfo.shippingSpeedEntered && (
                <>
                  <span className="checkout-shipping-entered-info-subtitle">
                    Shipping Method
                  </span>
                  <p>{shippingInfo.shippingSpeed}</p>
                </>
              )}
            </div>
            <div className="checkout-shipping-entered-edit">
              {shippingInfo.addressEntered &&
                !shippingInfo.shippingSpeedEntered && (
                  <button
                    onClick={() =>
                      setShippingInfo({
                        ...shippingInfo,
                        addressEntered: false,
                      })
                    }
                  >
                    Edit
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShippingForm;
