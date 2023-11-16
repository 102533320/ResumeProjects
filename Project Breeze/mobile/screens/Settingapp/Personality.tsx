import {
  StyleSheet,
  Alert,
  View,
  TextInput,
} from "react-native";
import * as React from "react";
import * as Yup from "yup";
import Header from "../../components/Header";
import DropDown from "../../components/DropDown";
import AuthContext from "../../context/AuthContext";
import API from "../../api/user";
import AppButton from "../../components/AppButton";
import ActivityIndicator from "../../components/ActivityIndicator";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

export default function Personality({ navigation, route }) {
  const { sub: userId } = React.useContext(AuthContext)["user"];
  const [loading, setLoading] = React.useState(false);
  const personality = [
    { key: "11", title: "Introvert" },
    { key: "12", title: "Extrovert" },
  ];

  const iniPersonality = route.params["personality"];
  const index = personality.findIndex(
    (val) => val.title.toUpperCase() === iniPersonality.toUpperCase()
  );
  const [selectedItem, setSelectedItem] = React.useState(personality[index]);

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  const success = () =>
  Alert.alert("Success", "Your changed have been saved.", [
    { text: "Confirm", onPress: () =>console.log("OK Pressed")  },
  ]);

  const updateUserData = async () => {
    setLoading(true);
    const user = await API.updateMatchDetails(userId, {
      personality: selectedItem.title,
    }).then(()=> success()).finally(() => {
      setLoading(false);
    });
  };

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  
  return (
    <>
      <HeaderSetting title="Personality" navigation={navigation}/>
      <ActivityIndicator visible={loading} />
      <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
        <DropDown value={selectedItem} data={personality} onSelect={onSelect} />
        <View style={styles.save}>
          <AppButton
            title="Save"
            onPress={() => {
              updateUserData();
            }}
          />
        </View>
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
});
