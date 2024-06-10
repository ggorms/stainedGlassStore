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

function SingleProduct({ userCartId, setGuestCart, guestCart }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.product.singleProduct);
  const [photo, setPhoto] = useState(Placeholder);
  useEffect(() => {
    dispatch(singleProductThunk(id));
  }, []);

  const addToCart = () => {
    // User Cart
    if (userCartId) {
      const cartItemInfo = {
        cartId: userCartId,
        productId: product.id,
      };
      dispatch(addToCartThunk(cartItemInfo));
    }
    // Guest Cart
    else {
      // If item is already in cart, increase quantity
      if (guestCart.CartItem.some((item) => item.product.id === product.id)) {
        window.sessionStorage.setItem(
          "guestCart",
          JSON.stringify({
            ...guestCart,
            CartItem: guestCart.CartItem.map((item) =>
              item.product.id === product.id
                ? { ...item, qty: (item.qty += 1) }
                : item
            ),
          })
        );
      }
      //If item not in cart, add it
      else {
        window.sessionStorage.setItem(
          "guestCart",
          JSON.stringify({
            ...guestCart,
            CartItem: [
              ...guestCart.CartItem,
              {
                qty: 1,
                product: {
                  id: product.id,
                  name: product.name,
                  inStock: product.inStock,
                  imageId: product.imageId,
                  price: product.price,
                },
              },
            ],
          })
        );
      }
      setGuestCart(JSON.parse(window.sessionStorage.getItem("guestCart")));
    }
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
