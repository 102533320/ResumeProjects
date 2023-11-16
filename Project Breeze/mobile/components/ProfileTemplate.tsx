import React from "react";
import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { scale, verticalScale, moderateScale, screenSize } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";

export default function ImageTemplate({userList, matchList, suburb, city, image01, image02, image03, interests, galleryDecision, userId, navigation}) {

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const currentTime = new Date()
  const { width } = useWindowDimensions()

  function checkAge(birthDate: Date): String {
    var age = currentTime.getFullYear() - birthDate.getFullYear();
    var m = currentTime.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentTime.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  }

  function displayInterests(interests: Array<String>) {
    return interests.map((interest) => (
      <View style={[styles.interestsContainer]}>
        <Text style={[styles.interestsText, {color: colorTheme.tint}]}>{[interest]}</Text>
      </View>
    ));
  }

  function splitArray() {
    if (Object.keys(matchList).length > 0) {
      if (matchList["interests"].length > 3) {
        return (
          <>
            <View style={[styles.images]}>
              {displayInterests(interests.slice(0,3))}
            </View>
            <View style={[styles.images]}>
              {displayInterests(interests.slice(3))}
            </View>
          </>
        );
      } else {
        return (
          <View style={[styles.images]}>
            {displayInterests(matchList["interests"])}
          </View>
        );
      }
    } else {
      return null
    }
  }

  return (
      <View style={[styles.container, {width: width, backgroundColor: colorTheme.background}]}>
        <Text style={[styles.title01, {color: colorTheme.text}]}>{userList["first_name"] + " " + userList["last_name"] + ", " + checkAge(new Date(matchList["birthday"]))}</Text>
        <Text style={[styles.title02, {color: colorTheme.text}]}>{"Location"}</Text>
        <Text style={[styles.subText, {color: colorTheme.subText}]}>{suburb + ", " + city}</Text>
        <Text style={[styles.title02, {color: colorTheme.text}]}>{"Interests"}</Text>
        {splitArray()}
        <View style={{flexDirection:'row', width: scale(282), justifyContent:'space-between'}}>
          <Text style={[styles.title02, {color: colorTheme.text}]}>{"Gallery"}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Gallery", {userId, userList})} >
            <Text style={[styles.title02Alt, {color: colorTheme.tint}]}>{galleryDecision}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.images]}>
          <Image style={styles.imageGallery} source={{uri: image01}}/>
          <Image style={styles.imageGallery} source={{uri: image02}}/>
          <Image style={styles.imageGallery} source={{uri: image03}}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(25),
    paddingLeft: scale(35),
    borderTopEndRadius: moderateScale(30),
    borderTopStartRadius: moderateScale(30)
  },
  title01: {
    fontSize: moderateScale(22),
    fontWeight: "bold",
  },
  title02: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    marginTop: moderateScale(12),
  },
  title02Alt: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    marginTop: moderateScale(14),
  },
  subText: {
    fontSize: moderateScale(12),
  },
  interestsText: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  images: {
    flexDirection: 'row', 
    marginTop: moderateScale(6),
  },
  imageGallery: {
    width: scale(90),
    marginRight: scale(6),
    height: moderateScale(150),
    borderRadius: moderateScale(5),
  },
  interestsContainer: {
    borderWidth: moderateScale(1),
    padding: moderateScale(6),
    marginRight: scale(6),
    width: scale(90),
    alignItems: "center",
    borderRadius: moderateScale(5),
    borderColor: "#8A7DFF",
  },
});
