import "./PayButton.css";
import axios from "axios";
import { BASE_URL } from "../../../store/BASE_URL";
import { useState, useEffect } from "react";

function PayButton({ cartItems, user }) {
  const [error, setError] = useState(null);
  const handlePayment = async () => {
    await axios
      .post(`${BASE_URL}/stripe/create-checkout-session`, { cartItems, user })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => setError(err.response.data));
  };
  console.log(error);

  useEffect(() => {
    if (error) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [error]);
  return (
    <>
      <div className="payment-button-container">
        <button className="payment-button" onClick={handlePayment}>
          Checkout with Stripe
        </button>
      </div>
      {error && (
        <div className="payment-error-outterBlur">
          <div className="payment-error-content-container">
            <div className="payment-error-content">
              <p className="payment-error-message">
                The Following Items <span>{error.message} </span>
              </p>
              <div className="payment-error-products">
                {error.products.map((product, i) => (
                  <h6 key={i}>{product}</h6>
                ))}
                <p className="payment-error-message">{error.solution}</p>
                <p className="payment-error-message">
                  We aplogize for the inconvenience.
                </p>
              </div>
              <button
                className="payment-error-button"
                onClick={() => setError(null)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PayButton;
