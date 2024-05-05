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
      style={ styles.cartButton}>
      <Image style={styles.cartImage} source={cartItems.length > 0 ? require("../assets/CartWithItems.png") : require("../assets/CartEmpty.png")}/>
    </TouchableOpacity>
  );
};

export default CartIconButton;

const styles = StyleSheet.create({
  cartButton: {
    width: 30,
    height: 30, 
    marginRight: 14,
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  cartImage: {
    height:25,
    width:25,
    resizeMode: "center"
  }

});
