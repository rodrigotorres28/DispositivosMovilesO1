import { useState, useEffect } from "react";

import productEndpoints from "../axios/endpoints";
import { Product } from "../types/Product";

const useFetchProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await productEndpoints.fetchProducts();
        setData(products);
        setError(null);
      } catch (error) {
        setError(error as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { data, error, loading };
};

export default useFetchProducts;
