import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";

import AddMultipleButton from "./AddMultipleButton";
import { addToCart, removeFromCart } from "../state/cartSlice";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
  onRemove: () => void;
  buttonNumber: number;
}

const ProductCard = ({
  product,
  onAdd,
  onRemove,
  buttonNumber,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={
            imageError
              ? require("../assets/RandomFood.png")
              : { uri: product.checkoutImageUrl }
          }
          onError={handleImageError}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
          </Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AddMultipleButton
            onAdd={onAdd}
            onRemove={onRemove}
            displayedAmount={buttonNumber}
          />
        </View>
      </View>
      <View style={styles.dividerView} />
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
    borderWidth: 1,
    borderColor: "#F6F5F5",
    marginHorizontal: 18,
  },
});
