import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import CartIconButton from "./CartIconButton";
import PageProductSearch from "./PageProductSearch";
import PageShoppingCart from "./PageShoppingCart";
import { MainStack } from "../types/MainStackTypes";

interface MainStackNavigationProps {}

const MainStackNavigation = (props: MainStackNavigationProps) => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="ProductSearch">
        <MainStack.Screen
          name="ProductSearch"
          component={PageProductSearch}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <CartIconButton navigation={navigation} route={route} />
            ),
            headerTitle: "",
            headerTintColor: "transparent",
            contentStyle: { backgroundColor: "white" },
            headerShadowVisible: false,
          })}
        />
        <MainStack.Screen
          name="ShoppingCart"
          component={PageShoppingCart}
          options={{
            headerTitle: "",
            headerTintColor: "transparent",
            contentStyle: { backgroundColor: "white" },
            headerShadowVisible: false,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
