import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, StatusBar} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale } from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import BackButton from './BackButton';

export default function HeaderSetting({ title, navigation}) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  return (
    <>
    <StatusBar
      barStyle={
      useColorScheme() === "light" ? "dark-content" : "light-content"
      }
      backgroundColor={colorTheme.background}
      translucent
    />
    <View style={[styles.header, { width: useWindowDimensions().width, backgroundColor: colorTheme.card, borderColor: colorTheme.card}]}>
        <View style={[styles.iconContainer]}>  
          <BackButton navigation={navigation}/>
        </View>
        <View style={[styles.titleContainer]}>  
          <Text style={[styles.headerText,{color: colorTheme.text}]}>{ title }</Text>
        </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    shadowColor: "#000",
    shadowOffset: {
	  width: moderateScale(0),
	  height: moderateScale(1.5),
    },
    shadowOpacity: moderateScale(0.2),
    shadowRadius: moderateScale(10),
    elevation: moderateScale(10),
    alignItems: 'flex-end',
    alignSelf: 'center',
    height: moderateScale(55),
    paddingTop: moderateScale(55),
    borderTopWidth: moderateScale(55),
    flexDirection: 'row',
    zIndex:moderateScale(2),
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: moderateScale(34),
  },
  titleContainer: {
    height: moderateScale(52),
    bottom: moderateScale(10),
    left: moderateScale(10),
  },
  iconContainer: {
    height: moderateScale(52),
    bottom: moderateScale(12),
    left: moderateScale(10),
    paddingRight:moderateScale(20),
  },
});

