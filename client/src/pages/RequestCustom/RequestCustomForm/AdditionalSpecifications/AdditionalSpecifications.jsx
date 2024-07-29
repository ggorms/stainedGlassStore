import React from "react";
import "./AdditionalSpecifications.css";

function AdditionalSpecifications({ formData, setFormData }) {
  return (
    <div className="custom-form-comments">
      <label className="custom-form-subtitle">Additonal Specifications</label>
      <textarea
        className="custom-form-text"
        onChange={(e) =>
          setFormData({ ...formData, additional: e.target.value })
        }
      ></textarea>
    </div>
  );
}

export default AdditionalSpecifications;
