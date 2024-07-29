import { TextField } from "@mui/material";
import "./ContactInfo.css";

function ContactInfo({ formData, setFormData }) {
  return (
    <div className="custom-form-contact">
      <TextField
        label="First Name"
        className="custom-form-input"
        type="text"
        sx={{
          width: 300,
          // marginLeft: 5,
          // marginRight: 5,
          backgroundColor: "white",
          borderRadius: "8px",
          "& .MuiInputBase-input": { height: "1.5rem", fontSize: 16 },
          "& .MuiFormLabel-root": {
            fontSize: 16,
          },
          "& .css-14lo706": { width: 68 },
        }}
        onChange={(e) => setFormData({ ...formData, fName: e.target.value })}
      />

      <TextField
        label="Last Name"
        className="custom-form-input"
        type="text"
        sx={{
          width: 300,
          // marginTop: 5,
          // marginLeft: 5,
          // marginRight: 5,
          backgroundColor: "white",
          borderRadius: "8px",
          "& .MuiInputBase-input": { height: "1.5rem", fontSize: 16 },
          "& .MuiFormLabel-root": {
            fontSize: 16,
          },
          "& .css-14lo706": { width: 68 },
        }}
        onChange={(e) => setFormData({ ...formData, lName: e.target.value })}
      />

      <TextField
        label="Email"
        className="custom-form-input"
        type="email"
        sx={{
          width: 300,
          // margin: 5,
          backgroundColor: "white",
          borderRadius: "8px",
          "& .MuiInputBase-input": { height: "1.5rem", fontSize: 16 },
          "& .MuiFormLabel-root": {
            fontSize: 16,
          },
          "& .css-14lo706": { width: 40 },
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Phone"
        className="custom-form-input"
        type="tel"
        sx={{
          width: 300,
          // margin: 5,
          backgroundColor: "white",
          borderRadius: "8px",
          "& .MuiInputBase-input": { height: "1.5rem", fontSize: 16 },
          "& .MuiFormLabel-root": {
            fontSize: 16,
          },
          "& .css-14lo706": { width: 40 },
        }}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
    </div>
  );
}

export default ContactInfo;
