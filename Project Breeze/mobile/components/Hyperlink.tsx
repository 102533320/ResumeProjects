import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { moderateScale } from "../constants/Layout";
import AppText from "./AppText";

function Hyperlink({ title, style, onPress }: any) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <AppText style={[styles.hyperlink, style]}>{title}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  hyperlink: {
    color: "#8A7DFF",
    fontSize: moderateScale(12),
    fontWeight: "normal",
  },
});

export default Hyperlink;
