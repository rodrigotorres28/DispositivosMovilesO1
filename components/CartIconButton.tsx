import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { emptyCart } from '../state/cartSlice';

interface CartIconProps {}

const CartIconButton = (props: CartIconProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState)  => state.cart.items);

  return (
    <TouchableOpacity
    
      onPress={() => {
        dispatch(emptyCart())
      }}
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
