import { View, StyleSheet } from "react-native";
import * as React from "react";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import Cognito from "../../auth/CognitoAuth";
import ActivityIndicator from "../../components/ActivityIndicator";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must have at least one lower-case, one upper-case and a digit"
    )
    .label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm password"),
  code: Yup.string()
    .required()
    .matches(/^[\d]{6}$/, "Confirmation code must contain 6 digits")
    .label("Password"),
});

export default function ResetPasswordSubmit({ navigation, route }) {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <BackButton navigation={navigation} />

        <View style={styles.titleBox}>
          <AppText style={styles.title}>Enter a new password</AppText>
          <AppText style={styles.description}>
            Please enter your new password.
          </AppText>
        </View>

        <AppForm
          initialValues={{ password: "", confirmPassword: "", code: "" }}
          onSubmit={(values) => {
            setLoading(true);
            Cognito.forgotPasswordSubmit(
              route.params["email"],
              values.code,
              values.password
            )
              .then(() => {
                setLoading(false);
                navigation.navigate("Home");
                console.log("Success!");
              })
              .catch((err) => {
                setLoading(false);

                console.log(err);
              });
          }}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            placeholder="Password"
          />

          <AppFormField
            name="confirmPassword"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            placeholder="Confirm password"
          />

          <AppFormField
            name="code"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            placeholder="Code"
          />
          <View style={styles.button}>
            <SubmitButton title="Continue" />
          </View>
        </AppForm>
      </Screen>
    </>
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
    fontSize: moderateScale(24),
    fontWeight: "bold",
  },
  titleBox: {
    marginVertical: moderateScale(20),
  },
  description: {
    fontSize: moderateScale(14),
    marginVertical: moderateScale(10),
  },
});
