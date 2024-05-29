import axios from "axios";

const token = "0a41c523-fa00-418a-a585-7dd1fc5f18e4";

const instance = axios.create({
  baseURL: "https://api.ecommerce.inhouse.decemberlabs.com",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const endpoints = {
  fetchProducts: async () => {
    try {
      const response = await instance.get("/products");
      return response.data; // Return the entire response data
    } catch {
      throw new Error("Failed to fetch products");
    }
  },
  fetchPromotedProducts: async () => {
    try {
      const response = await instance.get("/promoted");
      return response.data;
    } catch {
      throw new Error("Failed to fetch promoted products");
    }
  },
};

export default endpoints;
