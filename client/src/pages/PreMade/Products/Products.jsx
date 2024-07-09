import "./Products.css";
import Placeholder from "../../../assets/placeholder.png";

function Products({ product }) {
  return (
    <div className="products-root">
      <img className="products-img" src={Placeholder} />
      <h3 className="products-name">{product.name}</h3>
      <h3 className="products-price">$ {(product.price / 100).toFixed(2)}</h3>
      <h3
        className={
          product.stockQty > 0
            ? "products-instock inStock"
            : "products-instock outOfStock"
        }
      >
        {product.stockQty > 0 ? "In Stock" : "Out of Stock"}
      </h3>
    </div>
  );
}

export default Products;
