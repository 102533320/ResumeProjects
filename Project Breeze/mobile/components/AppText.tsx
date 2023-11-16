import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { moderateScale } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";

function AppText({ children, style }: any) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  return (
    <Text style={[styles.text, { color: colorTheme.text }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(16),
  },
});

export default AppText;
