import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import Hyperlink from "../../components/Hyperlink";
import Icon from "../../components/Icon";
import InputOTP from "../../components/InputOTP";
import Cognito from "../../auth/CognitoAuth";
import BackButton from "../../components/BackButton";
import AuthContext from "../../context/AuthContext";
import { moderateScale } from "../../constants/Layout";
import ActivityIndicator from "../../components/ActivityIndicator";


export default function ConfirmSignup({ navigation, route }) {
  const [loading, setLoading] = React.useState(false);
  const [pins, setPins] = useState("");
  const auth = useContext(AuthContext);
  
  Cognito.onAutoSignIn(({ attributes }) => {
    auth["setUser"](attributes);
  });

  const resendConfirmation = async () => {
    try {
      await Cognito.resendConfirmationCode(route.params["user"]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await Cognito.confirmSignUp(route.params["user"], pins);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.container}>
        <BackButton navigation={navigation} />

        {/* Title Text */}
        <AppText style={styles.title}>
          Type the verification code we’ve sent you
        </AppText>

        {/* OTP Box */}
        <View style={[styles.otpBox]}>
          <InputOTP setState={setPins} />
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={styles.bottomBox}>
            {/* Resend confirmation code Hyperlink */}
            <Hyperlink
              title="Send Again"
              style={styles.hyperlink}
              onPress={resendConfirmation}
            />
            {/* Submit button (arrow) */}
            <Icon
              name="arrow-right"
              iconColor="#8A7DFF"
              size={moderateScale(60)}
              onPress={onSubmit}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(30),
  },
  bottomBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hyperlink: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  otpBox: {
    marginVertical: moderateScale(48),
  },

  title: {
    fontSize: moderateScale(18),
    marginTop: "30%",
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
  },
});
