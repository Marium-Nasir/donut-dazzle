// lib/api/products.js
export async function fetchProducts() {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
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

export async function updateProduct(id, productData) {
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Failed to update product");
  }
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  return await response.json();
}
