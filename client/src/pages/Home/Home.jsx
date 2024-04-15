import "./Home.css";
import custom from "../../assets/designing.jpeg";
import premade from "../../assets/rainbow3.jpeg";
import sunset from "../../assets/sunset.jpeg";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
import AboutMe from "./AboutMe/AboutMe";

function Home() {
  const productOfferings = [
    { name: "Pre-made Pieces", image: premade, link: "/premade" },
    { name: "Request Custom Piece", image: custom, link: "/custom" },
  ];

  return (
    <div className="home-root">
      <div
        className="home-banner"
        style={{ backgroundImage: `url(${sunset})` }}
      >
        <span className="home-banner-blur">
          <h1 className="home-banner-text">Welcome to my store</h1>
        </span>
      </div>
      <div className="home-content">
        {productOfferings.map((offering, i) => (
          <div className="home-content-segment" key={i}>
            <Link
              to={offering.link}
              className="home-content-link"
              style={{ textDecoration: "none" }}
            >
              <img className="home-content-image" src={offering.image} />
              <h3 className="home-content-name">{offering.name}</h3>
            </Link>
          </div>
        ))}
      </div>
      <AboutMe />
      <Form />
    </div>
  );
}

export default Home;
