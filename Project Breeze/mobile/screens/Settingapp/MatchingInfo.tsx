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
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import AuthContext from "../../context/AuthContext";
import useAPI from "../../hooks/useAPI";
import { useIsFocused } from "@react-navigation/native";
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
      <View style={{ width: moderateScale(200) }}>
        <AppText style={{ color: textColor, fontWeight: "bold" }}>
          {item.title}
        </AppText>
        <Text style={{ color: textColor, fontSize: moderateScale(14) }}>{item.subtitle}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={moderateScale(30)} color="#8A7DFF" />
    </View>
  </TouchableOpacity>
);

export default function MatchingScreen({ navigation, route }) {
  const capitalizeFirst = (str) => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { sub: userId } = React.useContext(AuthContext)["user"];
  const API = useAPI(userId);
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
 
  const interest = String(API.matchDetails["interests"]); 
  const [agePref, setAgePref] = React.useState({ from: 1, to: 2 });

  const focus = useIsFocused();
  React.useEffect(() => {
    API.requestMatchDetails().then(val => {setAgePref(val.data["age_preference"])});
    API.requestUser();
  }, [focus]);

  const DATA = [
    {
      title: "Age Pref.",
      navigate: "AgePref",
      subtitle: agePref["from"] + " - " + agePref.to,
    },
    {
      title: "Gender Pref.",
      navigate: "GenderPref",
      subtitle: capitalizeFirst(API.matchDetails["preference"]),
    },
    { title: "Interests", navigate: "Interest", subtitle: interest },
  ];

  return (
    <>
    <HeaderSetting title="Matching Info" navigation={navigation}/>
    <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
      <FlatList
        data={DATA}
        extraData={[API.user, API.matchDetails]}
        renderItem={({ item }: any) => (
          <Item
            item={item}
            onPress={() => {
              navigation.navigate(item.navigate, {
                preference: API.matchDetails["preference"],
                interests: API.matchDetails["interests"],
                age_preference: API.matchDetails['age_preference']
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
    height: moderateScale(65),
  },
});
