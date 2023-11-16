import { transform } from '@babel/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Colors from '../constants/Colors';
import { moderateScale } from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

export default function MatchConfirmScreen({navigation, route}) {

  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  const [cards] = useState([
    { xValue: moderateScale(70), yValue: moderateScale(-25), rotateValue: '-10deg' },
    { xValue: moderateScale(-70), yValue: moderateScale(25), rotateValue: '10deg' },
  ]);

  const translationCard01 = useRef(new Animated.ValueXY({ x: moderateScale(0), y: moderateScale(0) })).current;
  const translationCard02 = useRef(new Animated.ValueXY({ x: moderateScale(0), y: moderateScale(0) })).current;
  const rotateValue = new Animated.Value(0);

  useEffect(() => { 
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.spring(translationCard01.x, {
          toValue: cards[0].xValue,
          useNativeDriver: true,
        }),
        Animated.spring(translationCard02.x, {
          toValue: cards[1].xValue,
          useNativeDriver: true,
        }),
        Animated.spring(translationCard01.y, {
          toValue: cards[0].yValue,
          useNativeDriver: true
        }),
        Animated.spring(translationCard02.y, {
          toValue: cards[1].yValue,
          useNativeDriver: true
        }),
        Animated.spring(rotateValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ])
      ]).start();
    }, [])

    const rotateData01 = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '10deg']
    })

    const rotateData02 = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-10deg']
    })

  return (
      <View style={[styles.container, {flex:1 , backgroundColor: colorTheme.background, }]}>
         <View style={{justifyContent:'center', marginVertical:moderateScale(80)}}>
          <Animated.View style={{ position:'absolute',transform: [{ translateX: translationCard01.x}, { translateY: translationCard01.y}, { rotate: rotateData01 }]}}>
            <Image style={[styles.profileCard]} source={ require('../assets/images/Tan.jpg') }/>
            <View style={[styles.logoContainer, styles.logo01]}>
              <MaterialCommunityIcons name="heart" size={moderateScale(30)} color='#8A7DFF'/>
            </View>
          </Animated.View>
          <Animated.View style={{transform: [{ translateX: translationCard02.x}, { translateY: translationCard02.y}, { rotate: rotateData02 }]}}>
            <Image style={[styles.profileCard]} source={ route.params.item.imagePath }/>
            <View style={[styles.logoContainer, styles.logo02]}>
              <MaterialCommunityIcons name="heart" size={moderateScale(30)} color='#8A7DFF'/>
            </View>
          </Animated.View>
        </View> 
          <View style={[styles.titleContainer]}>
            <Text style={[styles.titleMatch]}>{"It's a match, Tan!"}</Text>
            <Text style={{fontSize:moderateScale(14), color: colorTheme.text}}>{"We will start the conversation with a prompt."}</Text>
          </View>
          <TouchableOpacity style={[styles.textCard, {backgroundColor: colorTheme.tint, elevation: 2}]} onPress={() => navigation.navigate('TabThree')} >
            <Text style={[styles.titleCard, {color: "#fff"}]}>{ "Send Prompt" }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.textCard, {backgroundColor: '#f4f3ff', elevation: 2}]} onPress={() => navigation.navigate('TabTwo')} >
            <Text style={[styles.titleCard, {color: colorTheme.tint}]}>{ "Go Back" }</Text>
          </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'flex-start',
    alignItems:'center',
  },
  profileCard: {
    borderRadius: moderateScale(15),
    width: moderateScale(160),
    height: moderateScale(240),
  },
  textCard: {
    borderRadius: moderateScale(15),
    width: moderateScale(295),
    height: moderateScale(56),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10)
  },
  titleCard: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  titleMatch: {
    fontSize: moderateScale(34),
    fontWeight: 'bold',
    color: '#8A7DFF'
  },
  titleContainer: {
    alignItems:'center',
  },
  logo01 : {
    position:'absolute',
    left: moderateScale(-30),
    bottom: moderateScale(210)
  },
  logo02 : {
    position:'absolute',
    left: moderateScale(-30),
    bottom: moderateScale(-30)
  },
  logoContainer: {
    borderRadius: moderateScale(100),
    width: moderateScale(60), 
    height: moderateScale(60),
    backgroundColor: '#FFFFFF',
    elevation: moderateScale(10),
    alignItems:'center',
    justifyContent: 'center',
  },
});
