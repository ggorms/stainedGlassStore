import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";

const ShippingInput = styled(TextField)(() => ({
  width: "100%",

  "& .MuiInputLabel-root": {
    color: "gray",
  },
}));

export default function StyledCustomization({
  label,
  shippingInfo,
  setShippingInfo,
  value,
}) {
  return (
    <ShippingInput
      variant="standard"
      InputProps={{ disableUnderline: true }}
      size="small"
      label={label}
      onChange={(e) =>
        setShippingInfo({ ...shippingInfo, [value]: e.target.value })
      }
    />
  );
}
