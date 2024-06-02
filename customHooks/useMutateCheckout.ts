import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import productEndpoints from "../axios/endpoints";
import { CartItem, emptyCart } from "../state/cartSlice";

const useMutateCheckout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (cartItems: CartItem[]) => productEndpoints.checkout(cartItems),
    onSuccess: () => {
      Alert.alert("You are all set", "Your purchase was successful");
      dispatch(emptyCart());
    },
    onError: (error) => {
      console.error("POST error", error);
      Alert.alert(
        "Try again later",
        "An error occurred while validating your purchase",
      );
    },
  });
};

export default useMutateCheckout;
