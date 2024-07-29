import React from "react";

function DimensionAndEnclosure({ formData, setFormData }) {
  return (
    <>
      <div className="custom-form-segment-wrapper">
        <div className="custom-form-radio">
          <label className="custom-form-subtitle">Dimension</label>
          <div>
            <input
              type="radio"
              name="dimension"
              id="2d"
              value={"2D"}
              onChange={(e) =>
                setFormData({ ...formData, dimension: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="2d">
              2D
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="dimension"
              id="3d"
              value={"3D"}
              onChange={(e) =>
                setFormData({ ...formData, dimension: e.target.value })
              }
            />
            <label className="custom-form-radio-label" htmlFor="3d">
              3D
            </label>
          </div>
        </div>
      </div>

      <div className="custom-form-segment-wrapper">
        {formData.dimension === "3D" && (
          <div className="custom-form-radio">
            <label className="custom-form-subtitle">Enclosure</label>
            <div>
              <input
                type="radio"
                name="enclosure"
                id="enclosed"
                value={"enclosed"}
                onChange={(e) =>
                  setFormData({ ...formData, enclosure: e.target.value })
                }
              />
              <label className="custom-form-radio-label" htmlFor="enclosed">
                Fully enclosed
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="enclosure"
                id="open"
                value={"open"}
                onChange={(e) =>
                  setFormData({ ...formData, enclosure: e.target.value })
                }
              />
              <label className="custom-form-radio-label" htmlFor="open">
                One side open
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DimensionAndEnclosure;
