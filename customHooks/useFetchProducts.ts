import { useQuery } from "@tanstack/react-query";

import productEndpoints from "../axios/endpoints";
import { Product } from "../types/Product";
import { ProductsCategory } from "../types/ProductsCategory";

//Format the api response into ProductsCategory (compatible with the SectionList in ProductSectionList)
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
  return useQuery({
    queryKey: ["products"],
    queryFn: productEndpoints.fetchProducts,
    select: formatProducts,
  });
};

export default useFetchProducts;
