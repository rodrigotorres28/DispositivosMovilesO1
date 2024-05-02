import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AllProductsWithCategories from "./AllProductsWithCategories";
import { products } from "../assets/products";

const PageProductSearch = () => {
  const [inputText, setInputText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSubmit = () => {
    setInputText("");
  };

  const filterByNameAndCategory = () => {
    const filtered = [];

    if (inputText === "") {
      return products;
    }

    for (const categoryElement of products) {
      if (
        categoryElement.category.toLowerCase().includes(inputText.toLowerCase())
      ) {
        filtered.push(categoryElement);
      } else {
        const tempItemList = categoryElement.items.filter((item) =>
          item.name.toLowerCase().includes(inputText.toLowerCase())
        );

        if (tempItemList.length > 0) {
          filtered.push({
            id: categoryElement.id,
            category: categoryElement.category,
            items: tempItemList,
          });
        }
      }
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterByNameAndCategory();
    setFilteredProducts(filtered);
  }, [inputText]);

  return (
    <View style={{flex:1}}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color="#9FA1B5"
          style={styles.icon}
        />
        <TextInput
          style={styles.inputText}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSubmit}
          placeholder="Search"
          placeholderTextColor="#9FA1B5"
        />
      </View>
      <AllProductsWithCategories allProducts={filteredProducts} />
    </View>
  );
};

export default PageProductSearch;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEFF4",
    height: 32,
    borderRadius: 9999,
    paddingHorizontal: 10,
    marginHorizontal: 18,
    marginVertical: 12,
  },
  inputText: {
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
});
