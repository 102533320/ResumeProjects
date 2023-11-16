import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function ImageTemplate({
  title,
  message,
  time,
  image,
  statusElement01,
}) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer01}>
        <LinearGradient
          colors={statusElement01}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            height: moderateScale(56),
            width: moderateScale(56),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: moderateScale(60),
          }}
        >
          <View
            style={{ borderWidth: moderateScale(2), borderRadius: moderateScale(60), borderColor: "#ffffff" }}
          >
            <Image style={styles.image} source={image} />
          </View>
        </LinearGradient>
        <View style={styles.messageContainer02}>
          <Text style={[styles.titleText,{color: colorTheme.text}]}>{title}</Text>
          <Text style={[styles.messageText,{color: colorTheme.subText}]}>{message}</Text>
        </View>
      </View>
      <View style={styles.messageContainer03}>
        <Text style={[styles.timeText,{color: colorTheme.subText}]}>{time}</Text>
        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: moderateScale(296),
    height: moderateScale(68),
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(6),
  },
  messageContainer01: {
    flexDirection: "row",
  },
  messageContainer02: {
    left: moderateScale(10),
    justifyContent: "center",
  },
  messageContainer03: {
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    width: moderateScale(296),
  },
  titleText: {
    fontWeight: "bold",
    fontSize: moderateScale(14),
  },
  messageText: {
    fontSize: moderateScale(14),
  },
  image: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: 60,
  },
  timeText: {
    fontWeight: "bold",
    fontSize: moderateScale(12),
  },
});
