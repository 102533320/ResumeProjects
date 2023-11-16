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
import AuthContext from "../../context/AuthContext";
import API from "../../api/user";
import Colors from "../../constants/Colors";
import useAPI from "../../hooks/useAPI";
import { useIsFocused } from "@react-navigation/native";
import useColorScheme from "../../hooks/useColorScheme";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

const ItemDivider = () => {
  return (
    <View
      style={{
        height: moderateScale(1.1),
        width: "87%",
        left: moderateScale(20),
        backgroundColor: "#E5E5E5",
      }}
    />
  );
};

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.option, { backgroundColor: backgroundColor }]}>
      <View>
        <AppText style={{ color: textColor, fontWeight: "bold" }}>
          {item.title}
        </AppText>
        <Text style={{ fontSize: moderateScale(14), color: textColor }}>{item.subtitle}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={moderateScale(30)} color="#8A7DFF" />
    </View>
  </TouchableOpacity>
);

export default function BasicScreen({ navigation }) {
  const { sub: userId } = React.useContext(AuthContext)["user"];
  const API = useAPI(userId);

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
 
  const day = new Date(API.matchDetails["birthday"]);
  const year = day.getFullYear();
  const month =
    day.getMonth() + 1 < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1;
  const dt = day.getDate() < 10 ? "0" + day.getDate() : day.getDate();

  const capitalizeFirst = (str) => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
  };
  const focus = useIsFocused();
  React.useEffect(() => {
    API.requestMatchDetails();
    API.requestUser();
  }, [focus]);

  const DATA = [
    {
      title: "Name",
      navigate: "Name",
      subtitle: API.user["first_name"] + " " + API.user["last_name"],
    },
    {
      title: "Birthday",
      navigate: "Date",
      subtitle: dt + " " + month + " " + year,
    },
    {
      title: "Gender",
      navigate: "Gender",
      subtitle: capitalizeFirst(API.matchDetails["gender"]),
    },
    {
      title: "Personality",
      navigate: "Personality",
      subtitle: capitalizeFirst(API.matchDetails["personality"]),
    },
  ];

  return (
    <>
    <HeaderSetting title="Basic Info" navigation={navigation}/>
    <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
      <FlatList
        data={DATA}
        extraData={[API.user, API.matchDetails]}
        renderItem={({ item }: any) => (
          <Item
            item={item}
            onPress={() => {
              navigation.navigate(item.navigate, {
                first_name: API.user["first_name"],
                last_name: API.user["last_name"],
                birthday: API.matchDetails["birthday"],
                gender: API.matchDetails["gender"],
                personality: API.matchDetails['personality']
              });
            }}
            backgroundColor={"transparent"}
            textColor={colorTheme.text}
          />
        )}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={ItemDivider}
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
  heading: {
    marginTop: "10%",
    color: "black",
    fontWeight: "bold",
    fontSize: moderateScale(34),
  },
  option: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(30),
    height: moderateScale(60),
  },
});
