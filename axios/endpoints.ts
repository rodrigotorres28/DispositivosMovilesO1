import axios from "axios";
import { CartItem } from "../state/cartSlice";

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
  checkout: async (cartItems: CartItem[]) => {
    try {
      const response = await instance.post("/checkout", { cart: cartItems });
      return response.data;
    } catch (error) {
      console.error("Checkout error:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      throw new Error("Failed to checkout");
    }
  },
};

export default endpoints;
