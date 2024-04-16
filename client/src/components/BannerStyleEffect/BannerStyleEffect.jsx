import "./BannerStyleEffect.css";
import { useState, useEffect } from "react";

function BannerStyleEffect() {
  const [numOfChildren, setNumOfChildren] = useState(0);

  useEffect(() => {
    const calculateNumOfChildren = () => {
      const bannerWidth = document
        .getElementById("banner-style-root")
        .getBoundingClientRect().width;
      console.log(bannerWidth);
      const childWidth = 15;
      console.log(childWidth);
      const numOfChildren = Math.floor(bannerWidth / childWidth);
      setNumOfChildren(numOfChildren);
    };

    calculateNumOfChildren();

    window.addEventListener("resize", calculateNumOfChildren);
    return () => {
      window.removeEventListener("resize", calculateNumOfChildren);
    };
  }, []);
  const children = Array.from({ length: numOfChildren }, (_, index) => (
    <>
      <div key={index} className="banner-style-segment-main"></div>
      <div className="banner-style-segment-sub"></div>
    </>
  ));
  return <div id="banner-style-root">{children}</div>;
}

export default BannerStyleEffect;
