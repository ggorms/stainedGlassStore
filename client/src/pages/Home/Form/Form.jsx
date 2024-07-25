import "./Form.css";
import { useState } from "react";

function Form() {
  const [questionsForm, setQuestionsForm] = useState({
    fName: "",
    lName: "",
    email: "",
    message: "",
  });
  return (
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
              setQuestionsForm({ ...questionsForm, email: e.target.value })
            }
          />
        </div>
        <div className="home-form-field">
          <label className="home-form-label">Message</label>
          <textarea
            className="home-form-input message-input"
            onChange={(e) =>
              setQuestionsForm({ ...questionsForm, message: e.target.value })
            }
          ></textarea>
        </div>
        <button className="home-form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
