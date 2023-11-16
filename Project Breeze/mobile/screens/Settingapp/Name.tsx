import {
  StyleSheet,
  FlatList,
  Text,
  Alert,
  View,
  TextInput,
} from "react-native";
import {
  ErrorMessage,
} from "../../components/form";
import * as React from "react";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";
import API from "../../api/user";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import HeaderSetting from "../../components/HeaderSetting";
import {   moderateScale } from "../../constants/Layout";

const validationSchema = Yup.object().shape({
  selectedId: Yup.object().required().label("Gender"),
});

export default function NameScreen({ navigation, route }) {
  console.log(route.params);
  const [fname, onChangefname] = React.useState(route.params["first_name"]);
  const [lname, onChangelname] = React.useState(route.params["last_name"]);
  const { sub: userId } = React.useContext(AuthContext)["user"];
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const success = () =>
  Alert.alert("Success", "Your changed have been saved.", [
    { text: "Confirm", onPress: () =>console.log("OK Pressed")  },
  ]);

  const updateUserData = async () => {
    setLoading(true);
    const user = await API.updateUser(userId, {
      first_name: fname,
      last_name: lname,
    }).then(()=> success()).finally(() => {
      setLoading(false);
    });
  };
  const [fcolor, onChangefColor] = React.useState("white");
  const [lcolor, onChangelColor] = React.useState("white");
  const [fwidth, onChangefwidth] = React.useState(2);
  const [lwidth, onChangelwidth] = React.useState(2);
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  
  return (
    <>
      <HeaderSetting title="Name" navigation={navigation}/>
      <ActivityIndicator visible={loading} />
      <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
        <View style={styles.inputfield}>

       <Text style={styles.text}>First Name</Text>
          <TextInput
            onBlur={() => {
              onChangefColor("white");
              onChangefwidth(2);
            }}
            onFocus={() => {
              onChangefColor("#e5e2ff");
              onChangefwidth(0);
            }}
            style={[
              { backgroundColor: fcolor, borderWidth: fwidth },
              styles.input,
            ]}
            onChangeText={onChangefname}
            value={fname}
          />
        </View>
        <View style={styles.inputfield}>
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            onBlur={() => {
              onChangelColor("white");
              onChangelwidth(2);
            }}
            onFocus={() => {
              onChangelColor("#e5e2ff");
              onChangelwidth(0);
            }}
            style={[
              { backgroundColor: lcolor, borderWidth: lwidth },
              styles.input,
            ]}
            onChangeText={onChangelname}
            value={lname}
            //updateMatchDetails(id,{first_name: fname, last_name: lname})
          />
        </View>
        <View style={styles.errorText}>
        <ErrorMessage error={"You must complete all the fields!"} visible={visible} />
        </View>
        <View style={styles.save}>
          <AppButton
            title="Save"
            onPress={() => {
              if(fname !="" && lname !="")
              {
                updateUserData();
                console.log("success");
              }
              else
              {
                setVisible(true);
              }
            }}
          />
          </View>
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
  input: {
    height: moderateScale(40),
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    borderColor: "#E8E6EA",
    fontWeight: "bold",
  },
  inputfield: {
    width: "80%",
    left: moderateScale(40),
    marginBottom: moderateScale(20),
  },
  text: {
    fontSize: moderateScale(13),
    color: "#8A7DFF",
  },
  save: {
    flex: 1,
    justifyContent: "flex-end",
    width: "80%",
    left: moderateScale(40),
    marginBottom: moderateScale(20),
  },
  errorText: {
    width: "80%",
    left: moderateScale(40),
  },
});
