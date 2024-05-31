import { useQuery } from "@tanstack/react-query";

import productEndpoints from "../axios/endpoints";
import { Product } from "../types/Product";

const useFetchProductsWithoutFormat = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productEndpoints.fetchProducts,
  });
};

export default useFetchProductsWithoutFormat;
