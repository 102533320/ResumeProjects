import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { RootTabScreenProps } from "../types";
import MessageTemplate from "../components/MessageTemplate";
import Header from "../components/Header";
import { Searchbar } from "react-native-paper";
import { moderateScale } from "../constants/Layout";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const size = useWindowDimensions()
  const messages = [
    {
      id: 1,
      title: "Johnathan",
      message: "You: Sure sounds fun!",
      timeSent: new Date("2022-09-05T10:30:28.000+00:00"),
      imagePath: require("../assets/images/Johnathan.jpg"),
      status: true,
    },
    {
      id: 2,
      title: "Terry",
      message: "You know Terry loves yogurt",
      timeSent: new Date("2022-09-05T10:29:30.000+00:00"),
      imagePath: require("../assets/images/Terry.jpg"),
      status: true,
    },
    {
      id: 3,
      title: "Andy",
      message: "Hey, what's been up",
      timeSent: new Date("2022-09-05T09:30:30.000+00:00"),
      imagePath: require("../assets/images/Andy.jpg"),
      status: true,
    },
    {
      id: 4,
      title: "Karamo",
      message: "Hi Tan, I was wondering if you could help me with something",
      timeSent: new Date("2022-09-05T10:28:30.000+00:00"),
      imagePath: require("../assets/images/Karamo.jpg"),
      status: false,
    },
    {
      id: 5,
      title: "Abel",
      message: "L.A. will ruin you bro, trust me!",
      timeSent: new Date("2022-09-05T10:30:17.000+00:00"),
      imagePath: require("../assets/images/Abel.jpg"),
      status: true,
    },
    {
      id: 6,
      title: "Keanu",
      message: "You: Sure sounds fun!",
      timeSent: new Date("2022-09-04T10:29:30.000+00:00"),
      imagePath: require("../assets/images/Keanu.jpg"),
      status: true,
    },
    {
      id: 7,
      title: "Johnny",
      message: "Of course I will give you my life savings",
      timeSent: new Date("2022-08-05T10:30:30.000+00:00"),
      imagePath: require("../assets/images/Johnny.jpg"),
      status: true,
    },
    {
      id: 8,
      title: "Danny",
      message: "So I started blasting!",
      timeSent: new Date("2022-09-05T10:21:30.000+00:00"),
      imagePath: require("../assets/images/Danny.jpg"),
      status: false,
    },
    {
      id: 9,
      title: "Kyle",
      message: "I really miss the old times, you know what I mean?",
      timeSent: new Date("2022-09-05T07:12:30.000+00:00"),
      imagePath: require("../assets/images/Kyle.jpg"),
      status: false,
    },
    {
      id: 10,
      title: "Mark",
      message: "You: Sure sounds fun!",
      timeSent: new Date("2022-09-05T10:12:12.000+00:00"),
      imagePath: require("../assets/images/Mark.png"),
      status: true,
    },
  ];

  const [messagesList, setMessagesList] = useState(messages.sort((b, a) => a.timeSent.getTime() - b.timeSent.getTime()));
  const [filteredList, setFilteredList] = useState(messages);
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => {
    if (query) {
      const newData = filteredList.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = query.toUpperCase();
        return (
          itemData.indexOf(textData) > -1 && itemData.indexOf(textData) == 0
        );
      });
      setMessagesList(newData);
      setSearchQuery(query);
    } else {
      setMessagesList(filteredList);
      setSearchQuery(query);
    }
  };

  var result = "";
  var currentTime = new Date("2022-09-05T10:30:30.000+00:00");
  const [element, setElement] = useState(false);

  var messageDisplay = function checkString(newMessage: String): String {
    if (newMessage.length > 20) {
      newMessage = newMessage.substring(0, 28) + "...";
    }
    return newMessage;
  };

  var timeDisplay = function checkTime(newTime: Date): String {
    var x = (currentTime.getTime() - newTime.getTime()) / 1000;
    if (x < 60) {
      result = x + " sec";
    } else if (x >= 60 && x < 3600) {
      result = Math.round(x / 60) + " min";
    } else if (x >= 3600 && x < 86400) {
      result = Math.round(x / 3600) + " hour";
    } else {
      result = new Date(currentTime.getTime() - x * 1000).toLocaleDateString();
    }
    return result;
  };

  function checkStatus(status: Boolean): String[] {
    if (status == true) {
      return ["#FF7DF1", "#8A7DFF", "#7DC1FF"];
    } else {
      return ["#999999", "#999999", "#999999"];
    }
  }

  function sortDictRecent() {
    setMessagesList(
      messagesList.sort((b, a) => a.timeSent.getTime() - b.timeSent.getTime())
    );
    setFilteredList(
      messages.sort((b, a) => a.timeSent.getTime() - b.timeSent.getTime())
    );
    setElement(false);
  }

  function sortDictOldest() {
    setMessagesList(
      messagesList.sort((a, b) => a.timeSent.getTime() - b.timeSent.getTime())
    );
    setFilteredList(
      messages.sort((a, b) => a.timeSent.getTime() - b.timeSent.getTime())
    );
    setElement(false);
  }

  useEffect(() => {
    navigation.addListener('state', () => {
      setElement(false)
    })
  }, []);

  return (
    <>
      <Header
        title="Messages"
        icon="dots-vertical"
        functionType={() => setElement(true)}
      />
      <View style={[styles.container, {backgroundColor: colorTheme.background}]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ padding: moderateScale(3), marginTop: moderateScale(16) }}>
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                inputStyle={{fontSize: moderateScale(14)}}
              />
            </View>
          }
          ItemSeparatorComponent={() => {
            return <View style={[styles.separator,{backgroundColor: colorTheme.seperator}]}></View>;
          }}
          data={messagesList}
          keyExtractor={({ id }) => id.toString()}
          extraData={[messagesList, filteredList]}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Messages", { item })}
              >
                <MessageTemplate
                  title={item.title}
                  message={messageDisplay(item.message)}
                  time={timeDisplay(item.timeSent)}
                  image={item.imagePath}
                  statusElement01={checkStatus(item.status)}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {element && (
        <><TouchableOpacity activeOpacity={0} style={{width: moderateScale(size.width), height: moderateScale(size.height), backgroundColor:"#ccc", opacity:0, position:'absolute'}} onPress={() => setElement(false)}/>
        <View style={[styles.kebabMenuContainer, { backgroundColor: colorTheme.card }]}>
            <TouchableOpacity
              style={styles.kebabMenuTextContainer}
              onPress={() => sortDictRecent()}
            >
              <Text style={[styles.text, { color: colorTheme.text }]}>{"Sort By Recent"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.kebabMenuTextContainer}
              onPress={() => sortDictOldest()}
            >
              <Text style={[styles.text, { color: colorTheme.text }]}>{"Sort By Oldest"}</Text>
            </TouchableOpacity>
          </View></>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: moderateScale(1),
    left: moderateScale(66),
    width: "80%",
  },
  kebabMenuContainer: {
    borderRadius: moderateScale(15),
    width: moderateScale(168),
    flexDirection: "column",
    elevation: moderateScale(15),
    right: moderateScale(50),
    top: moderateScale(100),
    position: "absolute",
  },
  kebabMenuTextContainer: {
    height: moderateScale(48),
    paddingTop: moderateScale(16),
    paddingLeft: moderateScale(16),
  },
  searchBar: {
    width: moderateScale(296),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(6),
  },
  text: {
    fontSize: moderateScale(14)
  }
});
