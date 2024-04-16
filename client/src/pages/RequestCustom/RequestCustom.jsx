import "./RequestCustom.css";
import rainbow2 from "../../assets/rainbow2.jpeg";
import CustomTextSelection from "./CustomTextSelection/CustomTextSelection";

function RequestCustom() {
  return (
    <div className="custom-root">
      <div
        className="custom-banner"
        style={{ backgroundImage: `url(${rainbow2})` }}
      >
        <div className="custom-banner-blur">
          <h1 className="custom-banner-text">Custom Pieces</h1>
        </div>
      </div>
      <CustomTextSelection />
    </div>
  );
}

export default RequestCustom;