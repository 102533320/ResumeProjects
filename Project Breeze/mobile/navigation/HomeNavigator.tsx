/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, Button, Image, Platform } from 'react-native';
import { RootStackParamList } from "../types";

import LogoutScreen from "../screens/Logout";

import SettingScreen from "../screens/Settingapp/Setting";
import AccountScreen from "../screens/Settingapp/Account";
import BasicScreen from "../screens/Settingapp/BasicInfo";
import AccountInfoScreen from "../screens/Settingapp/AccountInfo";
import MatchingScreen from "../screens/Settingapp/MatchingInfo";
import NameScreen from "../screens/Settingapp/Name";
import AgePreScreen from "../screens/Settingapp/AgePre";
import GenderPrefScreen from "../screens/Settingapp/GenderPre";
import Gender from "../screens/Settingapp/Gender";
import Birthday from "../screens/Settingapp/Date";
import InterestScreen from "../screens/SetupProfile/SignupInterest";
import Interest from "../screens/Settingapp/Interest";
import Personality from "../screens/Settingapp/Personality";
import Preference from "../screens/Settingapp/Peference";
import BackButton from "../components/BackButton";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";


/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


export default function SettingsNavigator() {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  return (
    <Stack.Navigator initialRouteName="Setting">
      <Stack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BasicInfo"
        component={BasicScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MatchingInfo"
        component={MatchingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Name"
        component={NameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AgePref"
        component={AgePreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GenderPref"
        component={GenderPrefScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Date"
        component={Birthday}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Interest"
        component={Interest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Personality"
        component={Personality}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Preference"
        component={Preference}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}