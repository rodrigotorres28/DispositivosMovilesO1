import * as React from "react";
import { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { CartProduct } from "./PageShoppingCart";

interface CartProductCardProps {
  cartProduct: CartProduct;
  onPress?: (product: CartProduct) => void;
}

const CartProductCard = ({ cartProduct, onPress }: CartProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handlePress = () => {
    if (onPress) {
      onPress(cartProduct);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.imageContainer}>
          <Image
            source={
              imageError
                ? require("../assets/RandomFood.png")
                : { uri: cartProduct.listImageUrl }
            }
            style={styles.imageStyle}
            onError={handleImageError}
          />
        </View>
        <View style={styles.namePriceContainer}>
          <View>
            <Text style={styles.nameTextStyle}>{cartProduct.name}</Text>
          </View>
          <View>
            <Text style={styles.priceTextStyle}>
              ${Math.round(cartProduct.price)}
            </Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountTextStyle}>
            {cartProduct.amount > 1
              ? cartProduct.amount + " units"
              : cartProduct.amount + " unit"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartProductCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
  imageContainer: {},
  imageStyle: {
    height: 163,
    width: 163,
    borderRadius: 4,
  },
  namePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 19,
  },
  amountContainer: {
    alignItems: "baseline",
    paddingHorizontal: 8,
  },
  nameTextStyle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#46496B",
  },
  priceTextStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9FA1B5",
  },
  amountTextStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9FA1B5",
  },
});
