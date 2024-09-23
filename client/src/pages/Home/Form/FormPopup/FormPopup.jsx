import "./FormPopup.css";

function FormPopup({ setToggleFormPopup }) {
  return (
    <div className="formPopup-outterBlur">
      <div className="formPopup-content-container">
        <div className="formPopup-button-container">
          <svg
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="formPopup-button"
            onClick={() => setToggleFormPopup(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="formPopup-content">
          <p>
            Thank you for submitting an inquiry! A member of our team will
            review your message and get back to you as soon as possible via the
            email address you provided! Have a great day!
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormPopup;
