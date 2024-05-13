import "./PayButton.css";
import axios from "axios";
import { BASE_URL } from "../../../store/BASE_URL";

function PayButton({ cartItems }) {
  const handlePayment = async () => {
    await axios
      .post(`${BASE_URL}/stripe/create-checkout-session`, { cartItems })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button className="payment-button" onClick={handlePayment}>
        Pay Now
      </button>
    </>
  );
}

export default PayButton;
