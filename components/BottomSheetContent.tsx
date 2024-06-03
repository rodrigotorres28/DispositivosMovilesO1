import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import LargeHorizontalButton from "./LargeHorizontalButton";
import { CartProduct } from "./PageShoppingCart";
import ProductCard from "./ProductCard";

interface BottomSheetContentProps {
  selectedProduct: CartProduct | null;
  onConfirm: () => void;
}

const BottomSheetContent = ({
  selectedProduct,
  onConfirm,
}: BottomSheetContentProps) => {
  return (
    <View style={styles.bottomSheetContainer}>
      <Text style={styles.modalText}>Edit Item Count</Text>
      <View style={styles.modalProductCard}>
        {selectedProduct && <ProductCard product={selectedProduct} />}
      </View>
      <View style={styles.buttonContainer}>
        <LargeHorizontalButton
          text="CONFIRM"
          buttonColor="#6DAE43"
          textColor="white"
          onPress={onConfirm}
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
