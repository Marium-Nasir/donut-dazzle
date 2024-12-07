export async function fetchProducts(params) {
  const response = await fetch(`/api/products?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}

export async function createProduct(productData) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  return await response.json();
}

export async function updateProduct(params) {
  const response = await fetch(`/api/products?${params}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  return await response.json();
}

export async function deleteProduct(params) {
  const response = await fetch(`/api/products?${params}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  return await response.json();
}
