import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MainStack } from '../types/MainStackTypes';
import PageProductSearch from './PageProductSearch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { emptyCart } from '../state/cartSlice';

interface MainStackNavigationProps {}

const MainStackNavigation = (props: MainStackNavigationProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState)  => state.cart.items);

  return (
    <NavigationContainer>  
      <MainStack.Navigator initialRouteName="ProductSearch">
        <MainStack.Screen
          name= "ProductSearch"
          component={PageProductSearch}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(emptyCart())
                }}
                style={{ marginRight: 10 }}>
                <Image source={cartItems.length > 0 ? require("../assets/CartWithItems.png") : require("../assets/CartEmpty.png")}/>
              </TouchableOpacity>
            ),
            headerTitle:"",
            contentStyle: {backgroundColor: "white"}}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
