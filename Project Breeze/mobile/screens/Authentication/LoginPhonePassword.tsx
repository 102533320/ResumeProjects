import { Image, View, StyleSheet} from "react-native";
import * as React from "react";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import Hyperlink from "../../components/Hyperlink";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../../components/form";
import BackButton from "../../components/BackButton";
import AuthContext from "../../context/AuthContext";
import Cognito from "../../auth/CognitoAuth";
import { moderateScale } from "../../constants/Layout";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().label("Password"),
});

export default function LoginPhonePassword({ navigation, route }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(AuthContext);

  const signIn = async (number, password) => {
    setLoading(true);
    Cognito.signIn(number, password)
      .then(({ attributes }) => {
        setLoading(false);
        setError(false);
        auth["setUser"](attributes);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
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
          <AppText style={styles.title}>Enter your password</AppText>
          <AppForm
            initialValues={{ password: "" }}
            onSubmit={({ password }) =>
              signIn(route.params["number"], password)
            }
            validationSchema={validationSchema}
          >
            <ErrorMessage
              visible={error}
              error={"Number or Password incorrect!"}
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

  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  link: {
    marginVertical: moderateScale(30),
  },
});
