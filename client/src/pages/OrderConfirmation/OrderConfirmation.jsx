import "./OrderConfirmation.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../store/BASE_URL";
import axios from "axios";
import Placeholder from "../../assets/placeholder.png";
import amex from "../../assets/amex.png";
import visa from "../../assets/visa.png";
import discover from "../../assets/discover.png";
import mastercard from "../../assets/mastercard.png";
import { fulfillCartThunk } from "../../store/cart";
import { useDispatch } from "react-redux";

function OrderConfirmation({ cart, setGuestCart }) {
  const dispatch = useDispatch();
  const [sessionData, setSessionData] = useState(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cardTypes = {
    visa: visa,
    amex: amex,
    mastercard: mastercard,
    discover: discover,
  };

  console.log("cart", cart);

  //////////////////////////////////////////////////////////////////
  //// FIND FIX FOR USERS BEING ABLE TO CONTINUE SHOPPING AND RETURN
  //// TO THE CONFIRMATION PAGE AND SENDING A NEW CONFIRMATION EMAIL
  //////////////////////////////////////////////////////////////////

  // Handle cart fulfillment
  useEffect(() => {
    if (cart?.CartItem?.length > 0) {
      // User cart
      if (cart?.id) {
        dispatch(fulfillCartThunk(cart?.id));
      }
      // Guest cart
      else {
        const updateGuestCart = async () => {
          try {
            await axios.put(`${BASE_URL}/api/cart/fulfill-guest`, cart);
          } catch (error) {
            console.error(error);
          }
          window.sessionStorage.setItem(
            "guestCart",
            JSON.stringify({ CartItem: [] })
          );
          setGuestCart(JSON.parse(window.sessionStorage.getItem("guestCart")));
        };
        updateGuestCart();
      }
    }
  }, [cart?.CartItem?.length, cart?.id, dispatch]);

  // Retreive Session
  useEffect(() => {
    const retreiveSession = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");
      console.log(sessionId);
      if (!sessionId) {
        navigate("/");
        return;
      }
      try {
        const response = await axios.post(`${BASE_URL}/stripe/confirmation`, {
          // params: {
          session_id: sessionId,
          sendEmail: cart?.CartItem?.length > 0 ? true : false, // MAYBE HAVE TO CHANGE THIS
          // },
        });
        setSessionData(response.data.sessionData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    retreiveSession();
  }, []);
  console.log(sessionData);

  // Get Map

  useEffect(() => {
    const fetchMap = async () => {
      if (!loading) {
        try {
          const shippingAddress = sessionData.shippingAddress.address;
          const formattedAddress = `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postal_code}`;
          const map = await axios.get(
            `${BASE_URL}/mapQuest/map/${formattedAddress}`
          );
          // console.log(formattedAddress);
          setMap(map.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchMap();
  }, [loading]);
  console.log(map);
  return (
    <div className="confirmation-root">
      {!loading && (
        <>
          <div className="confirmation-customer-section">
            <div className="confirmation-header-wrapper">
              <h4>Dimensional Glassworks</h4>
              <div className="confirmation-header">
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="check-mark"
                  >
                    <path d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" />
                  </svg>
                </span>
                <div className="confirmation-header-info">
                  <p>Order #1234</p>
                  <h5>Thank You {sessionData?.customerName?.split(" ")[0]}!</h5>
                </div>
              </div>
            </div>
            <div className="confirmation-map-wrapper">
              <img src={map?.mapUrl} className="confirmation-map" />
              <h5>Your order is confirmed</h5>
              <p>
                We&#39;ve accepted your order, and we&#39;re getting it ready. A
                confirmation email has been sent to{" "}
                <span className="confirmation-email">{sessionData?.email}</span>
                .
              </p>
            </div>
            <div className="confirmation-customerInfo-container">
              <h5>Customer Information</h5>
              <div className="confirmation-customerInfo-wrapper">
                <div className="confirmation-customerInfo-shipping-wrapper">
                  <h6>Shipping Address</h6>
                  <p>{sessionData.shippingAddress.name}</p>
                  <p>{sessionData.shippingAddress.address.line1}</p>
                  <p>{sessionData.shippingAddress.address.line2}</p>
                  <p>
                    {sessionData.shippingAddress.address.city},{" "}
                    {sessionData.shippingAddress.address.state},{" "}
                    {sessionData.shippingAddress.address.postal_code}
                  </p>
                  <p>United States</p>
                  <p>{sessionData.phone}</p>
                  <h6>Shipping Method</h6>
                  <p>Express-Saver</p>
                </div>
                <div className="confirmation-customerInfo-billing-wrapper">
                  <h6>Billing Address</h6>
                  <p>{sessionData.billingAddress.name}</p>
                  <p>{sessionData.billingAddress.address.line1}</p>
                  <p>{sessionData.billingAddress.address.line2}</p>
                  <p>
                    {sessionData.billingAddress.address.city},{" "}
                    {sessionData.billingAddress.address.state},{" "}
                    {sessionData.billingAddress.address.postal_code}
                  </p>
                  <p>United States</p>
                  <p>{sessionData.phone}</p>
                  <h6>Payment Method</h6>
                  <p className="confirmation-customerInfo-paymentMethod">
                    <img src={cardTypes[sessionData.paymentMethod.brand]} />{" "}
                    ending in 4242
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="confirmation-orderInfo-container">
            <div className="confirmation-orderInfo-items-wrapper">
              {sessionData.orderItems.map((item) => (
                <div key={item.id} className="confirmation-orderInfo-item">
                  <img src={Placeholder} />
                  <div>
                    <h5>{item.name}</h5>
                    <h6>${(item.price / 100).toFixed(2)}</h6>
                  </div>
                </div>
              ))}
            </div>
            <div className="confirmation-orderInfo-subtotals">
              <div>
                <p>Subtotal</p>
                <h6>
                  $
                  {(
                    sessionData.orderItems.reduce(
                      (acc, curr) => acc + curr.price,
                      0
                    ) / 100
                  ).toFixed(2)}
                </h6>
              </div>
              <div>
                <p>Shipping</p>
                <h6>${(sessionData.shippingCost / 100).toFixed(2)}</h6>
              </div>
            </div>
            <div className="confirmation-orderInfo-total">
              <p>Total</p>
              <h6>
                $
                {(sessionData.orderTotal / 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h6>
            </div>
          </div>
          <div className="confirmation-continue">
            <Link to={"/premade"}>
              <button>Continue Shopping</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

{
  /* 
  <div>
        <img src={map?.mapUrl} className="map" />
      </div>
  */
}
export default OrderConfirmation;
