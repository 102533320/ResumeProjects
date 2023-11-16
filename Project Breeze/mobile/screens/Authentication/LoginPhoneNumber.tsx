import {Image, View, StyleSheet } from "react-native";
import * as React from "react";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import Hyperlink from "../../components/Hyperlink";
import {
  AppForm,
  SubmitButton,
  AppMobileField,
} from "../../components/form";
import CountryCodes from "../../config/CountryCodes.json";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";
const validationSchema = Yup.object().shape({
  number: Yup.string().required().min(9).label("Number"),
});

export default function LoginPhoneNumber({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.contentContainer}>
        <BackButton navigation={navigation} />

        <Image
          source={require("../../assets/images/breeze.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <AppText style={styles.title}>Enter your phone number</AppText>

        <AppForm
          initialValues={{
            number: "",
            region: CountryCodes.find((country) => country.code === "AU"),
          }}
          onSubmit={(values: any) => {
            navigation.navigate("LoginPhonePassword", {
              number: values.number,
            });
          }}
          validationSchema={validationSchema}
        >
          {/* Phone number field */}
          <AppMobileField
            name="number"
            viewStyle={styles.mobileField}
            activeRegion="region"
            regions={CountryCodes}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            placeholder="Phone number"
            maxLength={9}
          />
          <View style={styles.buttonContainer}>
            <SubmitButton title={"Continue"} />
          </View>
        </AppForm>
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
  buttonContainer: {
    marginTop: moderateScale(54),
    width: "100%",
  },

  container: {
    paddingHorizontal: moderateScale(30),
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  mobileField: {
    marginBottom: moderateScale(70),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginBottom: moderateScale(30),
  },
  link: {
    marginVertical: moderateScale(30),
  },
});
