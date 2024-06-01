import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
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
      <View style={styles.CartItemsContainer}>
        <Text style={styles.headerText}>Shopping Cart</Text>
        {cartProductItems.length > 0 ? (
          <FlatList
            data={cartProductItems}
            renderItem={({ item }) => (
              <View style={styles.gridItem}>
                <CartProductCard
                  imageSource={item.checkoutImageUrl}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatListContentContainer}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <Text style={styles.emptyCart}>Your Cart is empty!</Text>
        )}
      </View>
      <View style={styles.CheckoutDetailsContainer}>
        <CheckoutDetails
          totalPrice={totalPrice}
          buttonDisabled={cartProductItems.length === 0}
        />
      </View>
    </View>
  );
};

export default PageShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  CheckoutDetailsContainer: {
    paddingVertical: 44,
    paddingHorizontal: 18,
    flexDirection: "column-reverse",
  },
  CartItemsContainer: {
    flex: 1,
  },
  flatListContentContainer: {
    paddingHorizontal: 18,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  gridItem: {
    marginVertical: 12,
  },
  headerText: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 18,
    color: "#46496B",
  },
  emptyCart: {
    padding: 18,
    fontSize: 16,
    color: "grey",
  },
});
