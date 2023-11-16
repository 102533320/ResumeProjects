import { StyleSheet, Image, View, Dimensions } from "react-native";
import React from "react";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Hyperlink from "../../components/Hyperlink";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { moderateScale } from "../../constants/Layout";
export default function HomeScreen({ navigation }) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  return (
    <Screen style={[styles.container, {backgroundColor: colorTheme.background}]}>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/images/breeze.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <AppText style={styles.title}>Login to continue</AppText>

        <AppButton
          title="Email"
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        />

        <AppButton
          title="Phone Number"
          style={styles.button}
          onPress={() => navigation.navigate("LoginPhoneNumber")} //Fix Navigation
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.link}>
          <Hyperlink
            title="Dont have an account? Sign Up Now"
            onPress={() => navigation.navigate("Signup")}
          />
        </View>
        <View style={styles.link}>
          <Hyperlink
            title="Forgot Password?"
            onPress={() => navigation.navigate("ResetPassword")} //Add Navigation
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(30),
    alignItems: "center",
  },

  button: {
    marginVertical: moderateScale(16),
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginVertical: moderateScale(10),
  },

  text: {
    fontSize: moderateScale(12),
  },

  image: {
    width: moderateScale(100),
    height: moderateScale(100)
  },

  link: {
    marginVertical: moderateScale(30),
  },
});
