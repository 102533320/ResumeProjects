import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button, useWindowDimensions} from "react-native";
import HeaderMessages from "../components/HeaderMessages";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Actions, Bubble, Composer, GiftedChat, InputToolbar, Send, Time } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import CheckList from "../components/CheckListTemplate";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { moderateScale, scale, verticalScale } from "../constants/Layout";
import axios from 'axios';
import API from "../api/user";
import AuthContext from "../context/AuthContext";

export default function MatchConfirmScreen({ navigation, route }) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const [messages, setMessages] = useState([]);
  const [kebabaMenu, setKebabMenu] = useState(false);
  const [report, setReport] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [endConversation, setEndConversation] = useState(false);
  const [option01, setOption01] = useState(true)
  const [option02, setOption02] = useState(true)
  const [option03, setOption03] = useState(true)
  const [option04, setOption04] = useState(true)
  const [option05, setOption05] = useState(true)
  /**
  * State variables for chat feature/functionality
  */
  const [userId, setUserId] = useState('1');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [receiverId, setReceiverId] = useState('2');
  /** 
   * This is the messages array which contains the list of prompt messages
  */
 const messagesArray = [
  "Given the choice of anyone in the world, whom would you want as a dinner guest?",
  "Would you like to be famous? In what way?",
  "Before making a telephone call, do you ever rehearse what you are going to say? Why?",
  "What would constitute a “perfect” day for you?",
  "When did you last sing to yourself? To someone else?",
  "If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
  "Do you have a secret hunch about how you will die?",
  "For what in your life do you feel most grateful?",
  "If you could change anything about the way you were raised, what would it be?",
  "If you could wake up tomorrow having gained any one quality or ability, what would it be?",
  "If a crystal ball could tell you the truth about yourself, your life, the future or anything else, what would you want to know?",
  "Is there something that you’ve dreamed of doing for a long time? Why haven’t you done it?",
  "What is the greatest accomplishment of your life?",
  "What do you value most in a friendship?",
  "What is your most treasured memory?",
  "What is your most terrible memory?",
  "If you knew that in one year you would die suddenly, would you change anything about the way you are now living? Why?",
  "What does friendship mean to you?",
  "What roles do love and affection play in your life?",
  "How close and warm is your family? Do you feel your childhood was happier than most other people’s?",
  "How do you feel about your relationship with your mother?",
  "Share with your partner an embarrassing moment in your life.",
  "When did you last cry in front of another person? By yourself?",
  "Tell your partner something that you like about them already.",
  "What, if anything, is too serious to be joked about?",
  "If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven’t you told them yet?",
  "Your house, containing everything you own, catches fire. After saving your loved ones and pets, you have time to safely make a final dash to save any one item. What would it be? Why?",
  "Of all the people in your family, whose death would you find most disturbing? Why?"
];

/**
 * Function that returns a random message from the messages array
 */
