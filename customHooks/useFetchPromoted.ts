import { useQuery } from "@tanstack/react-query";

import productEndpoints from "../axios/endpoints";
import { CarouselSlide } from "../components/Carousel";

interface PromotedProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// Format the API response into CarouselSlide (compatible with the Carousel component)
const formatPromotedProducts = (
  products: PromotedProduct[],
): CarouselSlide[] => {
  return products.map((product) => ({
    image: { uri: product.imageUrl },
    title: product.name,
    overTitle: product.description,
    textColor: "#FFFFFF",
  }));
};

const useFetchPromoted = () => {
  return useQuery({
    queryKey: ["promotedProducts"],
    queryFn: productEndpoints.fetchPromotedProducts,
    select: formatPromotedProducts,
  });
};

export default useFetchPromoted;
