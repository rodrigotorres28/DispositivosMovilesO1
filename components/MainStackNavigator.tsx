import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MainStack } from '../types/MainStackTypes';
import PageProductSearch from './PageProductSearch';
import { color } from '@rneui/themed/dist/config';

interface MainStackNavigationProps {}

const MainStackNavigation = (props: MainStackNavigationProps) => {
  return (
    <NavigationContainer>  
      <MainStack.Navigator initialRouteName="ProductSearch">
        <MainStack.Screen
          name= "ProductSearch"
          component={PageProductSearch}
          options={{ headerTitle: "Product Search", headerTitleStyle: {color: "red", fontSize: 20}, contentStyle: {backgroundColor: "white"}}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
