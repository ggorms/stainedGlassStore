import "./Footer.css";
import { Link } from "react-router-dom";
import tiktok from "../../assets/tiktokIcon.png";
import instagram from "../../assets/instagramIcon.png";

function Footer({ mobileMenuToggle }) {
  return (
    <footer>
      {mobileMenuToggle && <span className="footerBlur"></span>}
      <ul className="footer-link-internal-container">
        <Link className="footer-link-internal">
          <li className="footer-link-internal-text">About me</li>
        </Link>
        <Link className="footer-link-internal">
          <li className="footer-link-internal-text">Contact Me</li>
        </Link>
      </ul>
      <div className="footer-link-external-container">
        <Link className="footer-link-external">
          <img className="footer-link-image" src={instagram} alt="TikTok" />
        </Link>
        <Link className="footer-link-external">
          <img className="footer-link-image" src={tiktok} alt="Instagram" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
