import * as React from "react";
import { Text, View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Divider } from "@rneui/themed";
import AddMultipleButton from "./AddMultipleButton";

interface ProductCardProps {
    title: string
    price: string
    imagePath: ImageSourcePropType
}

const ProductCard = ({title, price, imagePath}: ProductCardProps) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={imagePath}
        ></Image>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AddMultipleButton />
        </View>
      </View>
      <Divider style={{marginHorizontal: 18}}/>
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
    borderRadius: 9999,
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
});
