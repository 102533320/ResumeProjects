import { StyleSheet, Text, View, Switch } from "react-native";
import * as React from "react";
import * as Yup from "yup";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { DarkModeContext } from "../../context/DarkModeContext";
import { useContext } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import HeaderSetting from "../../components/HeaderSetting";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

export default function Preference({ navigation, route }) {
  const theme = useContext(DarkModeContext);
  console.log(theme["darkMode"]);
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  const toggleSwitch = () => theme["setDarkMode"](!theme["darkMode"]);

  return (
    <>
      <HeaderSetting title="Preferences" navigation={navigation} />
      <View
        style={[styles.container, { backgroundColor: colorTheme.background }]}
      >
        <View style={[styles.option]}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: moderateScale(16),
              color: colorTheme.text,
            }}
          >
            Dark mode
          </Text>

          <ToggleSwitch
            isOn={theme["darkMode"]}
            onColor="#8A7DFF"
            offColor="#C0C0C0"
            onToggle={toggleSwitch}
            size="medium"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateScale(15),
  },
  option: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "77%",
    left: moderateScale(40),
    height: moderateScale(60),
  },
});
