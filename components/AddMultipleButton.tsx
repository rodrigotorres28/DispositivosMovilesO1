import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface AddMultipleButtonProps {
  onAdd: () => void;
  onRemove: () => void;
  displayedAmount: number;
}

const AddMultipleButton = ({
  onAdd,
  onRemove,
  displayedAmount,
}: AddMultipleButtonProps) => {

  if (displayedAmount === 0) {
    return (
      <TouchableOpacity onPress={onAdd} style={styles.buttonAdd}>
        <Text style={styles.textAdd}>Add</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.multipleAddContainer}>
      <TouchableOpacity onPress={onRemove} style={styles.buttonsPlusMinus}>
        <MaterialCommunityIcons name="minus" color="black" size={16} />
      </TouchableOpacity>
      <Text style={styles.quantity}>{displayedAmount}</Text>
      <TouchableOpacity onPress={onAdd} style={styles.buttonsPlusMinus}>
        <MaterialCommunityIcons name="plus" color="black" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default AddMultipleButton;

const styles = StyleSheet.create({
  buttonAdd: {
    borderWidth: 2,
    borderColor: "#5C3EDB",
    borderRadius: 33 / 2,
    width: 97,
    height: 33,
    justifyContent: "center",
  },
  multipleAddContainer: {
    borderWidth: 2,
    borderColor: "#F3F3F3",
    borderRadius: 33 / 2,
    width: 97,
    height: 33,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
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
  quantity: {
    minWidth: 20,
    textAlign: "center",
  },
});
