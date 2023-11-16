import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AppText from "../AppText";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import {   moderateScale } from "../../constants/Layout";

function InterestItemSetting({ item, data, onSelect }: any) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  let current: number = -1;
  let isActive = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].title === item.title) {
      current = i;
      isActive = data[i].active;
      break;
    }
  }
  let iconBackground = isActive ? "white" : "#8A7DFF";
  let fontColor = isActive ? "white" : colorTheme.text;
  let fontWeight = isActive ? "bold" : "normal";
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        data[current].active = !data[current].active;
        onSelect([...data]);
      }}
    >
      <View
        style={[
          isActive ? styles.itemActive : styles.itemInactive,
          styles.item,
        ]}
      >
        <MaterialCommunityIcons
          name={item.icon}
          color={iconBackground}
          size={moderateScale(20)}
        />
        <AppText
          style={{
            fontSize: moderateScale(14),
            color: fontColor,
            fontWeight: fontWeight,
            marginLeft: moderateScale(5),
          }}
        >
          {item.title}
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: "#E8E6EA",
    borderRadius: moderateScale(15),
    height: moderateScale(45),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width:moderateScale(140),
    marginLeft: moderateScale(10),
  },
  itemInactive: {
    backgroundColor: "transparent",
  },
  itemActive: {
    margin: moderateScale(2),
    borderWidth: moderateScale(1),
    borderColor: "#E8E6EA",
    borderRadius: moderateScale(15),
    height: moderateScale(45),
    padding: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8A7DFF",
  },
});

export default InterestItemSetting;