import { useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProduct } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const fetchCallback = useCallback((signal) => fetchProduct(id, signal), [id]);

  const { loading, error, data: product } = useFetch(fetchCallback, [id]);

  if (loading)
    return <div className="status-msg">Loading product details...</div>;
  if (error || !product) {
    return (
      <div className="status-msg error">
        <h3>Product not found</h3>
        <p>The product you are looking for does not exist.</p>
        <button onClick={() => navigate("/products")} className="back-btn">
          Back to Catalog
        </button>
      </div>
    );
  }

  const nextProductId = Number(id) + 1;

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="detail-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="detail-img"
        />
        <div className="detail-info">
          <h2>{product.title}</h2>
          <span className="category-pill">{product.category}</span>
          <p className="detail-desc">{product.description}</p>
          <p className="detail-price">${product.price}</p>

          <button onClick={() => addItem(product)} className="add-btn large">
            Add to Cart
          </button>

          <div className="next-nav">
            <Link to={`/products/${nextProductId}`} className="next-link">
              Next product →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
