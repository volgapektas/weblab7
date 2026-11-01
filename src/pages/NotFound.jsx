import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="cta-button">
        Return to Home
      </Link>
    </div>
  );
}
