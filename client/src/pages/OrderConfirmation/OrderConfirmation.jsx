import "./OrderConfirmation.css";
// import { useParams } from "react-router-dom";

function OrderConfirmation() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value = params.session_id; // "some_value"
  console.log(value);
  return <div>OrderConfirmation</div>;
}

export default OrderConfirmation;
