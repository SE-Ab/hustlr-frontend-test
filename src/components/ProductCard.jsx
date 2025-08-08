import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css"

const ProductCard = ({ product, onAddToCart }) => {
  // Confirmed: The API provides a "rating" object, which we'll use for stock status.
  // Any product with a rating below 3.5 will be considered "Out of Stock".
  const inStock = product.rating && product.rating.rate >= 3.5;

  // Confirmed: The API does not provide variants. We'll show a placeholder UI.
  const variants = ['S', 'M', 'L', 'XL'];

  return (
    <div className="col-md-4 col-sm-6 col-12 mb-4">
      <div className="card product-card h-100">
        <Link to={`/product/${product.id}`} className="product-image-link">
          {/* Uses the "image" field from the API */}
          <img
            src={product.image}
            className="card-img-top product-image"
            alt={product.title}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          {/* Uses the "title" field from the API */}
          <h5 className="product-name" title={product.title}>
            {product.title}
          </h5>
          {/* Uses the "price" field from the API */}
          <p className="product-price">${product.price.toFixed(2)}</p>

          <div className="variant-selector mt-auto pt-3">
            <label htmlFor={`variants-${product.id}`} className="form-label">Variant</label>
            <select id={`variants-${product.id}`} className="form-select" disabled={!inStock}>
              {variants.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="card-footer p-3">
          <button
            className="btn btn-dark w-100 add-to-cart-btn"
            onClick={() => onAddToCart(product)}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;