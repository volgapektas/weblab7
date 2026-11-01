import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export default function App() {
  const [theme, setTheme] = useLocalStorage("app_theme", "light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout theme={theme} toggleTheme={toggleTheme} />}
      >
        <Route index element={<Home />} />

        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>

        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
