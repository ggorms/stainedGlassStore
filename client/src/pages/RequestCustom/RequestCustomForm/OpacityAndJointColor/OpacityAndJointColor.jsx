import React from "react";

function OpacityAndJointColor({ formData, setFormData }) {
  return (
    <>
      <div className="custom-form-segment-wrapper">
        <div className="custom-form-radio">
          <label className="custom-form-subtitle">Opacity</label>
          <div>
            <input
              type="radio"
              name="opacity"
              id="translucent"
              value={"translucent"}
              onChange={(e) =>
                setFormData({ ...formData, opacity: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="translucent">
              Translucent
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="opacity"
              id="opaque"
              value={"opaque"}
              onChange={(e) =>
                setFormData({ ...formData, opacity: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="opaque">
              Opaque
            </label>
          </div>
        </div>
      </div>
      {/* Joint Color */}
      <div className="custom-form-segment-wrapper">
        <div className="custom-form-radio">
          <label className="custom-form-subtitle">Joint Color</label>
          <div>
            <input
              type="radio"
              name="joint"
              id="silver"
              value={"silver"}
              onChange={(e) =>
                setFormData({ ...formData, joint: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="silver">
              Silver
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="joint"
              id="black"
              value={"black"}
              onChange={(e) =>
                setFormData({ ...formData, joint: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="black">
              Black
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpacityAndJointColor;
