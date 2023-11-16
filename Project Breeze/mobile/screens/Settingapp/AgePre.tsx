import {
  StyleSheet,
  Alert,
  View,
  TextInput,
} from "react-native";
import * as React from "react";
import * as Yup from "yup";
import AppText from "../../components/AppText";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import API from "../../api/user";
import AppButton from "../../components/AppButton";
import AuthContext from "../../context/AuthContext";
import ActivityIndicator from "../../components/ActivityIndicator";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Header } from "react-native/Libraries/NewAppScreen";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

export default function AgePreScreen({ navigation, route }) {
  const [agePref, setAgePref] = React.useState<number[]>([18, 60]);
  const [loading, setLoading] = React.useState(false);

  const { sub: userId } = React.useContext(AuthContext)["user"];

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
 
  const success = () =>
  Alert.alert("Success", "Your changed have been saved.", [
    { text: "Confirm", onPress: () =>console.log("OK Pressed")  },
  ]);

  const updateUserData = async () => {
    setLoading(true);
    const user = await API.updateMatchDetails(userId, {
      age_preference: { from: agePref[0], to: agePref[1] },
    }).then(()=> success()).finally(() => {
      setLoading(false);
    });
  };
  return (
    <>
      <HeaderSetting title="Age Pref." navigation={navigation}/>
      <ActivityIndicator visible={loading} />
      <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
        <View style={{ alignSelf: "center" }}>
         <MultiSlider
            onValuesChangeFinish={(val) => {
              setAgePref(val);
            }}
            enabledTwo
            min={18}
            max={60}
            values={[
              route.params["age_preference"]["from"],
              route.params["age_preference"]["to"],
            ]}
            isMarkersSeparated={true}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={35}
            enableLabel={true}
            markerOffsetY={4}
            trackStyle={{
              height: 10,
              borderRadius: 8,
            }}
            selectedStyle={{
              backgroundColor: "#895CDF",
            }}
            unselectedStyle={{
              backgroundColor: "#EEF3F7",
            }}
            customLabel={(s) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      left: s["oneMarkerLeftPosition"] - 10,
                    }}
                  >
                    <AppText>{s["oneMarkerValue"]}</AppText>
                  </View>
                  <View
                    style={{
                      left: s["twoMarkerLeftPosition"] - 27,
                    }}
                  >
                    <AppText>{s["twoMarkerValue"]}</AppText>
                  </View>
                </View>
              );
            }}
            customMarkerLeft={(e) => {
              return (
                <View>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "white",
                      borderColor: "#895CDF",
                      borderRadius: 16,
                      borderWidth: 1,
                    }}
                  ></View>
                </View>
              );
            }}
            customMarkerRight={(e) => {
              return (
                <View>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "white",
                      borderColor: "#895CDF",
                      borderRadius: 16,
                      borderWidth: 1,
                    }}
                  ></View>
                </View>
              );
            }}
          />
        </View>
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
