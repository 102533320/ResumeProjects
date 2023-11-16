import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  onPress,
  name,
  size = 40,
  backgroundColor = "transparent",
  iconColor = "#000",
  borderColor = "transparent",
  borderRadius = 15,
}: any) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: borderRadius,
          borderWidth: 1,
          borderColor: borderColor,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.6}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Icon;
