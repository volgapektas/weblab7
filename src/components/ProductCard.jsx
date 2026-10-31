import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-thumb"
      />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="category-tag">{product.category}</p>
        <p className="price">${product.price}</p>
        <div className="card-actions">
          <Link to={`/products/${product.id}`} className="view-btn">
            View Details
          </Link>
          <button onClick={() => addItem(product)} className="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
