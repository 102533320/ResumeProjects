import { View, StyleSheet } from "react-native";
import * as React from "react";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
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

export default function SignupNumber({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />

      <View style={styles.titleBox}>
        <AppText style={styles.title}>My mobile</AppText>
        <AppText style={styles.description}>
          Please enter your valid phone number. We will send you a 4-digit code
          to verify your account.
        </AppText>
      </View>

      <AppForm
        initialValues={{
          number: "",
          region: CountryCodes.find((country) => country.code === "AU"),
        }}
        onSubmit={(values: any) =>
          navigation.navigate("SignupPassword", { user: values.number })
        }
        validationSchema={validationSchema}
      >
        {/* Phone number field */}
        <View style={styles.mobileContainer}>
          <AppMobileField
            name="number"
            activeRegion="region"
            regions={CountryCodes}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            placeholder="Phone number"
            maxLength={9}
          />
        </View>
        <View style={styles.button}>
          <SubmitButton title="Continue" />
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: moderateScale(20),
  },
  container: {
    padding: moderateScale(30),
  },
  mobileContainer: {
    marginVertical: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(34),
    fontWeight: "bold",
  },
  titleBox: {
    marginVertical: moderateScale(20),
  },
  description: {
    fontSize: moderateScale(14),
  },
});
