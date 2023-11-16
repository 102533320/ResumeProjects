import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, SubmitButton, InterestsPicker } from "../../components/form";
import BackButton from "../../components/BackButton";
import { moderateScale } from "../../constants/Layout";
import { getInterests } from "../../api/interests";
const validationSchema = Yup.object().shape({
  interests: Yup.array().min(3).max(6).required().label("Interest"),
});

export default function InterestScreen({ navigation, route }) {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getInterests();

      if (result.ok) {
        const data = (result.data as []).map((v: object) => ({
          ...v,
          active: false,
        }));
        setInterests(data as []);
      }
    };
    getData();
  }, []);

  return (
    <Screen style={styles.container}>
      <BackButton navigation={navigation} />

      <AppText style={styles.heading}>Your interests</AppText>
      <AppText style={styles.description}>
        Select your interests, you may change this later.
      </AppText>

      <AppForm
        initialValues={{ interests: [] }}
        onSubmit={(value) => {
          navigation.navigate("SignupPersonality", {
            ...route.params,
            ...value,
          });
        }}
        validationSchema={validationSchema}
      >
        <View style={styles.pickerContainer}>
          <InterestsPicker
            name="interests"
            data={interests}
            extraData={interests}
            extra
            keyExtractor={(item) => item.title}
            numColumns={999}
            columnWrapperStyle={{ flexWrap: "wrap" }}
          />
        </View>

        <SubmitButton title="Continue" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(30),
  },
  description: {
    fontSize: moderateScale(14),
  },
  heading: {
    marginTop: "16%",
    fontSize: moderateScale(34),
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 1,
    marginVertical: "10%",
  },
});
