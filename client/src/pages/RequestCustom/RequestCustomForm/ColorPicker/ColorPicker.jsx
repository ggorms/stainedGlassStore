import { useState } from "react";
import "./ColorPicker.css";

function ColorPicker({ formData, setFormData }) {
  const [numOfColors, setNumOfColors] = useState(0);
  const numOfColorsArray = Array.from({ length: numOfColors }, (_, i) => i);
  return (
    <div className="custom-form-color-picker">
      <h5 className="custom-form-subtitle">Color(s)</h5>

      <div className="">
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
          />
        ))}
      </div>
      <div className="custom-form-color-buttons">
        <button
          className={numOfColors >= 5 ? "disabled" : ""}
          onClick={(e) => {
            e.preventDefault();
            if (numOfColors < 5) {
              setNumOfColors(numOfColors + 1);
              setFormData({
                ...formData,
                color: {
                  ...formData.color,
                  [`color${numOfColors + 2}`]: "000000",
                },
              });
            }
          }}
        >
          +
        </button>
        <span>{numOfColors + 1}</span>
        <button
          className={numOfColors <= 0 ? "disabled" : ""}
          onClick={(e) => {
            e.preventDefault();
            if (numOfColors > 0) {
              setNumOfColors(numOfColors - 1);
              setFormData({
                ...formData,
                color: {
                  ...formData.color,
                  [`color${numOfColors + 1}`]: "",
                },
              });
            }
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default ColorPicker;
