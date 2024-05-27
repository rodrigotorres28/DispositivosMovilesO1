import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../state/store";
import { StackParamList } from "../types/MainStackTypes";

type CartIconProps = NativeStackScreenProps<StackParamList>;

const CartIconButton = ({ navigation }: CartIconProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ShoppingCart");
      }}
      style={styles.cartButton}
    >
      <Image
        style={styles.cartImage}
        source={
          cartItems.length > 0
            ? require("../assets/CartWithItems.png")
            : require("../assets/CartEmpty.png")
        }
      />
    </TouchableOpacity>
  );
};

export default CartIconButton;

const styles = StyleSheet.create({
  cartButton: {
    width: 30,
    height: 30,
    marginRight: 14,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cartImage: {
    height: 25,
    width: 25,
    resizeMode: "center",
  },
});
