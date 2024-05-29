// customHooks/useFetchProducts.ts

import { useState, useEffect } from "react";

import productEndpoints from "../axios/endpoints";
import { Product } from "../types/Product";

//ProductsCAtegory is compatible with the SectionList in ProductSectionList
interface ProductsCategory {
  id: number;
  categoryName: string;
  data: Product[];
}

//Format the api response into ProductsCategory
const formatProducts = (products: Product[]): ProductsCategory[] => {
  const categoriesMap: { [key: string]: Product[] } = {};

  products.forEach((product) => {
    if (!categoriesMap[product.category]) {
      categoriesMap[product.category] = [];
    }
    categoriesMap[product.category].push(product);
  });

  const categoriesArray: ProductsCategory[] = [];

  const categoryNames = Object.keys(categoriesMap);

  categoryNames.forEach((categoryName, index) => {
    const category: ProductsCategory = {
      id: index,
      categoryName,
      data: categoriesMap[categoryName],
    };
    categoriesArray.push(category);
  });

  return categoriesArray;
};

const useFetchProducts = () => {
  const [data, setData] = useState<ProductsCategory[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await productEndpoints.fetchProducts();
        const formattedData = formatProducts(products);
        setData(formattedData);
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
