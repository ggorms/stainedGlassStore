import FlashlightOnOutlinedIcon from "@mui/icons-material/FlashlightOnOutlined";
import FlashlightOffOutlinedIcon from "@mui/icons-material/FlashlightOffOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function OpacityAndJointColor({ formData, setFormData, formFormatError }) {
  return (
    <>
      <div className="custom-form-segment-wrapper">
        <h5 className="custom-form-subtitle">Select Opacity</h5>
        <div className="custom-form-radio">
          <div>
            <input
              className="custom-form-radio-option"
              type="radio"
              name="opacity"
              id="translucent"
              value={"translucent"}
              onChange={(e) =>
                setFormData({ ...formData, opacity: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="translucent">
              <div className="custom-form-radio-outerCircle">
                <div
                  className={
                    formData.opacity === "translucent"
                      ? "custom-form-radio-innerCircle selected"
                      : "custom-form-radio-innerCircle"
                  }
                >
                  <FlashlightOnOutlinedIcon
                    sx={{ fontSize: 30, color: "white" }}
                  />
                </div>
              </div>
            </label>
            <p className="custom-form-sublabel">Translucent</p>
          </div>
          <div>
            <input
              className="custom-form-radio-option"
              type="radio"
              name="opacity"
              id="opaque"
              value={"opaque"}
              onChange={(e) =>
                setFormData({ ...formData, opacity: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="opaque">
              <div className="custom-form-radio-outerCircle">
                <div
                  className={
                    formData.opacity === "opaque"
                      ? "custom-form-radio-innerCircle selected"
                      : "custom-form-radio-innerCircle"
                  }
                >
                  <FlashlightOffOutlinedIcon
                    sx={{ fontSize: 30, color: "white" }}
                  />
                </div>
              </div>
            </label>
            <p className="custom-form-sublabel">Opaque</p>
          </div>
        </div>
        <p className="form-formatError">{formFormatError.opacity}</p>
      </div>
      {/* Joint Color */}
      <div className="custom-form-segment-wrapper">
        <h5 className="custom-form-subtitle">Select Joint Color</h5>
        <div className="custom-form-radio">
          <div>
            <input
              className="custom-form-radio-option"
              type="radio"
              name="joint"
              id="silver"
              value={"silver"}
              onChange={(e) =>
                setFormData({ ...formData, joint: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="silver">
              <div className="custom-form-radio-outerCircle">
                <div
                  className={
                    formData.joint === "silver"
                      ? "custom-form-radio-innerCircle selected"
                      : "custom-form-radio-innerCircle"
                  }
                >
                  <ModeEditOutlineOutlinedIcon
                    sx={{ fontSize: 30, color: "white" }}
                  />
                </div>
              </div>
            </label>
            <p className="custom-form-sublabel">Silver</p>
          </div>
          <div>
            <input
              className="custom-form-radio-option"
              type="radio"
              name="joint"
              id="black"
              value={"black"}
              onChange={(e) =>
                setFormData({ ...formData, joint: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="black">
              <div className="custom-form-radio-outerCircle">
                <div
                  className={
                    formData.joint === "black"
                      ? "custom-form-radio-innerCircle selected"
                      : "custom-form-radio-innerCircle"
                  }
                >
                  <ModeEditOutlineOutlinedIcon
                    sx={{ fontSize: 30, color: "white" }}
                  />
                </div>
              </div>
            </label>
            <p className="custom-form-sublabel">Black</p>
          </div>
        </div>
        <p className="form-formatError">{formFormatError.joint}</p>
      </div>
    </>
  );
}

export default OpacityAndJointColor;
