import React, { useMemo } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import CartProductCard from "./CartProductCard";
import CheckoutDetails from "./CheckoutDetails";
import useFetchProducts from "../customHooks/useFetchProducts";
import { RootState } from "../state/store";

interface PageShoppingCartProps {}

const PageShoppingCart = (props: PageShoppingCartProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: productsCategories, error, isLoading } = useFetchProducts();

  const totalPrice = useMemo(() => {
    if (!productsCategories || cartItems.length === 0) return 0;

    const allProducts = productsCategories.flatMap((category) => category.data);

    let total = 0;
    for (const cartItem of cartItems) {
      const product = allProducts.find(
        (product) => product.id === cartItem.productId,
      );
      if (product) {
        total += product.price * cartItem.quantity;
      }
    }
    return total;
  }, [productsCategories, cartItems]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <CartProductCard />
      <CheckoutDetails totalPrice={totalPrice} />
    </View>
  );
};

export default PageShoppingCart;

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
