import { Image, View, Modal, useColorScheme, StyleSheet } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import AppCamera from "../../components/AppCamera";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  FormBirthdayPicker,
  ErrorMessage,
} from "../../components/form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import AuthContext from "../../context/AuthContext";
import Colors from "../../constants/Colors";
import { moderateScale } from "../../constants/Layout";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First name"),
  lastName: Yup.string().required().label("Last name"),
  birthday: Yup.string().required().label("Birthday"),
});

export default function ProfileDetailScreen({ navigation, route }) {
  const [popVisible, setPopVisible] = useState(false);
  const [image, setImage] = useState<any | null>(null);
  const [visible, setVisible] = useState(false);
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const [error, setError] = useState(false);
  const user = React.useContext(AuthContext)["user"];

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      return alert("You need to allow permission to access library!");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setError(false);
    }
  };

  const useCamera = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    if (!granted) {
      return alert("You need to allow permission to access camera!");
    }
    setVisible(true);
    setImage("");
  };

  return (
    <>
      <AppCamera
        visible={visible}
        setVisible={setVisible}
        image={image}
        setImage={setImage}
        functionType={null}
      />
      <Screen style={styles.container}>
        {/* Title */}
        <AppText style={styles.heading}>Profile details</AppText>
        {/* Profile Picture */}
        <View style={styles.profilePicture}>
          <Image
            source={
              !image
                ? require("../../assets/images/profile-icon.png")
                : {
                    uri: image,
                  }
            }
            style={styles.image}
          />
          <View style={styles.iconprofile}>
            <MaterialCommunityIcons
              onPress={() => setPopVisible(true)}
              name="camera"
              size={25}
              color="#fff"
            />

            <Modal
              animationType="fade"
              transparent={true}
              visible={popVisible}
              statusBarTranslucent
            >
              <View style={styles.modalpop}>
                <View
                  style={[
                    styles.modalImage,
                    { backgroundColor: colorTheme.background },
                  ]}
                >
                  <AppButton title="Choose From Library" onPress={pickImage} />
                  <AppButton title="Open Camera" onPress={useCamera} />

                  <View style={{ marginTop: "10%" }}>
                    <AppButton
                      title="Cancel"
                      onPress={() => {
                        setPopVisible(false);
                      }}
                    />
                  </View>
                </View>
                {/* <View style={styles.modalImage}>
                
              </View> */}
              </View>
            </Modal>
          </View>
        </View>

        <AppForm
          initialValues={{ firstName: "", lastName: "", birthday: undefined }}
          onSubmit={(values: any) => {
            if (image === null) return setError(true);
            navigation.navigate("SignupGender", {
              email: user["email"],
              id: user["sub"],
              image: image,
              ...values,
            });
          }}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={"Profile picture is missing!"} visible={error} />
          {/* First Name */}
          <AppFormField name="firstName" placeholder="First name" />
          {/* Last Name */}
          <AppFormField name="lastName" placeholder="Last name" />
          {/* Calender Button */}
          <FormBirthdayPicker name="birthday" />

          <View style={styles.button}>
            <SubmitButton title="Continue" />
          </View>
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalImage: {
    backgroundColor: "white",
    paddingHorizontal: "10%",
    justifyContent: "flex-end",
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  container: {
    paddingHorizontal: moderateScale(30),
    paddingBottom: moderateScale(30),
    flex: 1,
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(15),
  },
  profilePicture: {
    marginVertical: moderateScale(25),
    width: moderateScale(160),
    height: moderateScale(160),
    justifyContent: "center",
    alignSelf: "center",
  },
  modalpop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  heading: {
    width: "100%",
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: moderateScale(34),
    marginVertical: moderateScale(50),
  },
  iconprofile: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: moderateScale(30),
    height: moderateScale(50),
    width: moderateScale(50),
    borderWidth: moderateScale(4),
    borderColor: "#fff",
    backgroundColor: "#8A7DFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
