import "./PreMade.css";
import rainbow from "../../assets/background.jpeg";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allProductsThunk } from "../../store/product";
import Products from "./Products/Products";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function PreMade() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.allProducts);
  useEffect(() => {
    dispatch(allProductsThunk());
  }, []);
  // console.log(allProducts);
  return (
    <div className="premade-root">
      <div
        className="premade-banner"
        style={{ backgroundImage: `url(${rainbow})` }}
      >
        <span className="premade-banner-blur">
          <h1 className="premade-banner-text">Pre-made Pieces</h1>
        </span>
      </div>
      <div className="premade-content">
        {allProducts.map((product) => (
          <Link
            key={product.id}
            className="premade-link"
            to={`/premade/${product.id}`}
          >
            <Products product={product} />
          </Link>
        ))}
      </div>
      <div className="premade-info">
        <h2 className="premade-info-title">Please Note</h2>
        <p className="premade-info-text">
          See something you like but it&#39;s out of stock? Want something in a
          different color?{" "}
          <HashLink to={"/#home-form"} className="premade-hashLink">
            Send me a message
          </HashLink>{" "}
          and i&#39;ll do my best to accommodate you! Please note that the final
          price may vary due to differences in material costs. All products are
          handmade and therefore may not look exactly as advertised - although I
          make every effort to do so.
        </p>
      </div>
    </div>
  );
}

export default PreMade;
