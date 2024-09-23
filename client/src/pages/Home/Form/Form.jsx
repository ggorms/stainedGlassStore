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
        <h2>Contact me below!</h2>
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
            </div>
            <div className="home-form-name-field">
              <label className="home-form-label">Last Name</label>
              <input
                className="home-form-input"
                onChange={(e) =>
                  setQuestionsForm({ ...questionsForm, lName: e.target.value })
                }
              />
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
          </div>
          <div className="home-form-field">
            <label className="home-form-label">Message</label>
            <textarea
              className="home-form-input message-input"
              onChange={(e) =>
                setQuestionsForm({ ...questionsForm, content: e.target.value })
              }
            ></textarea>
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
        {toggleFormPopup && (
          <FormPopup
            setToggleFormPopup={setToggleFormPopup}
            toggleFormPopup={toggleFormPopup}
          />
        )}
      </div>
    </>
  );
}

export default Form;
