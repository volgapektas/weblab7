import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const user = await login(username, password);
      loginUser(user);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Sign In</h2>
        <p className="demo-hint">
          Demo: <strong>230408044@st.biruni.edu.tr</strong> /{" "}
          <strong>demo123456</strong>
        </p>

        {errorMsg && <div className="error-alert">{errorMsg}</div>}

        <div className="form-group">
          <label>Student Email</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your student email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
