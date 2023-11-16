import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { RootStackParamList } from "../types";

import GenderScreen from "../screens/SetupProfile/SignupGender";
import GenderPreScreen from "../screens/SetupProfile/SignupGenderPre";
import LocationScreen from "../screens/SetupProfile/SignupLocation";
import InterestScreen from "../screens/SetupProfile/SignupInterest";
import PersonalityScreen from "../screens/SetupProfile/SignupPersonality";

import AgeScreen from "../screens/SetupProfile/SignupAge";

import ProfileDetailScreen from "../screens/SetupProfile/SignupProfileDetails";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignupProfileDetails"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SignupProfileDetails"
        component={ProfileDetailScreen}
      />
      <Stack.Screen name="SignupGender" component={GenderScreen} />
      <Stack.Screen name="SignupGenderPreference" component={GenderPreScreen} />
      <Stack.Screen name="SignupAge" component={AgeScreen} />
      <Stack.Screen name="SignupLocation" component={LocationScreen} />
      <Stack.Screen name="SignupInterest" component={InterestScreen} />
      <Stack.Screen name="SignupPersonality" component={PersonalityScreen} />
    </Stack.Navigator>
  );
}
