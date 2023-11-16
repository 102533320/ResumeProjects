import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import * as React from "react";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BirthdayPickerSetting from "../../components/BirthdayPickerSetting";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

export default function Birthday({ navigation, route }) {
  const [newbirthday, setBirthday] = React.useState(
    route.params["birthday"]
  );

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  return (
    <>
    <HeaderSetting title="Birthday" navigation={navigation}/>
    <View style={[styles.container ,{backgroundColor:colorTheme.background}]}>
    <Text style={styles.text}>D.O.B</Text>
      <BirthdayPickerSetting birthday={newbirthday} setBirthday={setBirthday} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateScale(15),
  },
  save: {
    flex: 1,
    justifyContent: "flex-end",
    width: "80%",
    left: moderateScale(40),
    marginBottom: moderateScale(20),
  },
  text: {
    fontSize: moderateScale(13),
    color: "#8A7DFF",
    width: "80%",
    left: moderateScale(40),
  },
});
