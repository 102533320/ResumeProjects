import { Image, View, StyleSheet } from "react-native";
import * as React from "react";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Hyperlink from "../../components/Hyperlink";
import Icon from "../../components/Icon";
import { moderateScale } from "../../constants/Layout";
export default function SignupScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/images/breeze.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <AppText style={styles.title}>Sign up to continue</AppText>

        <AppButton
          title="Continue with email"
          style={[styles.buttonEmail, styles.button]}
          color="#8A7DFF"
          onPress={() => navigation.navigate("SignupEmail")} //Add Navigation
        />

        <AppButton
          title="Use phone number"
          style={styles.button}
          onPress={() => navigation.navigate("SignupNumber")} //Add Navigation
        />
        <View style={styles.signupWithContainer}>
          <AppText style={styles.signUpWith}>or sign up with</AppText>

          <View style={styles.iconsContainer}>
            <Icon
              onPress={() => console.log("Apple")}
              name="apple"
              size={56}
              iconColor="#8A7DFF"
              backgroundColor="transparent"
              borderColor="#E5E5E5"
            />
            <Icon
              onPress={() => console.log("Facebook")}
              name="facebook"
              size={56}
              iconColor="#8A7DFF"
              backgroundColor="transparent"
              borderColor="#E5E5E5"
            />

            <Icon
              onPress={() => console.log("Google")}
              name="google"
              size={56}
              iconColor="#8A7DFF"
              backgroundColor="transparent"
              borderColor="#E5E5E5"
            />
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.link}>
          <Hyperlink
            title="Already have an account? Log in here."
            onPress={() => navigation.navigate("Home")}
          />
        </View>

        <View style={[styles.policyBox, styles.link]}>
          <View style={styles.policiy}>
            <Hyperlink
              title="Terms of use"
              onPress={() => navigation.navigate("TermOfUse")} //Add Navigation
            />
          </View>

          <View style={styles.policiy}>
            <Hyperlink
              title="Privacy Policy"
              onPress={() => navigation.navigate("PrivacyPolicy")} //Add Navigation
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(30),
    alignItems: "center",
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginVertical: moderateScale(16),
  },
  buttonEmail: {
    backgroundColor: "transparent",
    borderWidth: moderateScale(1),
    borderColor: "#E5E5E5",
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100)
  },
  iconsContainer: {
    marginVertical: moderateScale(10),
    flexDirection: "row",
    width: "100%",
    padding: moderateScale(10),
    justifyContent: "space-evenly",
  },

  link: {
    marginVertical: moderateScale(15),
  },

  policiy: {
    marginHorizontal: moderateScale(14),
  },
  policyBox: {
    flexDirection: "row",
  },
  signUpWith: {
    fontSize: moderateScale(12),
  },

  signupWithContainer: {
    width: "100%",
    marginTop: moderateScale(50),
    alignItems: "center",
  },

  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
});
