import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import BottomSheetContent from "./BottomSheetContent";
import CartProductCard from "./CartProductCard";
import CheckoutDetails from "./CheckoutDetails";
import ModalContent from "./ModalContent";
import useFetchProductsWithoutFormat from "../customHooks/useFetchProductsWithoutFormat";
import { RootState } from "../state/store";
import { StackParamList } from "../types/MainStackTypes";
import { Product } from "../types/Product";

type PageShoppingCartProps = NativeStackScreenProps<
  StackParamList,
  "ShoppingCart"
>;

export interface CartProduct extends Product {
  amount: number;
}

const PageShoppingCart = ({ navigation }: PageShoppingCartProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CartProduct | null>(
    null,
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);

  const {
    data: fetchedProducts,
    error,
    isLoading,
  } = useFetchProductsWithoutFormat();

  const cartProductItems = useMemo(() => {
    const cartProducts: CartProduct[] = [];
    if (!fetchedProducts) return cartProducts;

    for (const cartItem of cartItems) {
      const product = fetchedProducts.find(
        (product) => product.id === cartItem.product_id,
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

  const handleProductPress = (product: CartProduct) => {
    setSelectedProduct(product);
    if (Platform.OS === "android") {
      setModalVisible(true);
    }
    if (Platform.OS === "ios") {
      setIsBottomSheetVisible(true);
      handleSnapPress(0);
    }
  };

  const snapPoints = useMemo(() => ["40%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log(index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    setIsBottomSheetVisible(false);
    sheetRef.current?.close();
  }, []);

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
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.CartItemsContainer}>
        <Text style={styles.headerText}>Shopping Cart</Text>
        {cartProductItems.length > 0 ? (
          <FlatList
            data={cartProductItems}
            renderItem={({ item }) => (
              <View style={styles.gridItem}>
                <CartProductCard
                  cartProduct={item}
                  onPress={handleProductPress}
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
          navigation={navigation}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContent
          selectedProduct={selectedProduct}
          setModalVisible={(x: boolean) => setModalVisible(x)}
        />
      </Modal>

      {isBottomSheetVisible && <View style={styles.overlay} />}

      <BottomSheet
        index={-1}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        ref={sheetRef}
      >
        <BottomSheetView>
          <BottomSheetContent
            selectedProduct={selectedProduct}
            closeBottomSheet={handleClosePress}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});
