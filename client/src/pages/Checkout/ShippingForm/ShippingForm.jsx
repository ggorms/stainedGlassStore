import "./ShippingForm.css";
import StyledCustomization from "./ShippingInput";

function ShippingForm({ shippingInfo, setShippingInfo }) {
  const shippingInputFields = [
    {
      label: "First Name",
      value: "fName",
    },
    {
      label: "Last Name",
      value: "lName",
    },
    {
      label: "Phone Number",
      value: "phone",
    },
    {
      label: "Address",
      value: "address",
    },
    {
      label: "Apt / Suite (optional)",
      value: "unit",
    },
    {
      label: "City",
      value: "city",
    },
    {
      label: "State",
      value: "state",
    },
    {
      label: "Zip Code",
      value: "zip",
    },
  ];
  return (
    <>
      {/* If address is not confirmed, display inputs */}
      {!shippingInfo.addressEntered && (
        <form className="checkout-shipping-form">
          <h3>Enter Shipping Details</h3>
          {shippingInputFields.map((field) => (
            <div key={field.value} className="checkout-shipping-input-wrapper">
              {/* Custom MUI input - see ShippingInput.jsx */}
              <StyledCustomization
                label={field.label}
                value={field.value}
                shippingInfo={shippingInfo}
                setShippingInfo={setShippingInfo}
              />
            </div>
          ))}
          {/* Confirm address button */}
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
      {/* If address is confirmed, display it */}
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
              {/* If shipping speed is confirmed, display it */}
              {shippingInfo.shippingSpeedEntered && (
                <>
                  <span className="checkout-shipping-entered-info-subtitle">
                    Shipping Method
                  </span>
                  <p>{shippingInfo.shippingSpeed}</p>
                </>
              )}
            </div>
            {/* Edit confirmed address button */}
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
