import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";


import {
  RootStackParamList,
} from "../types";
import HomeScreen from "../screens/Authentication/HomeScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";
import LoginPhoneNumber from "../screens/Authentication/LoginPhoneNumber";
import LoginPhonePassword from "../screens/Authentication/LoginPhonePassword";
import SignupScreen from "../screens/Authentication/SignupScreen";
import ConfirmSignup from "../screens/Authentication/ConfirmSignUp";
import EmailScreen from "../screens/Authentication/SignupEmail";
import PhoneScreen from "../screens/Authentication/SignupNumber";
import SignupPassword from "../screens/Authentication/SignupPassword";
import ResetPassword from "../screens/Authentication/ResetPassword";
import ResetPasswordSubmit from "../screens/Authentication/ResetPasswordSubmit";
import TermofUseScreen from "../screens/Authentication/TermsOfUse";
import PrivacypolicyScreen from "../screens/Authentication/PrivacyPolicy";
import { StatusBar } from "react-native";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginPhoneNumber" component={LoginPhoneNumber} />
      <Stack.Screen name="LoginPhonePassword" component={LoginPhonePassword} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ConfirmSignup" component={ConfirmSignup} />
      <Stack.Screen name="SignupEmail" component={EmailScreen} />
      <Stack.Screen name="SignupPassword" component={SignupPassword} />
      <Stack.Screen name="SignupNumber" component={PhoneScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="ResetPasswordSubmit"
        component={ResetPasswordSubmit}
      />
      <Stack.Screen name="TermOfUse" component={TermofUseScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacypolicyScreen} />
    </Stack.Navigator>
  );
}
