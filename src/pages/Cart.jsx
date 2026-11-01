import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="cta-button">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item-row">
            <div className="item-details">
              <h4>{item.title}</h4>
              <p>${item.price} each</p>
            </div>

            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(item.id, item.quantity - 1)}
                className="qty-btn"
              >
                -
              </button>
              <span className="qty-val">{item.quantity}</span>
              <button
                onClick={() => setQuantity(item.id, item.quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>

            <div className="item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button onClick={() => removeItem(item.id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <div className="cart-actions">
          <button onClick={clear} className="clear-btn">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
