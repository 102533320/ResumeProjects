import { Image, View, StyleSheet } from "react-native";
import * as React from "react";
import * as Yup from "yup";
import { RootStackScreenProps } from "../../types";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import Hyperlink from "../../components/Hyperlink";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../../components/form";
import BackButton from "../../components/BackButton";
import Cognito from "../../auth/CognitoAuth";
import AuthContext from "../../context/AuthContext";
import ActivityIndicator from "../../components/ActivityIndicator";
import { moderateScale } from "../../constants/Layout";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(AuthContext);

  const signIn = async ({ email, password }) => {
    setLoading(true);
    Cognito.signIn(email, password)
      .then(({ attributes }) => {
        setError(false);
        setLoading(false);
        auth["setUser"](attributes);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <View style={styles.contentContainer}>
          <BackButton navigation={navigation} />
          <Image
            source={require("../../assets/images/breeze.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.contentContainer}>
          <AppText style={styles.title}>Login to continue</AppText>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={signIn}
            validationSchema={validationSchema}
          >
            <ErrorMessage
              visible={error}
              error={"Email or Password incorrect!"}
            />
            <AppFormField
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="off"
              placeholder="Email"
            />
            <AppFormField
              name="password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="off"
              placeholder="password"
            />

            <SubmitButton title={"Login"} />
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
              onPress={() => navigation.navigate("ResetPassword")}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(30),
    alignItems: "center",
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginVertical: moderateScale(10),
  },
  link: {
    marginVertical: moderateScale(30),
  },
});
