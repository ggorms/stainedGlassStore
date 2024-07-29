import "./RequestCustomForm.css";
import { useState } from "react";
import ColorPicker from "./ColorPicker/ColorPicker";
import ContactInfo from "./ContactInfo/ContactInfo";
import DimensionAndEnclosure from "./DimensionAndEnclosure/DimensionAndEnclosure";
import OpacityAndJointColor from "./OpacityAndJointColor/OpacityAndJointColor";
import SizeAndFile from "./SizeAndFile/SizeAndFile";
import AdditionalSpecifications from "./AdditionalSpecifications/AdditionalSpecifications";

function RequestCustomForm() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    size: "",
    dimension: "",
    enclosure: "",
    opacity: "",
    joint: "",
    color: {
      color1: "000000",
      color2: "",
      color3: "",
      color4: "",
      color5: "",
      color6: "",
    },
    additional: "",
  });
  console.log("formData", formData);

  const components = [
    { id: 1, name: DimensionAndEnclosure },
    { id: 2, name: OpacityAndJointColor },
    { id: 3, name: ColorPicker },
    { id: 4, name: SizeAndFile },
    { id: 5, name: AdditionalSpecifications },
  ];

  return (
    <div className="custom-form-root">
      <h2 className="custom-form-title">Request Custom Piece</h2>
      <form className="custom-form">
        <ContactInfo formData={formData} setFormData={setFormData} />
        {components.map((component) => {
          return (
            <div className="custom-form-segment-container" key={component.id}>
              <component.name formData={formData} setFormData={setFormData} />
            </div>
          );
        })}
        <button className="custom-form-submit" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default RequestCustomForm;
