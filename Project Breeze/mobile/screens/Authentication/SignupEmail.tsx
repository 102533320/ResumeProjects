import { View, StyleSheet} from "react-native";
import * as React from "react";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default function SignupEmail({ navigation }) {
  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.titleBox}>
        <AppText style={styles.title}>E-mail</AppText>
        <AppText style={styles.description}>
          Please enter a valid e-mail address. We will send you a 4-digit code
          to verify your account.
        </AppText>
      </View>

      <AppForm
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          navigation.navigate("SignupPassword", { user: values.email });
        }}
        validationSchema={validationSchema}
      >
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
