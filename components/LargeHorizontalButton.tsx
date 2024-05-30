import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ColorValue,
} from "react-native";

interface LargeHorizontalButtonProps {
  text: string;
  buttonColor: string;
  textColor: ColorValue;
}

const LargeHorizontalButton = ({
  text,
  buttonColor,
  textColor,
}: LargeHorizontalButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={[styles.buttonShape, { backgroundColor: buttonColor }]}>
          <Text style={[styles.textStyle, { color: textColor }]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LargeHorizontalButton;

const styles = StyleSheet.create({
  container: {},
  buttonShape: {
    marginHorizontal: 18,
    height: 48,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
  },
});
