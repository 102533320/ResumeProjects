import { View, Text, StyleSheet } from "react-native";
import * as React from "react";

import { RootStackScreenProps } from "../../types";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";

export default function TermofUseScreen({
  navigation,
}: RootStackScreenProps<"TermOfUse">) {
  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />
      <View>
        <AppText style={styles.title}>TERMS OF USE</AppText>
        <AppText style={styles.description}>Last modified: May 6 2022</AppText>
        <Text style={styles.secondhead}>Lorem ipsum dolor</Text>
        <AppText style={styles.description}>
          Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Neque laoreet suspendisse
          interdum consectetur libero. Ultrices neque ornare aenean euismod
          elementum nisi quis eleifend quam. Quis vel eros donec ac. Varius vel
          pharetra vel turpis nunc eget lorem dolor sed.
        </AppText>
        <Text style={styles.secondhead}>Tempus urna et pharetra</Text>
        <AppText style={styles.description}>
          Tincidunt dui ut ornare lectus. \ Mauris pellentesque pulvinar
          pellentesque habitant morbi tristique senectus. Luctus venenatis
          lectus magna fringilla urna porttitor. Magna etiam tempor orci eu
          lobortis elementum nibh. Commodo nulla facilisi nullam vehicula ipsum
          a arcu. Id aliquet lectus proin nibh nisl. Sed nisi lacus sed viverra
          tellus in. Purus in massa tempor nec feugiat. Quis blandit turpis
          cursus in hac habitasse platea dictumst quisque. Et ligula ullamcorper
          malesuada proin libero nunc consequat. Mauris cursus mattis molestie a
          iaculis at erat. Neque ornare aenean euismod elementum. Vel quam
          elementum pulvinar etiam non.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(30),
  },
  title: {
    width: "100%",
    marginTop: "10%",
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: moderateScale(34),
  },
  description: {
    fontSize: moderateScale(14),
  },
  secondhead: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(20),
    fontWeight: "bold",
    color: "#8A7DFF",
  },
});
