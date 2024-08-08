import "./Home.css";
import custom from "../../assets/designing.jpeg";
import premade from "../../assets/rainbow3.jpeg";
import { Link } from "react-router-dom";
import Form from "./Form/Form";
import AboutMe from "./AboutMe/AboutMe";
import Background from "../../assets/background.jpeg";

function Home() {
  const productOfferings = [
    { name: "Pre-made Pieces", image: premade, link: "/premade" },
    { name: "Request Custom Piece", image: custom, link: "/custom" },
  ];

  return (
    <>
      <div
        className="home-root"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <span className="home-banner-blur">
          <div className="home-content">
            {productOfferings.map((offering, i) => (
              <div className="home-content-segment" key={i}>
                <Link
                  to={offering.link}
                  className="home-content-link"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="home-content-image"
                    style={{ backgroundImage: `url(${offering.image})` }}
                  >
                    <span className="home-banner-blur">
                      <h3 className="home-content-name">{offering.name}</h3>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </span>
      </div>
      <div>
        <AboutMe />
        <div
          className="home-image-segment"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <Form />
      </div>
    </>
  );
}

export default Home;
