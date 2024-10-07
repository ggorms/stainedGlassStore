import "./AdditionalSpecifications.css";

function AdditionalSpecifications({ formData, setFormData }) {
  return (
    <div className="custom-form-comments">
      <label className="custom-form-subtitle">Description</label>
      <textarea
        className="custom-form-text"
        placeholder="Describe your desired piece in as much detail as possible. If your description does not make what you want VERY CLEAR, your request will not be considered."
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>
    </div>
  );
}

export default AdditionalSpecifications;
