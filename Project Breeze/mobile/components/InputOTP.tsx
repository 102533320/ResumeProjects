import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { moderateScale } from "../constants/Layout";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

function InputOTP({
  setState,
  styleActive = styles.inputActive,
  styleInactive = styles.inputInactive,
  onSubmit = () => console.log("pins submited"),
}: any) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  const r1 = useRef(null);
  const r2 = useRef(null);
  const r3 = useRef(null);
  const r4 = useRef(null);
  const r5 = useRef(null);
  const r6 = useRef(null);

  const refs: any[] = [r1, r2, r3, r4, r5, r6];

  const [pin1, setP1] = React.useState("");
  const [pin2, setP2] = React.useState("");
  const [pin3, setP3] = React.useState("");
  const [pin4, setP4] = React.useState("");
  const [pin5, setP5] = React.useState("");
  const [pin6, setP6] = React.useState("");

  const moveFoward = (currentRef: any, currentPin: string) => {
    if (currentPin != "") {
      let found = refs.findIndex((ref: any) => currentRef == ref);
      if (found >= 0 && found < refs.length - 1) {
        refs[found + 1].current.focus();
      }
    }
  };

  const moveBack = (currentRef: any, pin: string) => {
    if (pin == "") {
      let found = refs.findIndex((ref: any) => currentRef == ref);
      if (found > 0) {
        refs[found - 1].current.focus();
      }
    }
  };

  return (
    <View style={styles.otpBox}>
      <TextInput
        style={pin1 != "" ? styleActive : styleInactive}
        placeholderTextColor={colorTheme.text}
        placeholder="0"
        keyboardType="numeric"
        maxLength={1}
        autoFocus
        value={pin1}
        ref={refs[0]}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") moveBack(refs[0], pin1);
        }}
        onChangeText={(pin) => {
          setP1(pin);
          moveFoward(refs[0], pin);
        }}
      />
      <TextInput
        style={pin2 != "" ? styleActive : styleInactive}
        placeholderTextColor={colorTheme.text}
        placeholder="0"
        keyboardType="numeric"
        value={pin2}
        maxLength={1}
        ref={refs[1]}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") moveBack(refs[1], pin2);
        }}
        onChangeText={(pin) => {
          setP2(pin);
          moveFoward(refs[1], pin);
        }}
      />
      <TextInput
        style={pin3 != "" ? styleActive : styleInactive}
        placeholderTextColor={colorTheme.text}
        placeholder="0"
        keyboardType="numeric"
        value={pin3}
        maxLength={1}
        ref={refs[2]}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") moveBack(refs[2], pin3);
        }}
        onChangeText={(pin) => {
          setP3(pin);
          moveFoward(refs[2], pin);
        }}
      />
      <TextInput
        style={pin4 != "" ? styleActive : styleInactive}
        placeholderTextColor={colorTheme.text}
        placeholder="0"
        keyboardType="numeric"
        value={pin4}
        maxLength={1}
        ref={refs[3]}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") moveBack(refs[3], pin4);
        }}
        onChangeText={(pin) => {
          setP4(pin);
          moveFoward(refs[3], pin);
        }}
      />
      <TextInput
        style={pin5 != "" ? styleActive : styleInactive}
        placeholderTextColor={colorTheme.text}
        placeholder="0"
        keyboardType="numeric"
        value={pin5}
        maxLength={1}
        ref={refs[4]}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") moveBack(refs[4], pin5);
        }}
        onChangeText={(pin) => {
          setP5(pin);
          moveFoward(refs[4], pin);
        }}
      />
      <TextInput
        style={pin6 != "" ? styleActive : styleInactive}
        placeholderTextColor={colorTheme.text}
        placeholder="0"
        keyboardType="numeric"
        value={pin6}
        maxLength={1}
        ref={refs[5]}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") moveBack(refs[5], pin6);
        }}
        onChangeText={(pin) => {
          setP6(pin);
          if (pin != "") {
            setState(pin1 + pin2 + pin3 + pin4 + pin5 + pin);
            onSubmit();
            refs[5].current.blur();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputInactive: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(15),
    borderColor: "#E8E6EA",
    marginHorizontal: moderateScale(5),
    fontSize: moderateScale(28),
    color: "black",
    width: moderateScale(50),
    aspectRatio: 1,
    textAlign: "center",
  },
  inputActive: {
    borderRadius: moderateScale(15),
    backgroundColor: "#8A7DFF",
    marginHorizontal: moderateScale(5),
    fontSize: moderateScale(28),
    color: "white",
    width: moderateScale(50),
    aspectRatio: 1,
    textAlign: "center",
  },
  otpBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default InputOTP;
