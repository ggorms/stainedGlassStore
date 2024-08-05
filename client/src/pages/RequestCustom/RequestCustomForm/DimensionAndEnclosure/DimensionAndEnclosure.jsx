import React from "react";
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined";
import OpenInNewOffOutlinedIcon from "@mui/icons-material/OpenInNewOffOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

function DimensionAndEnclosure({ formData, setFormData }) {
  console.log(formData);
  return (
    <>
      <div className="custom-form-segment-wrapper">
        <h5 className="custom-form-subtitle">Select Dimension</h5>
        <div className="custom-form-radio">
          <div>
            <input
              className="custom-form-radio-option"
              type="radio"
              name="dimension"
              id="2d"
              value={"2D"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dimension: e.target.value,
                  enclosure: "",
                })
              }
            />
            <label className="custom-form-radio-label" htmlFor="2d">
              <div className="custom-form-radio-outerCircle">
                <div
                  className={
                    formData.dimension === "2D"
                      ? "custom-form-radio-innerCircle selected"
                      : "custom-form-radio-innerCircle"
                  }
                >
                  <CropSquareOutlinedIcon
                    sx={{ fontSize: 30, color: "white" }}
                  />
                </div>
              </div>
            </label>
            <p className="custom-form-sublabel">2D</p>
          </div>
          <div>
            <input
              className="custom-form-radio-option"
              type="radio"
              name="dimension"
              id="3d"
              value={"3D"}
              onChange={(e) =>
                setFormData({ ...formData, dimension: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="3d">
              <div className="custom-form-radio-outerCircle">
                <div
                  className={
                    formData.dimension === "3D"
                      ? "custom-form-radio-innerCircle selected"
                      : "custom-form-radio-innerCircle"
                  }
                >
                  <ViewInArIcon sx={{ fontSize: 30, color: "white" }} />
                </div>
              </div>
            </label>
            <p className="custom-form-sublabel">3D</p>
          </div>
        </div>
      </div>
      {/* Enclosure */}
      <div className="custom-form-segment-wrapper">
        {formData.dimension === "3D" && (
          <>
            <h5 className="custom-form-subtitle">Select Enclosure Type</h5>
            <div className="custom-form-radio">
              <div>
                <input
                  className="custom-form-radio-option"
                  type="radio"
                  name="enclosure"
                  id="enclosed"
                  value={"enclosed"}
                  onChange={(e) =>
                    setFormData({ ...formData, enclosure: e.target.value })
                  }
                />
                <label className="custom-form-radio-label" htmlFor="enclosed">
                  <div className="custom-form-radio-outerCircle">
                    <div
                      className={
                        formData.enclosure === "enclosed"
                          ? "custom-form-radio-innerCircle selected"
                          : "custom-form-radio-innerCircle"
                      }
                    >
                      <OpenInNewOffOutlinedIcon
                        sx={{ fontSize: 30, color: "white" }}
                      />
                    </div>
                  </div>
                </label>
                <p className="custom-form-sublabel">Fully Enclosed</p>
              </div>
              <div>
                <input
                  type="radio"
                  className="custom-form-radio-option"
                  name="enclosure"
                  id="open"
                  value={"open"}
                  onChange={(e) =>
                    setFormData({ ...formData, enclosure: e.target.value })
                  }
                />
                <label className="custom-form-radio-label" htmlFor="open">
                  <div className="custom-form-radio-outerCircle">
                    <div
                      className={
                        formData.enclosure === "open"
                          ? "custom-form-radio-innerCircle selected"
                          : "custom-form-radio-innerCircle"
                      }
                    >
                      <OpenInNewOutlinedIcon
                        sx={{ fontSize: 30, color: "white" }}
                      />
                    </div>
                  </div>
                </label>
                <p className="custom-form-sublabel">One Side Open</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DimensionAndEnclosure;
