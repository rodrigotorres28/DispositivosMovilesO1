import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import ProductCard from "./ProductCard";
import { Divider } from "@rneui/themed";

interface ProductsOfCategoryProps {
  category: string;
  products: { name: string; price: number; imagePath: string }[];
}

const ProductsOfCategory = ({category, products}: ProductsOfCategoryProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <Divider style={{ marginHorizontal: 18 }} />
      <FlatList
        style={{ marginBottom: 24 }}
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            title={item.name}
            price={item.price.toString()}
            imagePath={require("../assets/Grapefruit.png")}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProductsOfCategory;

const styles = StyleSheet.create({
  container: {},
  categoryTitle: {
    paddingBottom: 24,
    paddingHorizontal: 18,
    fontWeight: "700",
    fontSize: 18,
    color: "#46496B",
  },
});
