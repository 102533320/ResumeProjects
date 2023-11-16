import {
  StyleSheet,
  FlatList,
  Text,
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
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

const DATA = [
  {
    title: "Linked Account",
    navigate: "LinkedAccount",
    subtitle: "tanFrance@gmail.com",
  },
  { title: "Password", navigate: "Password", subtitle: "************" },
];

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

export default function AccountInfoScreen({ navigation }) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  return (
    <>
    <HeaderSetting title="Account Info" navigation={navigation}/>
    <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
      <FlatList
        data={DATA}
        renderItem={({ item }: any) => (
          <Item
            item={item}
            onPress={() => console.log(item.navigate)}
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
