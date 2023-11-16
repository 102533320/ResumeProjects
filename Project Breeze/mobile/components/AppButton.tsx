import React from "react";
import { StyleSheet, Pressable } from "react-native";
import AppText from "./AppText";


import {moderateScale} from "../constants/Layout"

function AppButton({ title, style, color = "#fff", onPress }: any) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#b4abff" : "#8A7DFF",
        },
        styles.button,
        style,
      ]}
      onPress={onPress}
    >
      <AppText style={[styles.text, { color: color }]}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(15),
    borderColor: "#E8E6EA",
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(15),
    width: "100%",
    aspectRatio: 295 / 56,
    marginVertical: moderateScale(10),
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
});

export default AppButton;
