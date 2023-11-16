import { View, StyleSheet } from "react-native";
import * as React from "react";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/form";
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
});

export default function SignupPassword({ navigation, route }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  Cognito.onSignUp(() =>
    navigation.navigate("ConfirmSignup", { ...route.params })
  );

  const signUp = async (user, password) => {
    setLoading(true);
    try {
      const result = await Cognito.signUp(user, password);
      if (result) {
        setError(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <BackButton navigation={navigation} />
        <View style={styles.titleBox}>
          <AppText style={styles.title}>Enter your password</AppText>
          <AppText style={styles.description}>
            Please set a new password. We will send you a 4-digit code to verify
            your account.
          </AppText>
        </View>

        <AppForm
          initialValues={{ password: "" }}
          onSubmit={(values) => {
            signUp(route.params["user"], values.password);
          }}
          validationSchema={validationSchema}
        >
          <ErrorMessage visible={error} error={"An error has occured! Please try again later!"} />
          <AppFormField
            name="password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            placeholder="password"
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
  title: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
  },
  titleBox: {
    marginVertical: moderateScale(20),
  },
  description: {
    fontSize: moderateScale(14),
  },
});
