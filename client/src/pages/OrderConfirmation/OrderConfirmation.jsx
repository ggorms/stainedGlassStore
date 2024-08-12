import "./OrderConfirmation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../store/BASE_URL";
import axios from "axios";

function OrderConfirmation() {
  const [sessionData, setSessionData] = useState(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        const response = await axios.get(`${BASE_URL}/stripe/confirmation`, {
          params: {
            session_id: sessionId,
          },
        });
        setSessionData(response.data);
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
  // console.log(map);
  return (
    <>
      {!loading && <div className="beep">{sessionData.customerName}</div>}
      <div>
        <img src={map?.mapUrl} className="map" />
      </div>
    </>
  );
}

export default OrderConfirmation;
