import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import LargeHorizontalButton from "./LargeHorizontalButton";
import { CartProduct } from "./PageShoppingCart";
import ProductCard from "./ProductCard";
import { setToCart } from "../state/cartSlice";
import { RootState } from "../state/store";

interface BottomSheetContentProps {
  selectedProduct: CartProduct | null;
  closeBottomSheet: () => void;
}

const BottomSheetContent = ({
  selectedProduct,
  closeBottomSheet,
}: BottomSheetContentProps) => {
  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState(0);
  const cartItem = useSelector((state: RootState) => {
    if (selectedProduct !== null) {
      return state.cart.items.find(
        (item) => item.product_id === selectedProduct.id,
      );
    }
    return null;
  });

  useEffect(() => {
    if (cartItem) {
      setProductQuantity(cartItem.quantity);
    } else {
      setProductQuantity(0);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    setProductQuantity(productQuantity + 1);
  };

  const handleRemoveFromCart = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const handleConfirm = () => {
    if (selectedProduct !== null) {
      dispatch(
        setToCart({
          productId: selectedProduct.id,
          quantity: productQuantity,
        }),
      );
    }
    closeBottomSheet();
  };

  return (
    <View style={styles.bottomSheetContainer}>
      <Text style={styles.modalText}>Edit Item Count</Text>
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
      <View style={styles.buttonContainer}>
        <LargeHorizontalButton
          text="CONFIRM"
          buttonColor="#6DAE43"
          textColor="white"
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: 18,
    paddingTop: 24,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#46496B",
    marginBottom: 16,
  },
  modalProductCard: {
    width: "100%",
    height: 88,
    marginBottom: 24,
  },
  buttonContainer: {
    alignSelf: "stretch",
  },
});
