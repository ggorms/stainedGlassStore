import "./Disclaimers.css";

function Disclaimers() {
  return (
    <div className="disclaimers-root">
      <h2 className="disclaimers-title">Disclaimers</h2>
      <ul className="disclaimers-list">
        <li className="disclaimers-bullet">
          All pieces are handmade. I cannot guarantee that your piece will come
          out exactly as the design you submitted - although I make every effort
          to ensure it does.
        </li>
        <li className="disclaimers-bullet">
          This is a one man operation, and a hobby. Wait times may be
          significant depending on how many orders are before yours, how complex
          your request is, how long it takes for me to receive the necessary
          materials, and how much free time I have.
        </li>
        <li className="disclaimers-bullet">
          I make every effort to ensure your piece is properly packaged for
          shipment. That being said - I am not responsible for any items damaged
          in transit. There will be no refunds or returns.
        </li>
        <li className="disclaimers-bullet">
          I reserve the right to cancel your order at any time, in which case I
          will issue a full refund. Wait times may vary from original estimates.
        </li>
      </ul>
    </div>
  );
}

export default Disclaimers;
