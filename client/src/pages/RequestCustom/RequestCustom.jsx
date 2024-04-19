import "./RequestCustom.css";
import rainbow2 from "../../assets/rainbow2.jpeg";
import CustomTextSelection from "./CustomTextSelection/CustomTextSelection";
import RequestCustomForm from "./RequestCustomForm/RequestCustomForm";

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
      <RequestCustomForm />
    </div>
  );
}

export default RequestCustom;
