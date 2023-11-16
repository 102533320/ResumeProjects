import {
  StyleSheet,
  Alert,
  View,
  TextInput,
} from "react-native";
import * as React from "react";
import * as Yup from "yup";
import API from "../../api/user";
import AppButton from "../../components/AppButton";
import { AppForm, FormPicker, SubmitButton } from "../../components/form";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import AuthContext from "../../context/AuthContext";
import ActivityIndicator from "../../components/ActivityIndicator";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  gender: Yup.string().required().label("Gender"),
});


const DATA = [
  {
    id: 77,
    title: "Male",
    active:false,
  },
  {
    id: 88,
    title: "Female",
    active:false,
  },
  {
    id: 99,
    title: "Other",
    active:false,
  },
];

export default function GenderPrefScreen({ navigation, route }) {
  const { sub: userId } = React.useContext(AuthContext)["user"];
  const [loading, setLoading] = React.useState(false);

  const gender = route.params["preference"];
  const index = DATA.findIndex(
    (val) => val.title.toUpperCase() === gender.toUpperCase()
  );

  const success = () =>
  Alert.alert("Success", "Your changed have been saved.", [
  { text: "Confirm", onPress: () =>console.log("OK Pressed")  },
  ]);

  const updateUserData = async (value) => {
    setLoading(true);
    const user = await API.updateMatchDetails(userId, {
      preference: value,
    }).then(()=> success()).finally(() => {
      setLoading(false);
      
    });
  };

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
 
  return (
    <>
    <HeaderSetting title="Gender Pref." navigation={navigation}/>
    <ActivityIndicator visible={loading}/>
    <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
        <AppForm
          initialValues={{ gender: gender }}
          onSubmit={(values) => {
            console.log(values);
            updateUserData(values.gender);
          }}
          //onSubmit={() => console.log(route.params)}
          validationSchema={validationSchema}
        >
        <View style={styles.option}>
          <FormPicker
            name="gender"
            data={DATA}
            initialState={DATA[index]}
            keyExtractor={(item: any) => item.id}
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
  option: {
    width: "80%",
    left: moderateScale(40),
    marginBottom: moderateScale(30),
  },
  save: {
    flex: 1,
    justifyContent: "flex-end",
    width: "80%",
    left: moderateScale(40),
    marginBottom: moderateScale(20),
  },
});
