// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import UploadImg from "../../../../assets/upload.png";
import "./FileUpload.css";

function FileUpload({ formData, setFormData }) {
  return (
    <div className="custom-form-segment-wrapper">
      <h5 className="custom-form-subtitle"> Sketch Upload (optional)</h5>
      <div className="custom-form-file">
        <label>
          <input type="file" className="hidden" accept="image/*" required />
          <img src={UploadImg} alt="Upload file" className="uploadImg" />
          <p>
            Accepted Files <br /> .jpg, .jpeg, .png
          </p>
        </label>
      </div>
    </div>
  );
}

export default FileUpload;
