import api from "../api/api";

// Get
export default async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

// Add
export async function addProduct(values) {
  const res = await api.post("/products", values);
  return res.data;
}

// Delete
export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}
