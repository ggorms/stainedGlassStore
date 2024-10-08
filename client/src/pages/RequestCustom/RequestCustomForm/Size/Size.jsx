import "./Size.css";

function Size({ formData, setFormData, formFormatError }) {
  return (
    <div className="custom-form-segment-wrapper">
      <h5 className="custom-form-subtitle">Select Size</h5>
      <div className="custom-form-radio-size">
        <div>
          <input
            className="custom-form-radio-option"
            type="radio"
            name="size"
            id="small"
            value={"small"}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />
          <label className="custom-form-radio-label" htmlFor="small">
            <div className="custom-form-radio-outerOval">
              <div
                className={
                  formData.size === "small"
                    ? "custom-form-radio-innerOval selected"
                    : "custom-form-radio-innerOval"
                }
              >
                <p>Small (1 - 5 inches)</p>
              </div>
            </div>
          </label>
        </div>
        <div>
          <input
            className="custom-form-radio-option"
            type="radio"
            name="size"
            id="medium"
            value={"medium"}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />
          <label className="custom-form-radio-label" htmlFor="medium">
            <div className="custom-form-radio-outerOval">
              <div
                className={
                  formData.size === "medium"
                    ? "custom-form-radio-innerOval selected"
                    : "custom-form-radio-innerOval"
                }
              >
                <p>Medium (5 - 10 inches)</p>
              </div>
            </div>
          </label>
        </div>
        <div>
          <input
            className="custom-form-radio-option"
            type="radio"
            name="size"
            id="large"
            value={"large"}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />
          <label className="custom-form-radio-label" htmlFor="large">
            <div className="custom-form-radio-outerOval">
              <div
                className={
                  formData.size === "large"
                    ? "custom-form-radio-innerOval selected"
                    : "custom-form-radio-innerOval"
                }
              >
                <p>Large (11 - 15 inches)</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <p className="form-formatError">{formFormatError.size}</p>
    </div>
  );
}

export default Size;
