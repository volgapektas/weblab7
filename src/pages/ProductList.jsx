import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import { ProductCard } from "../components/ProductCard";

export function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchCallback = useCallback((signal) => fetchProducts(signal), []);
  const { loading, error, data: products } = useFetch(fetchCallback, []);

  const searchKeyword = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";

  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
      const matchesCategory = selectedCategory
        ? item.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchKeyword, selectedCategory]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) {
        next.set("q", val);
      } else {
        next.delete("q");
      }
      return next;
    });
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) {
        next.set("category", val);
      } else {
        next.delete("category");
      }
      return next;
    });
  };

  if (loading) return <div className="status-msg">Loading products...</div>;
  if (error) return <div className="status-msg error">Error: {error}</div>;

  return (
    <div className="product-list-page">
      <h2>Product Catalog</h2>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Filter by title..."
          value={searchKeyword}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="status-msg">
          No products match your search criteria.
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
