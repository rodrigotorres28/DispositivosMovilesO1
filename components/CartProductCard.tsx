import * as React from "react";
import { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CartProductCardProps {
  imageSource: string;
  name: string;
  price: number;
  amount: number;
}

const CartProductCard = ({
  imageSource,
  name,
  price,
  amount,
}: CartProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={
              imageError
                ? require("../assets/RandomFood.png")
                : { uri: imageSource }
            }
            style={styles.imageStyle}
            onError={handleImageError}
          />
        </View>
        <View style={styles.namePriceContainer}>
          <View>
            <Text style={styles.nameTextStyle}>{name}</Text>
          </View>
          <View>
            <Text style={styles.priceTextStyle}>${Math.round(price)}</Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.ammountTextStyle}>
            {amount > 1 ? amount + " units" : amount + " unit"}
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
  ammountTextStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9FA1B5",
  },
});
