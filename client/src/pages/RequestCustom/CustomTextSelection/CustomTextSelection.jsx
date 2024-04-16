import "./CustomTextSelection.css";
import { useState } from "react";
import HowItWorks from "./HowItWorks/HowItWorks";
import Suggestions from "./Suggestions/Suggestions";
import Disclaimers from "./Disclaimers/Disclaimers";

function CustomTextSelection() {
  const [selection, setSelection] = useState(<HowItWorks />);
  return (
    <>
      <div className="custom-selection-container">
        <div
          className="custom-selection-option"
          onClick={() => setSelection(<HowItWorks />)}
        >
          <h3 className="custom-selection-text">How It Works</h3>
        </div>
        <div
          className="custom-selection-option"
          onClick={() => setSelection(<Suggestions />)}
        >
          <h3 className="custom-selection-text">Suggestions</h3>
        </div>
        <div
          className="custom-selection-option"
          onClick={() => setSelection(<Disclaimers />)}
        >
          <h3 className="custom-selection-text">Disclaimers</h3>
        </div>
      </div>
      <div className="custom-selection-content-container">{selection}</div>
    </>
  );
}

export default CustomTextSelection;
