import "./SingleProduct.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProductThunk } from "../../store/product";
import { addToCartThunk } from "../../store/cart";
import Placeholder from "../../assets/placeholder.png";
import Placeholder2 from "../../assets/placeholder2.png";
import Placeholder3 from "../../assets/placeholder3.png";
import Placeholder4 from "../../assets/placeholder4.png";

function SingleProduct({ cartId }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.product.singleProduct);
  const [photo, setPhoto] = useState(Placeholder);
  useEffect(() => {
    dispatch(singleProductThunk(id));
  }, []);

  const addToCart = () => {
    const cartItemInfo = {
      cartId,
      productId: product.id,
    };
    dispatch(addToCartThunk(cartItemInfo));
  };

  return (
    <div className="singleProduct-root">
      <div className="singleProduct-info-container">
        <h3 className="singleProduct-name">{product.name}</h3>
        <h3
          className={
            product.inStock
              ? "singleProduct-instock inStock"
              : "singleProduct-instock outOfStock"
          }
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </h3>
        <h3 className="singleProduct-price">
          $ {(product.price / 100).toFixed(2)}
        </h3>
      </div>
      <div className="singleProduct-imgs-container">
        <img className="singleProduct-img-main" src={photo} />
        <div className="singleProduct-img-sub-container">
          <img
            className="singleProduct-img-sub"
            src={Placeholder}
            onClick={() => setPhoto(Placeholder)}
          />
          <img
            className="singleProduct-img-sub"
            src={Placeholder2}
            onClick={() => setPhoto(Placeholder2)}
          />
          <img
            className="singleProduct-img-sub"
            src={Placeholder3}
            onClick={() => setPhoto(Placeholder3)}
          />
          <img
            className="singleProduct-img-sub"
            src={Placeholder4}
            onClick={() => setPhoto(Placeholder4)}
          />
        </div>
      </div>
      <p className="singleProduct-description">{product.description}</p>
      <div className="singleProduct-dimensions-container">
        <h2 className="singleProduct-dimensions-title">Dimensions</h2>
        <h3 className="singleProduct-dimensions">
          Height: <span>{product.height} inches</span>
        </h3>
        <h3 className="singleProduct-dimensions">
          Width: <span>{product.width} inches</span>
        </h3>
        {product.depth ? (
          <h3 className="singleProduct-dimensions">
            Depth: <span>{product.depth} inches</span>
          </h3>
        ) : (
          ""
        )}
      </div>
      <button className="singleProduct-add-button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default SingleProduct;
