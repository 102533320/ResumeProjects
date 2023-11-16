import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet, TextInput, View } from "react-native";
import { moderateScale } from "../../constants/Layout";
import ErrorMessage from "./ErrorMessage";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
function AppFormField({ name, ...others }: any) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { color: colorTheme.text }]}
        placeholderTextColor={colorTheme.text}
        onChangeText={handleChange(name)}
        onBlur={() => {
          setFieldTouched(name);
        }}
        {...others}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#E8E6EA",
    justifyContent: "center",
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    borderRadius: moderateScale(15),
    fontSize: moderateScale(12),
    aspectRatio: 295 / 58,
    width: "100%",
  },

  inputContainer: {
    marginVertical: moderateScale(10),
    width: "100%",
  },
});

export default AppFormField;
