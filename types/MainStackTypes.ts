import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamList = {
  ProductSearch: undefined;
  ShoppingCart: undefined;
};

export const MainStack = createNativeStackNavigator<StackParamList>();