const randomMessage = (messages) => {
  return [{
    _id: uuid(),
    text: messages[Math.floor(Math.random() * messages.length)],
    createdAt: new Date(),
    user: {
      _id: userId,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  }
]
};

/**
 * Function that returns a unique or random id
 */
const uuid = () => {
  /**
   * Converting into base 36(numbers + letters) and grab the first 9 characters
   * after the decimal
   */
  return '_' + Math.random().toString(36).substring(2,9);
}



var item = route.params.item
/**
 * Use Effect is a hook which tells react to run some code after the first render
 */
React.useEffect(() => {
  getMessages()
  }, []);


  /**
   * onSend function triggers when we click on the send message button
   * saves the messages into the database
   */

  const inputToolbar = (props) => {
    return (
      <View style={{ backgroundColor: colorTheme.background, flex: 1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity onPress={() => sendPromptMessage(randomMessage(messagesArray))} style={{ width: moderateScale(48), height: moderateScale(48),justifyContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons
                name="message-plus"
                size={moderateScale(28)}
                color={colorTheme.tint}
              />
          </TouchableOpacity>
          <View style={{borderWidth: moderateScale(2), width: moderateScale(240), height: moderateScale(48), alignItems:'center', borderColor: colorTheme.seperator, borderRadius: moderateScale(10), marginHorizontal: moderateScale(10)}}>
            <Composer {...props} textInputStyle={{fontSize:moderateScale(16), color: colorTheme.text}} multiline={true}/>
          </View>
          <TouchableOpacity>
            <Send {...props} containerStyle={{width: moderateScale(48), height: moderateScale(48), justifyContent:'center', alignItems:'center'}}>
                <MaterialCommunityIcons
                  name="send-circle"
                  size={moderateScale(28)}
                  color={colorTheme.tint}
                />
            </Send>
          </TouchableOpacity>
          <View></View>
    </View>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colorTheme.messageRecieve,
            borderBottomLeftRadius: 0,
          },
          right: {
            backgroundColor: colorTheme.messageSend,
            borderBottomRightRadius: 0,
          },
        }}
        textStyle={{
          left: {
            color: colorTheme.text,
            fontSize:moderateScale(16),
          },
          right: {
            color: colorTheme.text,
            fontSize:moderateScale(16),
          },
        }}
      />
    );
  };
  const onSend = async function(messages) {
    await setMessages((previousMessages) =>
     GiftedChat.append(previousMessages, messages));
     try {
      let formData = {
        sender: userId,
        receiver: receiverId,
        messages: messages,
      };
      let response = await axios.post(
        'http://localhost:4004' + '/chats/',
        formData,
      );
      if (response.status === 200) {
       //console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    };

  /**
   * This function triggers when we click on the prompt message button
   */

  const sendPromptMessage = async function(messages) {
    await setMessages((previousMessages) =>
     GiftedChat.append(previousMessages, messages));
     try {
      let formData = {
        sender: userId,
        receiver: receiverId,
        messages: messages,
      };
      let response = await axios.post(
        'http://localhost:4004' + '/chats/',
        formData,
      );
      if (response.status === 200) {
       //console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
};

    /**
     * Function for retreiving messages  
     */

    const getMessages = async function() {
      try {
        let response = await axios.get(
          'http://localhost:4004' + '/chats/' +
          userId + '/' + receiverId,
        );
        if(response.status === 200) {
          setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, response.data.reverse()));
        }
        
    }
      catch(error) {
        console.log(error);
      }
    };

  var statusString = "";

  function checkStatus(decision: Boolean): String {
    if (decision == true) {
      statusString = "Online";
    } else {
      statusString = "Offline";
    }
    return statusString;
  }

  function checkStatusGradient(status: Boolean): String[] {
    if (status == true) {
      return ["#FF7DF1", "#8A7DFF", "#7DC1FF"];
    } else {
      return ["#999999", "#999999", "#999999"];
    }
  }

  function checkStatusColor(status: Boolean): String {
    if (status == true) {
      return "#8A7DFF";
    } else {
      return "#999999";
    }
  }

  function checkSelection(option) {
    if (option != option01) {
      setOption01(true)
    } else if (option != option02) {
      setOption02(true)
    } else if (option != option03) {
      setOption03(true)
    } else if (option != option04) {
      setOption04(true)
    } else {
      setOption05(true)
    }
    API
  }
  
  function submit() {
    var reportValues : String[] = []
    if (!option01) {
      reportValues.push("Fake Profile")
      setOption01(true)
    } if (!option02) {
      reportValues.push("Inappropiate Messages")
      setOption02(true)
    } if (!option03) {
      reportValues.push("Inappropiate Photos")
      setOption03(true)
    } if (!option04) {
      reportValues.push("Underage User")
      setOption04(true)
    } if (!option05){
      reportValues.push("Offline Behaviour")
      setOption05(true)
    }
    console.log(reportValues)
    API.reportUser("072afc06-2666-4200-9123-fb22bc89a428", reportValues)
  }

  return (
    <>
      <View style={{zIndex: 1}}>
        <HeaderMessages
          title={route.params.item.title}
          statusElement01={checkStatusGradient(route.params.item.status)}
          statusElement02={checkStatusColor(route.params.item.status)}
          icon="dots-vertical"
          status={checkStatus(route.params.item.status)}
          image={route.params.item.imagePath}
          navigation={navigation}
          functionType={() => setKebabMenu(true)}
        />
      </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userId,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderInputToolbar={inputToolbar}
          renderAvatar={() => null}
          placeholder='Write a message...'
          messagesContainerStyle={{backgroundColor: colorTheme.background, marginTop: moderateScale(-63)}}
        />

      {kebabaMenu && (
        <View style={[styles.kebabMenuContainer, {backgroundColor: colorTheme.card}]}>
          <TouchableOpacity style={styles.kebabMenuTextContainer} onPress={() => navigation.navigate('ViewProfile'/*, { item }*/, setKebabMenu(false))}>
            <Text style={{fontSize: moderateScale(14),color:colorTheme.text}}>{"View Profile"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kebabMenuTextContainer} onPress={() => (setReport(true), setPopUp(true), setKebabMenu(false))}>
            <Text style={{fontSize: moderateScale(14),color:colorTheme.text}}>{"Report"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kebabMenuTextContainer} onPress={() => (setEndConversation(true), setPopUp(true), setKebabMenu(false))}>
            <Text style={{fontSize: moderateScale(14),color:colorTheme.text}}>{"End Conversation"}</Text>
          </TouchableOpacity>
        </View>
      )}
      {((endConversation || report) && popUp) && (
        <View style={styles.container01}>
          <View style={styles.container02}/>
          <View style={[styles.container03,{backgroundColor: colorTheme.card}]}>
            <View style={{paddingHorizontal:moderateScale(24), paddingVertical: moderateScale(14), borderBottomWidth: moderateScale(1), borderColor:'#E8E6EA'}}>
              <Text style={styles.titleText}>{ report ? ("Report") : "End Conversation" }</Text>
              <Text style={{fontSize: moderateScale(16), marginTop: moderateScale(10)}}>{ report ? ("We won't let this person know who reported them.") : "Let this person know why you want to end the conversation."}</Text>
            </View>
            <CheckList option={option01} functionType={report ? (() => (option01 ? setOption01(false) : setOption01(true))) : () => [(setOption01(false), checkSelection(option01))]} message={ report ? ("Fake Profile") : "No Longer Interested" } iconName={report ? ("check") : "checkbox-blank-circle"} borderRadius={report ? (0) : 15} backgroundColor={report ? ("#8A7DFF") : "#ffffff"} iconColor={report ? ("#ffffff") : "#8A7DFF"}/>
            <CheckList option={option02} functionType = {report ? (() => (option02 ? setOption02(false) : setOption02(true))) : () => [(setOption02(false), checkSelection(option02))]} message={ report ? ("Inappropiate Message") : "Found Someone Else" } iconName={report ? ("check") : "checkbox-blank-circle"} borderRadius={report ? (0) : 15} backgroundColor={report ? ("#8A7DFF") : "#ffffff"} iconColor={report ? ("#ffffff") : "#8A7DFF"}/>
            <CheckList option={option03} functionType = {report ? (() => (option03 ? setOption03(false) : setOption03(true))) : () => [(setOption03(false), checkSelection(option03))]} message={ report ? ("Inappropiate Photos") : "Too Much Time Passed" } iconName={report ? ("check") : "checkbox-blank-circle"} borderRadius={report ? (0) : 15} backgroundColor={report ? ("#8A7DFF") : "#ffffff"} iconColor={report ? ("#ffffff") : "#8A7DFF"}/>
            <CheckList option={option04} functionType = {report ? (() => (option04 ? setOption04(false) : setOption04(true))) : () => [(setOption04(false), checkSelection(option04))]} message={ report ? ("Underage User") : "No Chemistry" } iconName={report ? ("check") : "checkbox-blank-circle"} borderRadius={report ? (0) : 15} backgroundColor={report ? ("#8A7DFF") : "#ffffff"} iconColor={report ? ("#ffffff") : "#8A7DFF"}/>
            <CheckList option={option05} functionType = {report ? (() => (option05 ? setOption05(false) : setOption05(true))) : () => [(setOption05(false), checkSelection(option05))]} message={ report ? ("Offline Behaviour") : "Other" } iconName={report ? ("check") : "checkbox-blank-circle"} borderRadius={report ? (0) : 15} backgroundColor={report ? ("#8A7DFF") : "#ffffff"} iconColor={report ? ("#ffffff") : "#8A7DFF"}/>
            <View style={{flexDirection:'row', height: moderateScale(52), borderTopWidth: moderateScale(1), borderColor: '#E8E6EA'}}>
              <TouchableOpacity style={{width: '50%',alignItems:'center', justifyContent:'center'}}  onPress={() => (setReport(false), setEndConversation(false), setOption01(true), setOption02(true), setOption03(true), setOption04(true), setOption05(true))}>
                <Text style={{color: colorTheme.tint, fontSize: moderateScale(14), fontWeight:'bold'}} >{"Cancel"}</Text>
              </TouchableOpacity>
              <View style={{backgroundColor: '#E8E6EA', width: moderateScale(1), height: '100%'}}></View>
              <TouchableOpacity style={{width: '50%', alignItems:'center', justifyContent:'center'}} onPress={() => ((!option01 || !option02 || !option03 || !option04 || !option05) ? (setConfirm(true), setPopUp(false), submit()) : "")}>
                <Text style={{color:colorTheme.tint, fontSize: moderateScale(14), fontWeight:'bold'}}>{"Confirm"}</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )}
    {(confirm) && (
      <View style={styles.container01}>
        <View style={styles.container02}/>
          <View style={[styles.container03,{backgroundColor: colorTheme.card}]}>
              <View style={{paddingHorizontal:moderateScale(24), paddingVertical: moderateScale(14), borderBottomWidth: moderateScale(1),  borderColor:'#E8E6EA'}}>
                <Text style={styles.titleText}>{"Thank You"}</Text>
                <Text style={{fontSize: moderateScale(16), marginTop: moderateScale(10)}}>{report ? ("We appreciate you reporting this person.") : "We will inform this person about your decision."}</Text>
              </View>
            <View style={{height: moderateScale(52), borderTopWidth: moderateScale(1), borderColor: '#E8E6EA'}}>
              <TouchableOpacity style={{width: '100%', height: '100%', alignItems:'center', justifyContent:'center'}} onPress={() => (setConfirm(false), setReport(false), setEndConversation(false), setOption01(true), setOption02(true), setOption03(true), setOption04(true), setOption05(true))}>
                <Text style={{color:colorTheme.tint, fontSize: moderateScale(14), fontWeight:'bold'}}>{"OK"}</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )}
    </>
  );
}

const styles = StyleSheet.create({
  container01 : {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  container02 : {
    width: '100%',
    height: '100%',
    backgroundColor: "#000000",
    opacity: 0.5,
  },
  container03 : {
    borderRadius: moderateScale(15),
    position: 'absolute',
    width: '70%'
  },
  titleText: {
    fontSize: moderateScale(21),
    fontWeight: 'bold',
  },
  subText : {
    fontSize: moderateScale(16),
    marginTop: moderateScale(12),
    marginBottom: moderateScale(12),
  },
  kebabMenuContainer: {
    borderRadius: moderateScale(15),
    width: moderateScale(168),
    flexDirection: "column",
    elevation: moderateScale(15),
    right: moderateScale(45),
    top: moderateScale(120),
    position: "absolute",
  },
  kebabMenuTextContainer: {
    height: moderateScale(48),
    paddingTop: moderateScale(12),
    paddingLeft: moderateScale(16),
  },
});
