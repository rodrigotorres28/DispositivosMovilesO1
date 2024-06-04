import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { CartProduct } from "./PageShoppingCart";
import ProductCard from "./ProductCard";
import { setToCart } from "../state/cartSlice";
import { RootState } from "../state/store";

interface ModalContentProps {
  selectedProduct: CartProduct | null;
  setModalVisible: (x: boolean) => void;
}

const ModalContent = ({
  selectedProduct,
  setModalVisible,
}: ModalContentProps) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => {
    if (selectedProduct !== null) {
      return state.cart.items.find(
        (item) => item.product_id === selectedProduct.id,
      );
    }
    return null;
  });
  const [productQuantity, setProductQuantity] = useState(
    cartItem ? cartItem.quantity : 0,
  );

  const handleAddToCart = () => {
    setProductQuantity(productQuantity + 1);
  };

  const handleRemoveFromCart = () => {
    setProductQuantity(productQuantity - 1);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSave = () => {
    if (selectedProduct !== null) {
      dispatch(
        setToCart({
          productId: selectedProduct.id,
          quantity: productQuantity,
        }),
      );
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Edit Item Count</Text>
        <View style={styles.divider} />
        <View style={styles.modalProductCard}>
          {selectedProduct && (
            <ProductCard
              product={selectedProduct}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
              buttonNumber={productQuantity}
            />
          )}
        </View>
        <View style={styles.modalButtonsContainer}>
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.modalButtonText}>CANCEL</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.modalButtonText}>SAVE</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ModalContent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginTop: -40,
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
