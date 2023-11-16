import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import * as Yup from "yup";
import AppText from "../../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import AuthContext from "../../context/AuthContext";
import API from "../../api/user";
import Colors from "../../constants/Colors";
import useAPI from "../../hooks/useAPI";
import useColorScheme from "../../hooks/useColorScheme";
import HeaderSetting from "../../components/HeaderSetting";
import { nav } from "aws-amplify";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

const Item = ({ item, onPress,backgroundColor,  textColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.option, { backgroundColor: backgroundColor }]}>
      <AppText style={{ color: textColor, fontWeight: "bold" }}>
        {item.title}
      </AppText>
      <MaterialCommunityIcons name="chevron-right" size={moderateScale(25)} color="#8A7DFF" />
    </View>
  </TouchableOpacity>
);

export default function AccountScreen({ navigation }) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  const { sub: userId } = React.useContext(AuthContext)["user"];


  const { user, matchDetails } = useAPI(userId);

  const DATA = [
    {
      title: "Basic Info",
      navigate: "BasicInfo",
      info: { userList: user, matchList: matchDetails },
    },
    { title: "Account Info", navigate: "AccountInfo", info: user },
    { title: "Matching Info", navigate: "MatchingInfo", info: matchDetails },
  ];

  return (
    <>
    <HeaderSetting title={"Account"} navigation={navigation}/>
    <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
      <FlatList
        data={DATA}
        renderItem={({ item }: any) => (
          <Item
            item={item}
            onPress={() => {
              navigation.navigate(item.navigate, item.info);
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
