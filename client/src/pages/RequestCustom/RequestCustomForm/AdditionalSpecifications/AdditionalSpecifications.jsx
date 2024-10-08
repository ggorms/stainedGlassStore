import "./AdditionalSpecifications.css";

function AdditionalSpecifications({ formData, setFormData, formFormatError }) {
  return (
    <div className="custom-form-comments">
      <label className="custom-form-subtitle">Description</label>
      <textarea
        className="custom-form-text"
        value={formData.description}
        placeholder="Describe your desired piece in as much detail as possible. If your description does not make what you want VERY CLEAR, your request will not be considered."
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>
      <p className="form-formatError">{formFormatError.description}</p>
    </div>
  );
}

export default AdditionalSpecifications;
