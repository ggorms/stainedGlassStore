import "./OrderConfirmation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../store/BASE_URL";
import axios from "axios";

function OrderConfirmation() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  return (
    <>{!loading && <div className="beep">{sessionData.customerName}</div>}</>
  );
}

export default OrderConfirmation;
