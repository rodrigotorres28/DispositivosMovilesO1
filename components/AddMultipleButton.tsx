import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface AddMultipleButtonProps {}

const AddMultipleButton = (props: AddMultipleButtonProps) => {
  const [addedItems, setaddedItems] = useState(0);

  const handleAddIncrease = () => {
    setaddedItems(addedItems + 1);
    console.log(addedItems);
  };

  const handleAddDecrease = () => {
    setaddedItems(addedItems - 1);
  };

  if (addedItems <= 0) {
    return (
      <TouchableOpacity onPress={handleAddIncrease} style={styles.buttonAdd}>
        <Text style={styles.textAdd}>Add</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.multipleAddContainer}>
        <TouchableOpacity
          onPress={handleAddDecrease}
          style={styles.buttonsPlusMinus}
        >
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="minus"
            color="black"
            size={16}
          />
        </TouchableOpacity>
          <Text style={{minWidth: 20, alignSelf: "center", textAlign: "center"}}>{addedItems}</Text>
        <TouchableOpacity
          onPress={handleAddIncrease}
          style={styles.buttonsPlusMinus}
        >
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="plus"
            color="black"
            size={16}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default AddMultipleButton;

const styles = StyleSheet.create({
  buttonAdd: {
    borderWidth: 2,
    borderColor: "#5C3EDB",
    borderRadius: 50,
    width: 97,
    height: 33,
    justifyContent: "center",
  },
  multipleAddContainer: {
    borderWidth: 2,
    borderColor: "#F3F3F3",
    borderRadius: 50,
    width: 97,
    height: 33,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  buttonsPlusMinus: {
    justifyContent: "center",
    alignContent: "center",
    minWidth: 25,
  },
  textAdd: {
    fontWeight: "700",
    fontSize: 16,
    color: "#5C3EDB",
    alignSelf: "center",
  },
});
