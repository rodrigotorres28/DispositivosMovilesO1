import React, { useMemo } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import CartProductCard from "./CartProductCard";
import CheckoutDetails from "./CheckoutDetails";
import useFetchProductsWithoutFormat from "../customHooks/useFetchProductsWithoutFormat"; // [Change] Imported the new hook
import { RootState } from "../state/store";
import { Product } from "../types/Product";

interface PageShoppingCartProps {}

interface CartProduct extends Product {
  amount: number;
}

const PageShoppingCart = (props: PageShoppingCartProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const {
    data: fetchedProducts,
    error,
    isLoading,
  } = useFetchProductsWithoutFormat(); // [Change] Renamed from `products` to `fetchedProducts`

  const cartProductItems = useMemo(() => {
    const cartProducts: CartProduct[] = [];
    if (!fetchedProducts) return cartProducts;

    for (const cartItem of cartItems) {
      const product = fetchedProducts.find(
        (product) => product.id === cartItem.productId,
      );
      if (product) {
        cartProducts.push({ ...product, amount: cartItem.quantity });
      }
    }

    return cartProducts;
  }, [fetchedProducts, cartItems]);

  const totalPrice = useMemo(() => {
    let total = 0;
    for (const cartProduct of cartProductItems) {
      total += cartProduct.price * cartProduct.amount;
    }
    return total;
  }, [cartProductItems]);

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
      {cartProductItems.length > 0 ? (
        <CartProductCard
          imageSource={cartProductItems[0].checkoutImageUrl}
          name={cartProductItems[0].name}
          price={cartProductItems[0].price}
          amount={cartProductItems[0].amount}
        />
      ) : (
        <Text>No items in cart</Text>
      )}
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
