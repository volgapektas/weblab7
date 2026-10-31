import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to ShopApp</h1>
      <p>
        Discover our wide selection of products loaded directly via client-side
        routing.
      </p>
      <Link to="/products" className="cta-button">
        Browse Catalog
      </Link>
    </div>
  );
}
