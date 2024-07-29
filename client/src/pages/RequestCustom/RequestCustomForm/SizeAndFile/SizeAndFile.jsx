import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import UploadImg from "../../../../assets/upload.png";
import "./SizeAndFile.css";

function SizeAndFile({ formData, setFormData }) {
  return (
    <>
      <div className="custom-form-segment-wrapper">
        <div className="custom-form-size">
          <FormControl fullWidth>
            <InputLabel id="size">Size</InputLabel>
            <Select
              labelId="size"
              id="size-select"
              value={formData.size}
              label="Age"
              sx={{
                width: 150,
              }}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
            >
              <MenuItem value={"small"}>Small (1-5 Inches)</MenuItem>
              <MenuItem value={"medium"}>Medium (6-10 Inches)</MenuItem>
              <MenuItem value={"large"}>Large (10-15 Inches)</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {/* FILE */}
      <div className="custom-form-segment-wrapper">
        <div className="custom-form-file">
          <label>
            Sketch Upload (optional)
            <input type="file" className="hidden" />
            <img src={UploadImg} alt="Upload file" className="uploadImg" />
          </label>
          <p>
            Accepted Files <br /> .jpg, .jpeg, .png
          </p>
        </div>
      </div>
    </>
  );
}

export default SizeAndFile;
