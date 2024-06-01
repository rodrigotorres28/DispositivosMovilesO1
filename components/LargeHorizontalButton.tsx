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
  disabled?: boolean;
  disabledColor?: ColorValue;
}

const LargeHorizontalButton = ({
  text,
  buttonColor,
  textColor,
  disabled,
  disabledColor,
}: LargeHorizontalButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={disabled}>
        <View
          style={[
            styles.buttonShape,
            {
              backgroundColor:
                disabled && disabledColor !== undefined
                  ? disabledColor
                  : buttonColor,
            },
          ]}
        >
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
