import { View, StyleSheet } from "react-native";
import * as React from "react";
import * as Yup from "yup";
import { RootStackScreenProps } from "../../types";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import Cognito from "../../auth/CognitoAuth";
import ActivityIndicator from "../../components/ActivityIndicator";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function ResetPassword({
  navigation,
}: RootStackScreenProps<"ResetPassword">) {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <BackButton navigation={navigation} />

        <View style={styles.titleBox}>
          <AppText style={styles.title}>Forget your password?</AppText>
          <AppText style={styles.description}>
            Confirm your email address and we will send you a link.
          </AppText>
        </View>

        <AppForm
          initialValues={{ email: "" }}
          onSubmit={(values) => {
            setLoading(true);
            Cognito.forgotPassword(values.email)
              .then(() => {
                setLoading(false);
                navigation.navigate("ResetPasswordSubmit", values);
              })
              .catch((err) => {
                setLoading(false);

                console.log(err);
              });
          }}
          validationSchema={validationSchema}
        >
          {/* Email field */}
          <AppFormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            placeholder="Email"
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
  description: {
    fontSize: moderateScale(14),
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
});
