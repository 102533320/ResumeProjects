import { View,  Text, StyleSheet } from "react-native";
import * as React from "react";

import { RootStackScreenProps } from "../../types";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";
export default function PrivacypolicyScreen({
  navigation,
}: RootStackScreenProps<"PrivacyPolicy">) {
  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />
      <View>
        <AppText style={styles.title}>PRIVACY POLICY</AppText>
        <AppText style={styles.description}>Last modified: May 6 2022</AppText>
        <Text style={styles.secondhead}>Duis ut diam</Text>
        <AppText style={styles.description}>
          Ut sem nulla pharetra diam. Imperdiet nulla malesuada pellentesque
          elit eget gravida cum sociis natoque. Fermentum et sollicitudin ac
          orci phasellus egestas tellus rutrum tellus.
        </AppText>

        <Text style={styles.secondhead}>Volutpat commodo sed</Text>
        <AppText style={styles.description}>
          Enim nunc faucibus a pellentesque sit amet porttitor. Fusce ut
          placerat orci nulla pellentesque. Ipsum dolor sit amet consectetur
          adipiscing elit duis tristique sollicitudin. Egestas sed sed risus
          pretium quam vulputate dignissim. Eros in cursus turpis massa.
        </AppText>

        <Text style={styles.secondhead}>Vel pharetra vel</Text>
        <AppText style={styles.description}>
          tiam erat velit scelerisque in dictum non consectetur. Velit sed
          ullamcorper morbi tincidunt ornare massa eget egestas. Id leo in vitae
          turpis.
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
