import React from "react";
import { View, StyleSheet} from "react-native";
import ProductsSectionList from "./ProductsSectionList";
import Carousel from "./Carousel";
import { carouselSlides } from "../assets/carouselSlides";

const PageProductSearch = () => {



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.carouselContainer}>
        <Carousel slides={carouselSlides}/>
      </View>
      <ProductsSectionList />
    </View>
  );
};

export default PageProductSearch;

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 24,
  }
});
