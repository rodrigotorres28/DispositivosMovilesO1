import * as React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import ProductsOfCategory from "./ProductsOfCategory";

interface AllProductsWithCategoriesProps {
  allProducts: {category: string; items: { name: string; price: number; imagePath: string }[];
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
        <ProductsOfCategory category={item.category} products={item.items} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default AllProductsWithCategories;

const styles = StyleSheet.create({
  container: {},
});
