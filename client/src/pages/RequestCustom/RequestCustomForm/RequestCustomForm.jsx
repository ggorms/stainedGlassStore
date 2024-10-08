import "./RequestCustomForm.css";
import { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker/ColorPicker";
import ContactInfo from "./ContactInfo/ContactInfo";
import DimensionAndEnclosure from "./DimensionAndEnclosure/DimensionAndEnclosure";
import OpacityAndJointColor from "./OpacityAndJointColor/OpacityAndJointColor";
import FileUpload from "./FileUpload/FileUpload";
import Size from "./Size/Size";
import AdditionalSpecifications from "./AdditionalSpecifications/AdditionalSpecifications";
import FormPopup from "../../Home/Form/FormPopup/FormPopup";
import axios from "axios";
import { BASE_URL } from "../../../store/BASE_URL";

function RequestCustomForm() {
  const [toggleFormPopup, setToggleFormPopup] = useState(false);
  const [numOfColors, setNumOfColors] = useState(0);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    customerEmail: "",
    phone: "",
    size: "",
    dimension: "",
    enclosure: "",
    opacity: "",
    joint: "",
    color: {
      color1: "#000000",
      color2: "",
      color3: "",
      color4: "",
      color5: "",
      color6: "",
    },
    description: "",
  });

  const [formFormatError, setFormFormatError] = useState({
    fName: null,
    lName: null,
    customerEmail: null,
    phone: null,
    size: null,
    dimension: null,
    enclosure: null,
    opacity: null,
    joint: null,
    description: null,
  });
  console.log("formData", formData);

  const components = [
    { id: 1, name: DimensionAndEnclosure },
    { id: 2, name: OpacityAndJointColor },
    { id: 3, name: Size },
    { id: 4, name: ColorPicker },
    { id: 5, name: FileUpload },
    { id: 6, name: AdditionalSpecifications },
  ];

  useEffect(() => {
    if (toggleFormPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleFormPopup]);

  const submitCustomRequestForm = async (e) => {
    e.preventDefault();
    let formatErrors = {
      fName: null,
      lName: null,
      customerEmail: null,
      phone: null,
      size: null,
      dimension: null,
      enclosure: null,
      opacity: null,
      joint: null,
      description: null,
    };

    // First name validation
    if (!formData.fName) {
      formatErrors.fName = "First name cannot be blank";
    }

    // Last name validation
    if (!formData.lName) {
      formatErrors.lName = "Last name cannot be blank";
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.customerEmail)) {
      formatErrors.customerEmail = "Please enter a valid email address";
    }

    // Phone validation
    const phonePattern = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    if (!phonePattern.test(formData.phone)) {
      formatErrors.phone = "Please enter a valid phone number";
    }

    // Size validation
    if (!formData.size) {
      formatErrors.size = "Please select a size";
    }

    // Dimension validation
    if (!formData.dimension) {
      formatErrors.dimension = "Please select a dimension";
      console.log("hit");
    }

    // Enclosure validation
    if (formData.dimension === "3D" && !formData.enclosure) {
      formatErrors.enclosure = "Please select an enclosure type";
    }

    // Opacity validation
    if (!formData.opacity) {
      formatErrors.opacity = "Please select an opacity";
    }

    // Description validation
    if (!formData.description) {
      formatErrors.description = "Please provide a detailed description";
    }

    // Joint validation
    if (!formData.joint) {
      formatErrors.joint = "Please select a joint color";
    }

    // Check if there are any errors
    const hasErrors = Object.values(formatErrors).some(
      (error) => error !== null
    );

    // Set form errors if any exist
    if (hasErrors) {
      setFormFormatError(formatErrors);
      return;
    }

    setFormFormatError(formatErrors);
    setToggleFormPopup(true);

    try {
      await axios.post(`${BASE_URL}/sendGrid/email/custom-request`, formData);
      setNumOfColors(0);
      setFormData({
        fName: "",
        lName: "",
        customerEmail: "",
        phone: "",
        size: "",
        dimension: "",
        enclosure: "",
        opacity: "",
        joint: "",
        color: {
          color1: "#000000",
          color2: "",
          color3: "",
          color4: "",
          color5: "",
          color6: "",
        },
        description: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="custom-form-root">
        <h2 className="custom-form-title">Request Custom Piece</h2>
        <form className="custom-form">
          <ContactInfo
            formData={formData}
            setFormData={setFormData}
            formFormatError={formFormatError}
          />
          {components.map((component) => {
            return (
              <div className="custom-form-segment-container" key={component.id}>
                <component.name
                  formData={formData}
                  setFormData={setFormData}
                  formFormatError={formFormatError}
                  numOfColors={numOfColors}
                  setNumOfColors={setNumOfColors}
                />
              </div>
            );
          })}
          <button
            className="custom-form-submit"
            onClick={(e) => submitCustomRequestForm(e)}
          >
            Submit Request
          </button>
          <p className="form-formatError" style={{ textAlign: "center" }}>
            {Object.values(formFormatError).some((error) => error != null)
              ? "Please correct errors and resubmit"
              : ""}
          </p>
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

export default RequestCustomForm;
