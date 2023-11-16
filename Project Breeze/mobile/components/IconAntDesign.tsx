import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function IconAntDesign({
  onPress,
  name,
  size = 40,
  backgroundColor = "transparent",
  iconColor = "#000",
}: any) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name={name} color={iconColor} size={size * 0.5} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default IconAntDesign;
