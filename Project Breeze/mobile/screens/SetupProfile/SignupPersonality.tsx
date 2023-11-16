import * as React from "react";
import * as Yup from "yup";
import { StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import { AppForm, FormPicker, SubmitButton } from "../../components/form";
import BackButton from "../../components/BackButton";
import API from "../../api/user";
import Cognito from "../../auth/CognitoAuth";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import ActivityIndicator from "../../components/ActivityIndicator";
import { moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  personality: Yup.string().required().label("Personality"),
});

const DATA = [
  {
    id: "7",
    title: "Extrovert",
  },
  {
    id: "8",
    title: "Introvert",
  },
];

const userModel = (object: any) => {
  return {
    match_details: {
      birthday: new Date(object["birthday"]).toISOString(),
      gender: object["gender"],
      preference: object["preference"],
      age_preference: object["age_preference"],
      location: object["location"],
      interests: object["interests"],
      personality: object["personality"],
    },
    user: {
      _id: object["id"],
      photos: object["photos"],
      first_name: object["firstName"],
      last_name: object["lastName"],
      email: object["email"],
    },
  };
};

export default function PersonalityScreen({ navigation, route }) {
  const [loading, setLoading] = React.useState(false);
  const auth = useContext(AuthContext);

  const CompleteSignup = async (model: any) => {
    console.log(userModel(model));
    setLoading(true);
    const result = await API.postUser(userModel(model));
    if (result.ok) {
      try {
        Cognito.uploadObject(model.image, "profile01.png", model["id"]).then(
          () => {
            Cognito.completeSignup().then(() => {
              Cognito.isAuthenticated().then(({ attributes }) => {
                setLoading(false);
                auth["setUser"](attributes);
              });
            });
          }
        );
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      console.log(result);
      setLoading(false);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <BackButton navigation={navigation} />

        <AppText style={styles.heading}>Your personality</AppText>
        <AppForm
          initialValues={{ personality: "" }}
          onSubmit={(value) => {
            const model = {
              ...route.params,
              ...value,
              photos: ["profile01.png"],
            };
            CompleteSignup(model);
          }}
          validationSchema={validationSchema}
        >
          <FormPicker
            name="personality"
            data={DATA}
            keyExtractor={(item: any) => item.id}
          />

          <SubmitButton title="Continue" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(30),
  },
  heading: {
    marginTop: "10%",
    fontWeight: "bold",
    fontSize: moderateScale(34),
  },
});
