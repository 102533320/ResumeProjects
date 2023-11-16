import {
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import * as Yup from "yup";
import { useRoute } from "@react-navigation/native";
import { RootStackScreenProps } from "../../types";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import PickerItem from "../../components/form/PickerItem";
import { AppForm, FormPicker, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import Cognito from "../../auth/CognitoAuth";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import AuthContext from "../../context/AuthContext";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

const confirm = () =>

  Alert.alert("Log out", "Are you sure you to log out?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "Confirm", onPress: () => Cognito.signOut() },
  ]);

const DATA = [
  { title: "Account", navigate: "Account" },
  { title: "Notification", navigate: "Notification" },
  { title: "Privacy", navigate: "Privacy" },
  { title: "Preferences", navigate: "Preference" },
  { title: "Log Out", navigate: "Log Out" },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.option, { backgroundColor: backgroundColor }]}>
      <AppText style={{ color: textColor, fontWeight: "bold" }}>
        {item.title}
      </AppText>
      <MaterialCommunityIcons name="chevron-right" size={moderateScale(25)} color="#8A7DFF" />
    </View>
  </TouchableOpacity>
);

export default function SettingScreen({ navigation }) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  const auth = React.useContext(AuthContext);



  Cognito.onSignOut(() => {
    auth["setUser"](null);
  });
  return (
    <>
    <HeaderSetting title="Settings" navigation={navigation}/>
    <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
      <FlatList
        data={DATA}
        renderItem={({ item }: any) => (
          <Item
            item={item}
            onPress={() => {
              item.title == "Log Out"
                ? confirm()
                : navigation.navigate(item.navigate);
            }}
            backgroundColor={"transparent"}
            textColor={colorTheme.text}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "space-between",
    marginVertical: moderateScale(5),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    height: moderateScale(58),
    borderWidth: moderateScale(1),
    borderColor: "#E8E6EA",
    borderRadius: moderateScale(15),
  },
  container: {
    flex: 1,
    paddingVertical: moderateScale(15),
  },
  option: {  
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(30),
    height: moderateScale(50),
  },
});
