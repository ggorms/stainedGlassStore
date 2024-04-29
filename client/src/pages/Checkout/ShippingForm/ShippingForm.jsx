import "./ShippingForm.css";
import StyledCustomization from "./ShippingInput";
import { useState } from "react";

function ShippingForm() {
  const [shippingInfo, setShippingInfo] = useState({
    fName: "",
    lName: "",
    phone: "",
    address: "",
    unit: "",
    city: "",
    state: "",
  });
  console.log(shippingInfo);
  return (
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
    </form>
  );
}

export default ShippingForm;
