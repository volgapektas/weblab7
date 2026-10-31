const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts(signal) {
  const response = await fetch(`${BASE_URL}?limit=100`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  const data = await response.json();
  return data.products;
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch product with id ${id}: ${response.status}`,
    );
  }
  return await response.json();
}
