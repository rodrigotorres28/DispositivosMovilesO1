import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface PageShoppingCartProps {}

const PageShoppingCart = (props: PageShoppingCartProps) => {
  return (
    <View style={styles.container}>
      <Text>PageShoppingCart</Text>
    </View>
  );
};

export default PageShoppingCart;

const styles = StyleSheet.create({
  container: {},
});
