import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";

export function NavBar({ theme, toggleTheme }) {
  const { user, logoutUser } = useAuth();

  const totalItemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/">ShopApp</NavLink>
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Cart ({totalItemCount})
        </NavLink>
      </div>

      <div className="nav-actions">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {user ? (
          <div className="user-info">
            <span className="username">{user.username}</span>
            <button onClick={logoutUser} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "login-link active" : "login-link"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
