import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProductsSectionList from "./ProductsSectionList";

const PageProductSearch = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* espacio para el header manual ya que es transparente para que sea igual al figma*/}
      <View style={styles.headerSpace} />
      <ProductsSectionList />
    </SafeAreaView>
  );
};

export default PageProductSearch;

const styles = StyleSheet.create({
  headerSpace: {
    height: 50,
    backgroundColor: "white",
  },
});
