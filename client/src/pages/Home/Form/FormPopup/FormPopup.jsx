import "./FormPopup.css";

function FormPopup({ setToggleFormPopup }) {
  return (
    <div className="formPopup-outterBlur">
      <div className="formPopup-content-container">
        <div className="formPopup-circle">
          {" "}
          <svg
            // xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="formPopup-checkmark"
          >
            <path
              // fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              // clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="formPopup-content">
          <h3>Thank You!</h3>
          <p>
            Your inquiry has been submitted and a member of our team will review
            it and get back to you as soon as possible via the email address you
            provided. Have a great day!
          </p>
          <button
            className="formPopup-button"
            onClick={() => setToggleFormPopup(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormPopup;
