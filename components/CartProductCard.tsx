import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

interface CartProductCardProps {}

const CartProductCard = (props: CartProductCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/RandomFood.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.namePriceContainer}>
        <View>
          <Text style={styles.nameTextStyle}>Watermelon</Text>
        </View>
        <View>
          <Text style={styles.priceTextStyle}>$30</Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.ammountTextStyle}>3 units</Text>
      </View>
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
  ammountTextStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9FA1B5",
  },
});
