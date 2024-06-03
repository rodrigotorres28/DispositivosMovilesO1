import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CartProductCard from "./CartProductCard";
import CheckoutDetails from "./CheckoutDetails";
import ProductCard from "./ProductCard";
import useFetchProductsWithoutFormat from "../customHooks/useFetchProductsWithoutFormat";
import { setToCart } from "../state/cartSlice";
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
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CartProduct | null>(
    null,
  );

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
    if (Platform.OS === "android") {
      setSelectedProduct(product);
      setModalVisible(true);
    }
  };

  const handleModalCancel = (selectedProduct: CartProduct | null) => {
    if (selectedProduct !== null) {
      dispatch(
        setToCart({
          productId: selectedProduct.id,
          quantity: selectedProduct.amount,
        }),
      );
    }
    setModalVisible(false);
  };

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
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Edit Item Count</Text>
            <View style={styles.divider} />
            <View style={styles.modalProductCard}>
              {selectedProduct && <ProductCard product={selectedProduct} />}
            </View>
            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => handleModalCancel(selectedProduct)}
              >
                <Text style={styles.modalButtonText}>CANCEL</Text>
              </Pressable>
              <Pressable
                style={styles.saveButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>SAVE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContainer: {
    paddingVertical: 16,
    backgroundColor: "white",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#46496B",
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 6,
    paddingTop: 10,
  },
  cancelButton: {
    marginTop: 6,
    paddingTop: 10,
    marginHorizontal: 24,
  },
  modalButtonText: {
    color: "#5C3EDB",
    fontSize: 16,
    fontWeight: "700",
  },
  modalProductCard: {
    width: 343,
    height: 88,
  },
  divider: {
    borderWidth: 1,
    width: 307,
    borderColor: "#F6F5F5",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 307,
  },
});
