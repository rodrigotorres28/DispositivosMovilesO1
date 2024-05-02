import * as React from 'react';
import {StyleSheet, Text, View, SectionList, TextInput,
  } from 'react-native';
import { products } from '../assets/products';
import ProductCard from './ProductCard';
import { Divider } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';

const inputContainerHeight = 32

const ProductsSectionList = () => {
    const [inputText, setInputText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSubmit = () => {
        setInputText("");
    };
    
    const filterByNameAndCategory = () => {
        const filtered = [];
    
        if (inputText === "") {
          return products;
        }
    
        for (const categoryElement of products) {
          if (
            categoryElement.categoryName.toLowerCase().includes(inputText.toLowerCase())
          ) {
            filtered.push(categoryElement);
          } else {
            const tempItemList = categoryElement.data.filter((item) =>
              item.name.toLowerCase().includes(inputText.toLowerCase())
            );
    
            if (tempItemList.length > 0) {
              filtered.push({
                id: categoryElement.id,
                categoryName: categoryElement.categoryName,
                data: tempItemList,
              });
            }
          }
        }
    
        return filtered;
    };

    useEffect(() => {
    const filtered = filterByNameAndCategory();
    setFilteredProducts(filtered);
    }, [inputText]);

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#9FA1B5"
                style={styles.icon}
                />
                <TextInput
                style={styles.inputText}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSubmit}
                placeholder="Search"
                placeholderTextColor="#9FA1B5"
                />
            </View>
        }
        sections={filteredProducts}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({item}) => (
        <ProductCard product={item}/>
        )}
        renderSectionHeader={({section: {categoryName}}) => (
            <>
                <Text style={styles.categoryTitle}>{categoryName}</Text>
                <Divider style={{ marginHorizontal: 18 }} />
            </>
        )}
    />
    </View>
  );
};

export default ProductsSectionList;

const styles = StyleSheet.create({
  container: { flex: 1},
  categoryTitle: {
    paddingVertical: 24,
    paddingHorizontal: 18,
    fontWeight: "700",
    fontSize: 18,
    color: "#46496B",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEFF4",
    height: inputContainerHeight,
    borderRadius: inputContainerHeight / 2,
    paddingHorizontal: 10,
    marginHorizontal: 18,
    marginTop: 12,
  },
  inputText: {
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
});
