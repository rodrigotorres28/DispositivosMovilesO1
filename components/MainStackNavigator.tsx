import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import CartIconButton from "./CartIconButton";
import PageProductSearch from "./PageProductSearch";
import { MainStack } from "../types/MainStackTypes";

interface MainStackNavigationProps {}

const MainStackNavigation = (props: MainStackNavigationProps) => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="ProductSearch">
        <MainStack.Screen
          name="ProductSearch"
          component={PageProductSearch}
          options={{
            headerRight: () => <CartIconButton />,
            headerTitle: "",
            headerTintColor: "transparent",
            headerTransparent: true,
            contentStyle: { backgroundColor: "white" },
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
