import * as React from "react";
import { Text, View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import AddMultipleButton from "./AddMultipleButton";
import { Product } from "../assets/products";

interface ProductCardProps {
    product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={product.imagePath}
        ></Image>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AddMultipleButton product={product} />
        </View>
      </View>
      <View style = {styles.dividerView}></View>
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginVertical: 16,
    marginHorizontal: 18,
    borderRadius: 28,
    height: 56,
    width: 56,
  },
  textContainer: {
    flex: 1,
    padding: 6,
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingTop: 10,
    fontWeight: "700",
    fontSize: 16,
    color: "#46496B",
  },
  price: {
    paddingBottom: 6,
    fontWeight: "500",
    fontSize: 16,
    color: "#9FA1B5",
  },
  dividerView: {
    borderWidth : 1,
    borderColor : "#F6F5F5",
    marginHorizontal: 18
  }
});
