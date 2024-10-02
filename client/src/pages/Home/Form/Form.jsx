import "./Form.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../store/BASE_URL";
import FormPopup from "./FormPopup/FormPopup";

function Form() {
  const [questionsForm, setQuestionsForm] = useState({
    fName: "",
    lName: "",
    customerEmail: "",
    content: "",
  });
  const [formFormatError, setFormFormatError] = useState({
    fName: null,
    lName: null,
    customerEmail: null,
    content: null,
  });

  const [toggleFormPopup, setToggleFormPopup] = useState(false);

  useEffect(() => {
    if (toggleFormPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleFormPopup]);

  const submitContactForm = async (e) => {
    e.preventDefault();
    // Initialize an empty object to track errors
    let formatErrors = {
      fName: null,
      lName: null,
      customerEmail: null,
      content: null,
    };

    // First name validation
    if (!questionsForm.fName) {
      formatErrors.fName = "First name cannot be blank";
    }

    // Last name validation
    if (!questionsForm.lName) {
      formatErrors.lName = "Last name cannot be blank";
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(questionsForm.customerEmail)) {
      formatErrors.customerEmail = "Please enter a valid email address";
      console.log("hit");
    }

    // Message content validation
    if (!questionsForm.content) {
      formatErrors.content = "Message cannot be blank";
    }

    // Check if there are any errors
    const hasErrors = Object.values(formatErrors).some(
      (error) => error !== null
    );

    // Set form errors if any exist
    if (hasErrors) {
      setFormFormatError(formatErrors);
      return; // Return early if there are errors
    }

    setFormFormatError(formatErrors);

    setToggleFormPopup(true);
    // try {
    //   await axios
    //     .post(`${BASE_URL}/sendGrid/email/contact-form`, questionsForm)
    //     .then(() => {
    //       setQuestionsForm({
    //         fName: "",
    //         lName: "",
    //         customerEmail: "",
    //         content: "",
    //       });
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <div className="home-form-container" id="home-form">
        <h2>Questions or Comments?</h2>
        <h2>Contact us below!</h2>
        <form className="home-form">
          <div className="home-form-name-container">
            <div className="home-form-name-field">
              <label className="home-form-label">First Name</label>
              <input
                className="home-form-input"
                onChange={(e) =>
                  setQuestionsForm({ ...questionsForm, fName: e.target.value })
                }
              />
              <p className="home-form-formatError">{formFormatError.fName}</p>
            </div>
            <div className="home-form-name-field">
              <label className="home-form-label">Last Name</label>
              <input
                className="home-form-input"
                onChange={(e) =>
                  setQuestionsForm({ ...questionsForm, lName: e.target.value })
                }
              />
              <p className="home-form-formatError">{formFormatError.lName}</p>
            </div>
          </div>
          <div className="home-form-field">
            <label className="home-form-label">Email</label>
            <input
              className="home-form-input"
              onChange={(e) =>
                setQuestionsForm({
                  ...questionsForm,
                  customerEmail: e.target.value,
                })
              }
            />
            <p className="home-form-formatError">
              {formFormatError.customerEmail}
            </p>
          </div>
          <div className="home-form-field">
            <label className="home-form-label">Message</label>
            <textarea
              className="home-form-input message-input"
              onChange={(e) =>
                setQuestionsForm({ ...questionsForm, content: e.target.value })
              }
            ></textarea>
            <p className="home-form-formatError">{formFormatError.content}</p>
          </div>
          <button
            className="home-form-button"
            onClick={(e) => {
              submitContactForm(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
      {toggleFormPopup && (
        <FormPopup
          setToggleFormPopup={setToggleFormPopup}
          toggleFormPopup={toggleFormPopup}
        />
      )}
    </>
  );
}

export default Form;
