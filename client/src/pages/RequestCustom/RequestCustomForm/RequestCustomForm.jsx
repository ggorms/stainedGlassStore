import "./RequestCustomForm.css";
import { useState } from "react";

function RequestCustomForm() {
  const [numOfColors, setNumOfColors] = useState(0);
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
  console.log(formData);

  const numOfColorsArray = Array.from({ length: numOfColors }, (_, i) => i);
  return (
    <div className="custom-form-root">
      <h2 className="custom-form-title">Request Custom Piece</h2>
      <form className="custom-form">
        <div className="custom-form-contact">
          <label className="custom-form-label">First Name</label>
          <input
            className="custom-form-input"
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, fName: e.target.value })
            }
          />
          <label className="custom-form-label">Last Name</label>
          <input
            className="custom-form-input"
            type="text"
            onChange={(e) => ({ ...formData, lName: e.target.value })}
          />
          <label className="custom-form-label">Email</label>
          <input
            className="custom-form-input"
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label className="custom-form-label">Phone</label>
          <input
            className="custom-form-input"
            type="tel"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        {/* FILE */}
        <label className="custom-form-subtitle">Sketch</label>
        <input type="file" />
        {/* FILE */}
        <div className="custom-form-specifications">
          <label className="custom-form-subtitle" htmlFor="size">
            Size
          </label>
          <select
            name="size"
            id="size"
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          >
            <option value={"small"}>Small (1-5 Inches)</option>
            <option value={"medium"}>Medium (6-10 Inches)</option>
            <option value={"large"}>Large (10-15 Inches)</option>
          </select>
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
        <div className="custom-form-color-picker">
          <label className="custom-form-subtitle">Color</label>
          <br />
          <input
            className="custom-form-color-option"
            id="color1"
            type="color"
            onChange={(e) =>
              setFormData({
                ...formData,
                color: { ...formData.color, color1: e.target.value },
              })
            }
            // value="#ff0s000"
          />

          {numOfColorsArray.map((n) => (
            <input
              className="custom-form-color-option"
              type="color"
              key={n + 2}
              id={`color${n + 1}`}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  color: {
                    ...formData.color,
                    [`color${n + 2}`]: e.target.value,
                  },
                })
              }
              //   value="#ff0000"
            />
          ))}
          <div className="custom-form-color-buttons">
            {numOfColors < 6 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNumOfColors(numOfColors + 1);
                }}
              >
                + Color
              </button>
            )}
            {numOfColors > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNumOfColors(numOfColors - 1);
                  setFormData({
                    ...formData,
                    color: {
                      ...formData.color,
                      [`color${numOfColors + 1}`]: "",
                    },
                  });
                }}
              >
                - Color
              </button>
            )}
          </div>
        </div>
        <div className="custom-form-comments">
          <label className="custom-form-subtitle">
            Additonal Specifications
          </label>
          <textarea
            className="custom-form-text"
            onChange={(e) =>
              setFormData({ ...formData, additional: e.target.value })
            }
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default RequestCustomForm;
