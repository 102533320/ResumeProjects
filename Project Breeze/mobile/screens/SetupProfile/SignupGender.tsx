import * as React from "react";
import { StyleSheet } from 'react-native';
import * as Yup from "yup";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, FormPicker, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  gender: Yup.string().required().label("Gender"),
});

const DATA = [
  {
    id: "1",
    title: "Male",
  },
  {
    id: "2",
    title: "Female",
  },
  {
    id: "3",
    title: "Other",
  },
];

export default function GenderScreen({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />

      <AppText style={styles.heading}>I am a</AppText>

      <AppForm
        initialValues={{ gender: "" }}
        onSubmit={(values) => {
          console.log(route.params);
          navigation.navigate("SignupGenderPreference", {
            ...route.params,
            ...values,
          });
        }}
        validationSchema={validationSchema}
      >
        <FormPicker
          name="gender"
          data={DATA}
          keyExtractor={(item: any) => item.id}
        />

        <SubmitButton title="Continue" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(30),
  },
  heading: {
    marginTop: "10%",
    fontWeight: "bold",
    fontSize: moderateScale(34),
  },
});
