import {
  View,
  FlatList,
  StyleSheet
} from "react-native";
import Card from "../components/MatchCard";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types";
import Header from "../components/Header";
import { moderateScale } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import axios from 'axios';

import AuthContext from "../context/AuthContext";
import { Button } from "react-native-paper";
import AppButton from "../components/AppButton";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

 // const { sub: userId } = React.useContext(AuthContext)["user"];
  const userId = "ef277a36-5bb4-474a-9bf0-4e7de0120456";
  const [match, setMatches] = useState([]);

  const [matches] = useState([
    {
      title: "Mark",
      age: "30",
      imagePath: require("../assets/images/Mark.png"),
      key: "1",
    },
    {
      title: "Abel",
      age: "32",
      imagePath: require("../assets/images/Abel.jpg"),
      key: "2",
    },
    {
      title: "Andy",
      age: "35",
      imagePath: require("../assets/images/Andy.jpg"),
      key: "3",
    },
    {
      title: "Kyle",
      age: "24",
      imagePath: require("../assets/images/Kyle.jpg"),
      key: "4",
    },
    {
      title: "Terry",
      age: "58",
      imagePath: require("../assets/images/Terry.jpg"),
      key: "5",
    },
    {
      title: "Keanu",
      age: "56",
      imagePath: require("../assets/images/Keanu.jpg"),
      key: "6",
    },
  ]);
  React.useEffect(() => {
    getUserData();
    }, []);
  /**
   * Getting potential matches user data
   */

  const getUserData = async function() {
    try {
      let response = await axios.get(
        'http://localhost:4004' + '/api/matchingUsers?userId=' +
        userId,
      );
      if(response.status === 200) {
        console.log(response.data);
        setMatches(response.data);
      }
      
  }
    catch(error) {
      console.log(error);
    }
  };



  return (
    <>
      <Header title="Matches" icon={undefined} functionType={undefined} />
      <View style={[styles.container, {backgroundColor: colorTheme.background}]}>

      
     
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: moderateScale(10), paddingBottom: moderateScale(10)}}
          numColumns={2}
          data={matches}
          keyExtractor={({ key }) => key}
          renderItem={({ item }) => (
          <Card 
            item={item} 
            navigation={navigation}
          />
          )}
        />
  
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
