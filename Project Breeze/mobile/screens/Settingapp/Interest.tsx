import {
  StyleSheet,
  Alert,
  View,
  TextInput,
} from "react-native";
import * as React from "react";
import {  useEffect } from "react";
import * as Yup from "yup";
import {
  AppForm,
  FormPicker,
  SubmitButton,
  InterestsPicker,
} from "../../components/form";
import InterestSetting from "../../components/form/InterestSetting";
import API from "../../api/user";
import AuthContext from "../../context/AuthContext";
import ActivityIndicator from "../../components/ActivityIndicator";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import HeaderSetting from "../../components/HeaderSetting";
import { moderateScale } from "../../constants/Layout";
import { getInterests } from "../../api/interests";
import Cognito from "../../auth/CognitoAuth";

const validationSchema = Yup.object().shape({
  interests: Yup.array().min(3).max(6).required().label("Interest"),
});

export default function Interest({ navigation, route }) {

  const oldInterest = route.params["interests"];
  const [loading, setLoading] = React.useState(false);
  const [newInterest,setInterests] = React.useState([]);
  const { sub: userId } = React.useContext(AuthContext)["user"];

  const success = () =>
  Alert.alert("Success", "Your changed have been saved.", [
    { text: "Confirm", onPress: () =>console.log("OK Pressed")  },
  ]);

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

  for (var i = 0; i < newInterest.length; i++) {
    for (var j = 0; j < oldInterest.length; j++) {
      if (newInterest[i]["title"] === oldInterest[j]) {
        newInterest[i]["active"] = true;
      }
    }
  }

  const updateUserData = async (values) => {
    const user = await API.updateMatchDetails(userId, {
      interests: values.interests,
    }).then(()=> success()).finally(() => {
    });
  };

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark
 
  return (
    <>
      <HeaderSetting title="Interests" navigation={navigation}/>
      <ActivityIndicator visible={loading} />
      <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
        <AppForm
          initialValues={{ interests: oldInterest}}
          onSubmit={(value) => {
            updateUserData(value);
          }}
          validationSchema={validationSchema}
        >
          <View style={styles.pickerContainer}>
            <InterestSetting
              name="interests"
              data={newInterest}
              keyExtractor={(item) => item.title}
              numColumns="2"
              columnWrapperStyle={{ justifycontent: "space-between" }}
            />
          </View>
          <View style={styles.save}>
            <SubmitButton title="Save" />
          </View>
        </AppForm>
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
    justifyContent: "flex-end",
    width: "80%",
    left: moderateScale(40),
    marginBottom: moderateScale(20),
    marginVertical: "10%",
  },
  pickerContainer: {
    flex: 1,
    left: moderateScale(30),
    width: "83%",
  },
});
