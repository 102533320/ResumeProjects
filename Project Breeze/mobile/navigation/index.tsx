import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TabThreeScreen from "../screens/TabThreeScreen";
import {RootStackParamList} from "../types";
import ProfilePictureScreen from "../screens/ProfilePictureScreen";
import MatchConfirmScreen from "../screens/MatchConfirmScreen";

import MessagesScreen from "../screens/MessagesScreen";
import ViewProfileScreen from "../screens/ViewProfileScreen";
import CameraScreen from "../screens/CameraScreen";
import HomeNavigator from "./HomeNavigator"
import { moderateScale } from "../constants/Layout";
import GalleryScreen from "../screens/GalleryScreen";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "#fff"} }}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ headerBackVisible: false }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen
          name="Settings"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchConfirm"
          component={MatchConfirmScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePicture"
          component={ProfilePictureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewProfile"
          component={ViewProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
      <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
          tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
          tabBarStyle : {
            height: moderateScale(53),
            width: useWindowDimensions().width,
            backgroundColor: Colors[colorScheme].card
          }
        }}
      >
        <BottomTab.Screen
          name="TabOne"
          component={TabOneScreen}
          options={({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarLabelStyle : {
            },
            tabBarIcon: ({ color }) => (<TabBarIcon name="account-circle" color={color} />),
          })}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoScreen}
          options={({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          })}
        />
        <BottomTab.Screen
          name="TabThree"
          component={TabThreeScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="message-text" color={color} />,
          }}
        />
      </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <><View style={{width: useWindowDimensions().width / 3, backgroundColor: props.color, height: moderateScale(3), bottom: moderateScale(52), position: 'absolute'}}></View><MaterialCommunityIcons size={moderateScale(30)} style={{marginLeft: -30, left: 15}} {...props} /></>
  );
}
