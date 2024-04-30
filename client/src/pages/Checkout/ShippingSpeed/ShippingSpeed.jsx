import "./ShippingSpeed.css";

function ShippingSpeed({ shippingInfo, setShippingInfo }) {
  return (
    <div className="shipping-speed-root">
      <h3>Choose your shipping speed</h3>
      <div className="shipping-speed-options-wrapper">
        <div
          className={
            shippingInfo.shippingSpeed === "Standard"
              ? "shipping-speed-option selected"
              : "shipping-speed-option"
          }
          onClick={() =>
            setShippingInfo({ ...shippingInfo, shippingSpeed: "Standard" })
          }
        >
          <h4>Standard ($4.95)</h4>
          <p>(3-5 business days)</p>
        </div>
        <div
          className={
            shippingInfo.shippingSpeed === "Express-saver"
              ? "shipping-speed-option selected"
              : "shipping-speed-option"
          }
          onClick={() =>
            setShippingInfo({ ...shippingInfo, shippingSpeed: "Express-saver" })
          }
        >
          <h4>Express Saver ($14.95)</h4>
          <p>(2-3 business days)</p>
        </div>
        <div
          className={
            shippingInfo.shippingSpeed === "Express"
              ? "shipping-speed-option selected"
              : "shipping-speed-option"
          }
          onClick={() =>
            setShippingInfo({ ...shippingInfo, shippingSpeed: "Express" })
          }
        >
          <h4>Express ($19.95)</h4>
          <p>(1-2 business days)</p>
        </div>
      </div>
      {/* Confirm shipping speed */}
      <button
        className="shipping-speed-button"
        onClick={() =>
          setShippingInfo({ ...shippingInfo, shippingSpeedEntered: true })
        }
      >
        Continue to Payment
      </button>
    </div>
  );
}

export default ShippingSpeed;
