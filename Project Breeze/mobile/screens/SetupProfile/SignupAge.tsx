import { View, StyleSheet } from "react-native";
import * as React from "react";
import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";

export default function AgeScreen({ navigation, route }) {
  const [agePref, setAgePref] = React.useState<number[]>([18, 60]);

  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />

      <View style={{ width: "100%" }}>
        <AppText style={styles.heading}>Age preference</AppText>
        <AppText>You can change this later</AppText>
      </View>

      <View style={styles.ageRange}>
        <View
          style={{
            // backgroundColor: "tomato",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText>Age Range</AppText>
          <AppText style={{ fontWeight: "bold", color: "#A9A8A8" }}>
            18-60
          </AppText>
        </View>

        <View style={{ alignSelf: "center" }}>
          <MultiSlider
            onValuesChangeFinish={(val) => {
              setAgePref(val);
            }}
            enabledTwo
            min={18}
            max={60}
            values={[18, 60]}
            isMarkersSeparated={true}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={20}
            enableLabel={true}
            selectedStyle={{
              backgroundColor: "#8A7DFF",
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
                      left: s["twoMarkerLeftPosition"] - 25,
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
                      width: 32,
                      height: 32,
                      backgroundColor: "#8A7DFF",
                      borderRadius: 16,
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
                      width: 32,
                      height: 32,
                      backgroundColor: "#8A7DFF",
                      borderRadius: 16,
                    }}
                  ></View>
                </View>
              );
            }}
          />
          </View>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Continue"
          onPress={() => {
            console.log(agePref);
            navigation.navigate("SignupLocation", {
              ...route.params,
              age_preference: {
                from: agePref[0],
                to: agePref[1],
              },
            });
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ageRange: {
    width: "100%",
    marginTop: "40%",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    padding: moderateScale(30),
  },
  heading: {
    width: "100%",
    marginTop: "10%",
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: moderateScale(34),
  },
});
