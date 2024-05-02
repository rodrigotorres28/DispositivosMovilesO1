import * as React from "react";
import { FlatList, ImageSourcePropType, ScrollView, StyleSheet } from "react-native";
import ProductsOfCategory from "./ProductsOfCategory";

interface AllProductsWithCategoriesProps {
  allProducts: {id: number; category: string; items: { name: string; price: number; imagePath: ImageSourcePropType; id: number }[];
  }[];
}

const AllProductsWithCategories = ({
  allProducts,
}: AllProductsWithCategoriesProps) => {
  return (
    <FlatList
      contentContainerStyle={{paddingTop: 12 }}
      data={allProducts}
      renderItem={({ item }) => (
        <ProductsOfCategory id={item.id} category={item.category} products={item.items} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default AllProductsWithCategories;

const styles = StyleSheet.create({
  container: {},
});
