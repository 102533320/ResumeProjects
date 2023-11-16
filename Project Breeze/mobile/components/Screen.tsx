import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, StatusBar } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

function Screen({ children, style }: any) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colorTheme.background }]}
    >
      <StatusBar
        barStyle={
          useColorScheme() === "light" ? "dark-content" : "light-content"
        }
        backgroundColor={colorTheme.background}
        translucent
      />
      <View
        style={[{ flex: 1, backgroundColor: colorTheme.background }, style]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
