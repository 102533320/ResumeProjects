import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import CognitoAuth from "../auth/CognitoAuth";
import AppCamera from "../components/AppCamera";
import ActivityIndicator from "../components/ActivityIndicator";
import HeaderAlt from "../components/HeaderAlt";
import { moderateScale } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function ImagePickerExample({navigation, route}) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const size = useWindowDimensions()
  const [image, setImage] = useState<String | null>();
  const [element, setElement] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0)
  var active
  var inactive01
  var inactive02

  const animatedScale = useRef(new Animated.Value(0)).current;
  const fadeAnim01 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const fadeAnim02 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const fadeAnim03 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const [image01, setImage01] = useState<String | null>()
  const [image02, setImage02] = useState<String | null>()
  const [image03, setImage03] = useState<String | null>()

  useEffect(() => {
    animatedScale.setValue(0)
    fadeAnim01.x.setValue(1)
    fadeAnim01.y.setValue(1)
    fadeAnim02.x.setValue(0.5)
    fadeAnim02.y.setValue(0.85)
    fadeAnim03.x.setValue(0.5)
    fadeAnim03.y.setValue(0.85)
  }, []);

  const handleButtonPress = (newX) => {
    setValue(newX)
    animatedScale.setValue(value)
    if (newX == 0) {
      active = fadeAnim01
      inactive01 = fadeAnim02
      inactive02 = fadeAnim03
    } else if (newX == -size.width) {
      active = fadeAnim02
      inactive01 = fadeAnim01
      inactive02 = fadeAnim03
    } else if (newX == -size.width - size.width){
      active = fadeAnim03
      inactive01 = fadeAnim01
      inactive02 = fadeAnim02
    }
    Animated.spring(animatedScale, {
      toValue: newX,
      useNativeDriver: true,
      tension: 15,
    }).start();
      Animated.timing(active.x, {
        toValue: 1,
        useNativeDriver: true,
        duration: 250
      }).start();
      Animated.timing(active.y, {
        toValue: 1,
        useNativeDriver: true,
        duration: 250
      }).start();
      Animated.timing(inactive01.x, {
        toValue: 0.5,
        useNativeDriver: true,
        duration: 250
      }).start();
      Animated.timing(inactive01.y, {
        toValue: 0.85,
        useNativeDriver: true,
        duration: 250
      }).start();
      Animated.timing(inactive02.x, {
        toValue: 0.5,
        useNativeDriver: true,
        duration: 250
      }).start();
      Animated.timing(inactive02.y, {
        toValue: 0.85,
        useNativeDriver: true,
        duration: 250
      }).start();
  };
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage({image: result.uri})
    }
  };

  const uploadImage = async({image}) => {
    setLoading(false)
    await CognitoAuth.uploadObject(
      image, 
      value === 0 ? ("profile01.png") : value === -size.width ? ("profile02.png") : ("profile03.png"),
      route.params.userList["_id"]
    ).then(() => {setLoading(true), setElement(false)}).catch((e) => {console.log(e)})
  }

  useEffect(() => {
    setImageData()
  })

  const setImageData = async() => {
    if ((Object.keys(route.params.userList).length > 0 && loading == false || image01 == null)) {
      for (var i = 0; i < 3; i++) {
        await CognitoAuth.getObject(route.params.userId, route.params.userList["photos"][i])
        .then((uri) => {
          i === 0 ? setImage01(uri) : i === 1 ? setImage02(uri) : setImage03(uri)
        })
        .catch((e) => {
          console.log(e);
        })
      }
    }
  }

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
        functionType={uploadImage}
      />
      <HeaderAlt title="Gallery" icon="dots-vertical" functionType={() => setElement(true)} navigation={navigation} screen={'TabOne'}/> 
      {loading ? ( 
      <><View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
          <Animated.View style={{ flexDirection: 'row', height: '100%', width: '100%', transform: [{ translateX: animatedScale }] }}>
            <Image source={image01 === null ? route.params.imagePath : { uri: image01 }} style={{ flexBasis: size.width }} />
            <Image source={image02 === null ? route.params.imagePath : { uri: image02 }} style={{ flexBasis: size.width }} />
            <Image source={image03 === null ? route.params.imagePath : { uri: image03 }} style={{ flexBasis: size.width }} />
          </Animated.View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', paddingVertical: moderateScale(20), justifyContent:'center', backgroundColor: colorTheme.background}}>
            <Animated.View style={{ opacity: fadeAnim01.x, transform: [{ scale: fadeAnim01.y }] }}>
              <TouchableOpacity onPress={() => handleButtonPress(0)}>
                <Image source={image01 === null ? route.params.imagePath : { uri: image01 }} style={{ width: moderateScale(64), height:  moderateScale(64), marginHorizontal:  moderateScale(10), borderRadius:  moderateScale(10) }} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ opacity: fadeAnim02.x, transform: [{ scale: fadeAnim02.y }] }}>
              <TouchableOpacity onPress={() => handleButtonPress(-size.width)}>
                <Image source={image02 === null ? route.params.imagePath : { uri: image02 }} style={{ width:  moderateScale(64), height:  moderateScale(64), marginHorizontal:  moderateScale(10), borderRadius:  moderateScale(10) }} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ opacity: fadeAnim03.x, transform: [{ scale: fadeAnim03.y }] }}>
              <TouchableOpacity onPress={() => handleButtonPress(-size.width - size.width)}>
                <Image source={image03 === null ? route.params.imagePath : { uri: image03 }} style={{ width:  moderateScale(64), height:  moderateScale(64), marginHorizontal:  moderateScale(10), borderRadius:  moderateScale(10) }} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
            {element && (
              <View style={[styles.kebabMenuContainer, { backgroundColor: colorTheme.card }]}>
                <TouchableOpacity
                  style={styles.kebabMenuTextContainer}
                  onPress={() => {
                    useCamera(), setElement(false);
                  } }
                >
                  <Text style={{ color: colorTheme.text, fontSize: moderateScale(12)}}>{"Take Picture"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.kebabMenuTextContainer}
                  onPress={() => pickImage()}
                >
                  <Text style={{ color: colorTheme.text, fontSize: moderateScale(12)}}>{"Choose From Gallery"}</Text>
                </TouchableOpacity>
              </View>
            )}</>
      ) : <View style={{alignItems: "center",justifyContent:'center', height: size.height, width: size.width}}><ActivityIndicator visible={true}/></View>}
    </>
  );
}

const styles = StyleSheet.create({
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
});
