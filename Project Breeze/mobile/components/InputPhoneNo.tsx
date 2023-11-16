import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { moderateScale } from "../constants/Layout";
import RegionPicker from "./RegionPicker";

function InputPhoneNo({ setRegion, activeRegion, regions, ...others }: any) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  return (
    <>
      <View style={styles.container}>
        {/* region picker */}
        <RegionPicker
          setRegion={setRegion}
          activeRegion={activeRegion}
          regions={regions}
        />

        {/* Vertical line */}
        <View style={styles.line} />
        {/* number input */}
        <TextInput
          keyboardType="numeric"
          style={[styles.input, { color: colorTheme.text }]}
          placeholderTextColor={colorTheme.text}
          {...others}
          // value={initialNumber}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(15),
    borderColor: "#E8E6EA",
    borderWidth: moderateScale(1),
    width: "100%",
    aspectRatio: 295 / 58,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginHorizontal: moderateScale(15),
    fontSize: moderateScale(18),
    flex: 1,
    height: "100%",
  },
  line: {
    borderWidth: moderateScale(1),
    borderColor: "#E8E6EA",
    height: moderateScale(18),
  },
});

export default InputPhoneNo;
