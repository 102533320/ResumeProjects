import * as React from "react";
import { StyleSheet } from 'react-native';
import * as Yup from "yup";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, FormPicker, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  preference: Yup.string().required().label("Gender"),
});

const DATA = [
  {
    id: "4",
    title: "Male",
    active: false,
  },
  {
    id: "5",
    title: "Female",
    active: false,
  },
  {
    id: "6",
    title: "Other",
    active: false,
  },
];

export default function GenderpreScreen({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />

      <AppText style={styles.heading}>Your preference</AppText>

      <AppForm
        initialValues={{ preference: "" }}
        onSubmit={(values) => {
          console.log(route.params);
          navigation.navigate("SignupAge", {
            ...route.params,
            ...values,
          });
        }}
        //onSubmit={() => console.log(route.params)}
        validationSchema={validationSchema}
      >
        <FormPicker
          name="preference"
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
