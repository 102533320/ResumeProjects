import { View, StyleSheet } from "react-native";
import * as React from "react";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, LocationField, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  location: Yup.object().required().label("Location"),
});

export default function LocationScreen({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />

      <View style={styles.headerContainer}>
        <AppText style={styles.heading}>Set your location</AppText>
        <AppText>Enable your location to find people near you!</AppText>
      </View>

      <AppForm
        initialValues={{ location: "" }}
        onSubmit={(values) => {
          console.log(route.params),
            navigation.navigate("SignupInterest", {
              ...route.params,
              ...values,
            });
        }}
        validationSchema={validationSchema}
      >
        <LocationField name="location" />

        <SubmitButton title="Continue" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(30),
  },
  headerContainer: {
    width: "100%",
    marginVertical: moderateScale(20),
  },
  heading: {
    fontWeight: "bold",
    fontSize: moderateScale(34),
  },
});
