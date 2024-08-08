import "./PayButton.css";
import axios from "axios";
import { BASE_URL } from "../../../store/BASE_URL";

function PayButton({ cartItems, user }) {
  const handlePayment = async () => {
    await axios
      .post(`${BASE_URL}/stripe/create-checkout-session`, { cartItems, user })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(user);
  return (
    <div className="payment-button-container">
      <button className="payment-button" onClick={handlePayment}>
        Checkout with Stripe
      </button>
    </div>
  );
}

export default PayButton;
