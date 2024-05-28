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
    return instance
      .get("/products")
      .then((response) => response.data["products"]);
  },
  fetchPromotedProducts: async () => {
    return instance
      .get("/promoted")
      .then((response) => response.data["promoted"]);
  },
};

export default endpoints;
