import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../state/cartSlice";
import { RootState } from "../state/store";

interface AddMultipleButtonProps {
  product: {
    name: string;
    price: number;
    imagePath: ImageSourcePropType;
    id: number;
  };
}

const AddMultipleButton = ({ product }: AddMultipleButtonProps) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.productId === product.id),
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  if (!cartItem || cartItem.quantity === 0) {
    return (
      <TouchableOpacity onPress={handleAddToCart} style={styles.buttonAdd}>
        <Text style={styles.textAdd}>Add</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.multipleAddContainer}>
      <TouchableOpacity
        onPress={handleRemoveFromCart}
        style={styles.buttonsPlusMinus}
      >
        <MaterialCommunityIcons name="minus" color="black" size={16} />
      </TouchableOpacity>
      <Text style={styles.quantity}>{cartItem.quantity}</Text>
      <TouchableOpacity
        onPress={handleAddToCart}
        style={styles.buttonsPlusMinus}
      >
        <MaterialCommunityIcons name="plus" color="black" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default AddMultipleButton;

const styles = StyleSheet.create({
  buttonAdd: {
    borderWidth: 2,
    borderColor: "#5C3EDB",
    borderRadius: 33 / 2,
    width: 97,
    height: 33,
    justifyContent: "center",
  },
  multipleAddContainer: {
    borderWidth: 2,
    borderColor: "#F3F3F3",
    borderRadius: 33 / 2,
    width: 97,
    height: 33,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsPlusMinus: {
    justifyContent: "center",
    alignContent: "center",
    minWidth: 25,
  },
  textAdd: {
    fontWeight: "700",
    fontSize: 16,
    color: "#5C3EDB",
    alignSelf: "center",
  },
  quantity: {
    minWidth: 20,
    textAlign: "center",
  },
});
