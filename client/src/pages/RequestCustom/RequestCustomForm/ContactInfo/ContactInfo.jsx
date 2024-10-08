import { TextField } from "@mui/material";
import "./ContactInfo.css";

function ContactInfo({ formData, setFormData, formFormatError }) {
  return (
    <div className="custom-form-contact">
      <TextField
        label="First Name"
        className="custom-form-input"
        type="text"
        value={formData.fName}
        sx={{
          width: 300,
          marginBottom: 0.5,
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
      <p className="form-formatError">{formFormatError.fName}</p>
      <TextField
        label="Last Name"
        className="custom-form-input"
        type="text"
        value={formData.lName}
        sx={{
          width: 300,
          marginTop: 1,
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
      <p className="form-formatError">{formFormatError.lName}</p>
      <TextField
        label="Email"
        className="custom-form-input"
        type="email"
        value={formData.customerEmail}
        sx={{
          width: 300,
          // margin: 5,
          marginTop: 1,
          backgroundColor: "white",
          borderRadius: "8px",
          "& .MuiInputBase-input": { height: "1.5rem", fontSize: 16 },
          "& .MuiFormLabel-root": {
            fontSize: 16,
          },
          "& .css-14lo706": { width: 40 },
        }}
        onChange={(e) =>
          setFormData({ ...formData, customerEmail: e.target.value })
        }
      />
      <p className="form-formatError">{formFormatError.customerEmail}</p>
      <TextField
        label="Phone"
        className="custom-form-input"
        type="tel"
        value={formData.phone}
        sx={{
          width: 300,
          // margin: 5,
          marginTop: 1,
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
      <p className="form-formatError">{formFormatError.phone}</p>
    </div>
  );
}

export default ContactInfo;
