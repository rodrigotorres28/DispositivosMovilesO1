import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Carousel from "./Carousel";
import ProductCard from "./ProductCard";
import useFetchProducts from "../customHooks/useFetchProducts";
import useFetchPromoted from "../customHooks/useFetchPromoted";
import { ProductsCategory } from "../types/ProductsCategory";

const inputContainerHeight = 32;

const ProductsSectionList = () => {
  const [inputText, setInputText] = useState("");

  const { data: products, error, isLoading } = useFetchProducts();
  const {
    data: promotedSlides,
    error: promotedError,
    isLoading: promotedLoading,
  } = useFetchPromoted();

  const filterByNameAndCategory = useCallback(
    (inputText: string, products: ProductsCategory[]) => {
      const filtered = [];

      if (inputText === "") {
        return products;
      }

      for (const categoryElement of products) {
        if (
          categoryElement.categoryName
            .toLowerCase()
            .includes(inputText.toLowerCase())
        ) {
          filtered.push(categoryElement);
        } else {
          const tempItemList = categoryElement.data.filter((item) =>
            item.name.toLowerCase().includes(inputText.toLowerCase()),
          );

          if (tempItemList.length > 0) {
            filtered.push({
              id: categoryElement.id,
              categoryName: categoryElement.categoryName,
              data: tempItemList,
            });
          }
        }
      }

      return filtered;
    },
    [],
  );

  const filteredProducts = useMemo(
    () => (products ? filterByNameAndCategory(inputText, products) : []),
    [inputText, filterByNameAndCategory, products],
  );

  if (isLoading || promotedLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error fetching products: {error.message}
        </Text>
      </View>
    );
  }

  if (promotedError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error fetching slides: {promotedError.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={
          <>
            <View style={styles.carouselContainer}>
              <Carousel slides={promotedSlides || []} />
            </View>
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
                placeholder="Search"
                placeholderTextColor="#9FA1B5"
              />
            </View>
          </>
        }
        sections={filteredProducts}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => <ProductCard product={item} />}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { categoryName } }) => (
          <>
            <Text style={styles.categoryTitle}>{categoryName}</Text>
            <View style={styles.dividerView} />
          </>
        )}
      />
    </View>
  );
};

export default ProductsSectionList;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  carouselContainer: {
    marginBottom: 12,
    marginTop: 2,
  },
  categoryTitle: {
    paddingVertical: 24,
    paddingHorizontal: 18,
    fontWeight: "700",
    fontSize: 18,
    color: "#46496B",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEFF4",
    height: inputContainerHeight,
    borderRadius: inputContainerHeight / 2,
    paddingHorizontal: 10,
    marginHorizontal: 18,
    marginTop: 12,
  },
  inputText: {
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  dividerView: {
    borderWidth: 1,
    borderColor: "#F6F5F5",
    marginHorizontal: 18,
  },
});
