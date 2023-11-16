/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  LoginPhoneNumber: undefined;
  LoginPhonePassword: undefined;
  Logout: undefined;
  Signup: undefined;
  SignupEmail: undefined;
  SignupNumber: undefined;
  SignupPassword: undefined;
  ConfirmSignup: undefined;
  SignupProfileDetails: undefined;
  SignupCalendar: undefined;
  SignupGender: undefined;
  SignupGenderPreference: undefined;
  SignupLocation: undefined;
  SignupInterest: undefined;
  SignupPersonality: undefined;
  SignupAge: undefined;
  ResetPassword: undefined;
  ResetPasswordSubmit: undefined;
  TermOfUse: undefined;
  PrivacyPolicy: undefined;
  Setting: undefined;
  Account:undefined;
  BasicInfo:undefined;
  AccountInfo:undefined;
  MatchingInfo:undefined;
  Name:undefined;
  AgePref:undefined;
  GenderPref:undefined;
  Gender:undefined;
  Date:undefined;
  Interest:undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  Settings: undefined;
  Messages: object;
  MatchConfirm: object;
  ViewProfile: object;
  Camera: undefined;
  ProfilePicture: undefined;
  NotFound: undefined;
  Personality:undefined;
  Preference:undefined;
  Gallery:undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
