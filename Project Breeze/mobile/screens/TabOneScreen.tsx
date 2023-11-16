import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {View,Image,StyleSheet,Pressable, useWindowDimensions, ScrollView,} from "react-native";
import {  scale, verticalScale, moderateScale, screenSize } from "../constants/Layout";

import { RootTabScreenProps } from "../types";
//import context from auth/context folder && Api from api/user
import AuthContext from "../context/AuthContext";
import userAPI from "../api/user";
import { useEffect, useState } from "react";
import CognitoAuth from "../auth/CognitoAuth";
import { useFocusEffect } from "@react-navigation/native";
import ProfileTemplate from "../components/ProfileTemplate";
import useAPI from "../hooks/useAPI";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ActivityIndicator from "../components/ActivityIndicator";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const [userList, setUserList] = useState({})
  const [matchList, setMatchList] = useState({})
  const [loading, setLoading] = useState(true);
  const size = useWindowDimensions()
  const [image01, setImage01] = useState<String | null>()
  const [image02, setImage02] = useState<String | null>()
  const [image03, setImage03] = useState<String | null>()
  const imagePath = require("../assets/images/profile-icon.png")
  const city = (matchList["location"] && matchList["location"]["city"]) || ""
  const suburb = (matchList["location"] && matchList["location"]["suburb"]) || ""
  const interests = (matchList["interests"])

  // get user id
  const { sub: userId } = React.useContext(AuthContext)["user"];
  const API = useAPI(userId)

  //get user and match_details document on database
  const getUserData = async () => {
    const user = await API.requestUser();
    const matchDetails = await API.requestMatchDetails();

    if (user.ok && matchDetails.ok) {
      const userData = user.data as any;
      const matchData = matchDetails.data as any;
      console.log("---User Object---");
      setUserList(userData);
      console.log(userList);
      console.log("---Match Details---");
      setMatchList(matchData);
      console.log(matchList);
      if(userData["photos"][1] == null || userData["photos"][2] == null){
        setLoading(false)
        updateUserData().then(() => {setLoading(true)})
        getUserData().then(() => {setLoading(true)})
      }
    }
  };

  //call the async function once after the screen is loaded
  useEffect(() => {
    getUserData().then(() => {setLoading(true)})
  }, []);

  useFocusEffect(() => {
    setImageData(0)
    setImageData(1)
    setImageData(2)
  });

  const updateUserData = async () => {
    await userAPI.updateUser(userId, {
      photos: ["profile01.png", "profile02.png", "profile03.png"],
    })
    for (var i = 1; i < 3; i++) {
      await CognitoAuth.uploadObject(
        "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg",
        i === 1 ? "profile02.png" : "profile03.png",
        userId
      )
    }
  };

  function setImageData(index) {
    if (Object.keys(userList).length > 0) {
      CognitoAuth.getObject(userId, userList["photos"][index])
      .then((uri) => {
        if (index == 0) {
          setImage01(uri)
        } else if ( index == 1) {
          setImage02(uri)
        } else {
          setImage03(uri)
        }
      })
      .catch((er) => {
        console.log(er);
      })
    }
  }

  return (
    <>
    {loading ? ( 
      <ScrollView style={{backgroundColor: colorTheme.background}}>
        <View style={[styles.container]}>
          <View style={{ flexDirection: "row", marginBottom: moderateScale(30)}}>
            <Pressable
              onPress={() => navigation.navigate("Settings")}
              style={[styles.logoContainer, { left: "20%" }]}
            >
              <FontAwesome name="cog" size={moderateScale(30)} color="#ffffff" />
            </Pressable>
            <Image
              style={styles.imageProfile}
              source={image01 === null? imagePath: {uri: image01}}
            />
            <Pressable
              onPress={() => navigation.navigate("ProfilePicture", {userId, userList})}
              style={[styles.logoContainer, { right: "20%" }]}
            >
              <FontAwesome name="camera" size={moderateScale(25)} color="#ffffff" />
            </Pressable>
          </View>
          <ProfileTemplate userList={userList} matchList={matchList} suburb={suburb} city={city} image01={image01} image02={image02} image03={image03} interests={interests} galleryDecision={undefined} userId={undefined} navigation={undefined}></ProfileTemplate>
        </View>
      </ScrollView>
    ) : <View style={{alignItems: "center",justifyContent:'center', height: size.height, width: size.width}}><ActivityIndicator visible={true}/></View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: moderateScale(25),
  },
  imageProfile: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(35),
    zIndex: -1,
  },
  logoContainer: {
    borderRadius: 100,
    borderWidth: moderateScale(2),
    borderColor: "#FFFFFF",
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: "#8A7DFF",
    alignItems: "center",
    justifyContent: "center",
    top: moderateScale(160),
  },
});
