import * as React from 'react';
import {StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { emptyCart } from '../state/cartSlice';

interface CartIconProps {}

const CartIconButton = (props: CartIconProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState)  => state.cart.items);

  const emptyCartAlert = () =>
    Alert.alert('Emptying Cart', "Are you sure you want to remove all items from the cart?" , [
      {
        text: 'Cancel',
      },
      {text: 'OK', onPress: () => dispatch(emptyCart())},
    ]);

  return (
    <TouchableOpacity
      onPress={emptyCartAlert}
      style={ styles.cartIcon}>
      <Image source={cartItems.length > 0 ? require("../assets/CartWithItems.png") : require("../assets/CartEmpty.png")}/>
    </TouchableOpacity>
  );
};

export default CartIconButton;

const styles = StyleSheet.create({
  cartIcon: {
    width: 20,
    height: 20, 
    marginRight: 10,
  }
});
