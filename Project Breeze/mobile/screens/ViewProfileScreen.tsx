import { transform } from '@babel/core';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, useWindowDimensions, ScrollView, useColorScheme, Pressable } from 'react-native';
import CognitoAuth from '../auth/CognitoAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import ProfileTemplate from '../components/ProfileTemplate';
import Colors from '../constants/Colors';
import { moderateScale, screenSize } from '../constants/Layout';
import AuthContext from '../context/AuthContext';
import useAPI from '../hooks/useAPI';

export default function MatchConfirmScreen({navigation}) {

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const size = useWindowDimensions()
  const [userList, setUserList] = useState({})
  const [matchList, setMatchList] = useState({})
  const [loading, setLoading] = useState(true);
  const city = (matchList["location"] && matchList["location"]["city"]) || ""
  const suburb = (matchList["location"] && matchList["location"]["suburb"]) || ""
  const interests = (matchList["interests"])
  const [image01, setImage01] = useState<String | null>()
  const [image02, setImage02] = useState<String | null>()
  const [image03, setImage03] = useState<String | null>()
  const imagePath = require("../assets/images/profile-icon.png")
  

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
    }
  };

  //call the async function once after the screen is loaded
  useEffect(() => {
    setLoading(false)
    getUserData().then(() => {setLoading(true)})
  }, []);

  useFocusEffect(() => {
    setImageData(0)
    setImageData(1)
    setImageData(2)
  });

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
      <View style={[styles.container,{backgroundColor:colorTheme.background}]}>
          <View style={{flex:1}}>
            <Image style={{height:"110%", width:moderateScale(size.width), borderWidth:1}} source={require("../assets/images/Kyle.jpg")}/>
          </View>
          <TouchableOpacity style={[styles.iconContainer01]} onPress={() => navigation.goBack()}>  
            <Ionicons name="md-chevron-back-sharp" size={moderateScale(28)} style={[styles.icon,{color:colorTheme.background}]}/>
          </TouchableOpacity>
          <View style={{borderTopEndRadius:moderateScale(30), borderTopStartRadius:30}}>
            <ProfileTemplate userList={userList} matchList={matchList} suburb={suburb} city={city} image01={image01} image02={image02} image03={image03} interests={interests} galleryDecision={"Expand"} userId={userId} navigation={navigation}></ProfileTemplate>
          </View>
      </View>
      ) : <View style={{alignItems: "center",justifyContent:'center', height: size.height, width: size.width}}><ActivityIndicator visible={true}/></View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  iconContainer01: {
    width: moderateScale(52),
    height: moderateScale(52),
    position:'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: moderateScale(30),
    top: moderateScale(45),
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    borderRadius:moderateScale(15),
    borderWidth: 1,
    borderColor:"#fff"
  },
  icon: {
    position: 'absolute',
  },
});
