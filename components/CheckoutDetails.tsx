import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import LargeHorizontalButton from "./LargeHorizontalButton";
import useMutateCheckout from "../customHooks/useMutateCheckout";
import { RootState } from "../state/store";
import { StackParamList } from "../types/MainStackTypes";

interface CheckoutDetailsProps {
  totalPrice: number;
  buttonDisabled: boolean;
  navigation: NativeStackNavigationProp<StackParamList, "ShoppingCart">;
}

const CheckoutDetails = ({
  totalPrice,
  buttonDisabled,
  navigation,
}: CheckoutDetailsProps) => {
  const { mutate: checkout, status } = useMutateCheckout();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleCheckout = () => {
    if (status !== "pending") {
      checkout(cartItems);
    }
  };

  useEffect(() => {
    if (status === "success") {
      navigation.navigate("ProductSearch");
    }
  }, [navigation, status]);

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalValue}>{totalPrice.toFixed(2)}</Text>
      </View>
      <View>
        <LargeHorizontalButton
          text="Checkout"
          buttonColor="#4C2DE8"
          textColor="white"
          disabled={buttonDisabled || status === "pending"}
          disabledColor="#cad0fa"
          onPress={handleCheckout}
        />
      </View>
    </View>
  );
};

export default CheckoutDetails;

const styles = StyleSheet.create({
  container: {},
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingBottom: 32,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "500",
    color: "#46496B",
  },
  totalValue: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "700",
    color: "#46496B",
  },
});
