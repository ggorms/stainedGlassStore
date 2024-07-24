import { useState, useEffect } from "react";
import "./CartPopup.css";
import Placeholder from "../../../assets/placeholder.png";

const CartPopup = ({ product, showPopup, setShowPopup }) => {
  const [progress, setProgress] = useState(100);

  // Figure out a solution for having timer reset when clicking add to cart again
  useEffect(() => {
    if (showPopup) {
      // setProgress(100);
      const interval = setInterval(() => {
        setProgress((prev) => prev - 0.4);
      }, 20); // Adjust this value for smoother or faster progress

      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [setShowPopup, showPopup]);

  return (
    <div className="cart-popup">
      <div className="cart-popup-wrapper">
        <img src={Placeholder} alt={product.name} />
        <div className="cart-popup-info-container">
          <h3>{product.name} added to cart!</h3>
          <h3>$ {(product.price / 100).toFixed(2)}</h3>
        </div>
      </div>
      <div className="cart-popup-progressBar">
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "blue",
            borderRadius: "8px",
            transition: "ease-in-out width",
          }}
        />
      </div>
    </div>
  );
};

export default CartPopup;
