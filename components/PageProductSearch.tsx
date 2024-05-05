import React from "react";
import { View, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductsSectionList from "./ProductsSectionList";
import Carousel from "./Carousel";
import { carouselSlides } from "../assets/carouselSlides";

const PageProductSearch = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.carouselContainer}>
        <Carousel slides={carouselSlides}/>
      </View>
      <ProductsSectionList />
    </SafeAreaView>
  );
};

export default PageProductSearch;

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 12,
    marginTop: 52,
  }
});
