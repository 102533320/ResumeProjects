import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import React from "react";

import AppText from "../AppText";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { moderateScale } from "../../constants/Layout";

function PickerItem({ item, activeItem, onPress }: any) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const backgroundColor = item.id === activeItem.id ? "#8A7DFF" : "transparent";
  const borderColor = item.id === activeItem.id ? "#8A7DFF" : "#E8E6EA";
  const color = item.id === activeItem.id ? "#fff" : colorTheme.text;
  const iconcolor = item.id === activeItem.id ? "#fff" : "#ADAFBB";
  const boldText = item.id === activeItem.id ? "bold" : "normal";
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.button,
            { backgroundColor: backgroundColor, borderColor: borderColor },
          ]}
        >
          <AppText style={{ color: color, fontWeight: boldText }}>
            {item.title}
          </AppText>
          <MaterialCommunityIcons name="check" size={25} color={iconcolor} />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "space-between",
    marginVertical: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    aspectRatio: 295 / 58,
    width: "100%",
    borderColor: "#E8E6EA",
    borderRadius: moderateScale(15),
    borderWidth: 1,
  },
  buttonActive: {
    borderColor: "transparent",
  },
  buttonInactive: {
    borderColor: "#E8E6EA",
  },
});
export default PickerItem;
