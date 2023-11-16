import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Image} from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale } from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export default function Header({ title, icon, status, statusElement01, statusElement02, image, navigation, functionType}) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  return (
    <View style={[styles.header, { width: useWindowDimensions().width, backgroundColor: colorTheme.card, borderColor: colorTheme.card}]}>
        <TouchableOpacity style={[styles.iconContainer01]} onPress={() => navigation.navigate('TabThree')}>  
          <Ionicons name="md-chevron-back-sharp" size={moderateScale(28)} style={[styles.icon,{color:colorTheme.tint}]}/>
        </TouchableOpacity>
        <View style={[styles.messagerContainer]}>
          <LinearGradient colors={statusElement01} start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={styles.gradient}>
            <View style={{borderWidth: moderateScale(2), borderRadius: moderateScale(60), borderColor: '#ffffff'}}>
              <Image style={styles.image} source={ image }/>
            </View>
          </LinearGradient>
          <View style={styles.infoContainer}>
            <Text style={[styles.titleText,{color:colorTheme.text}]}>{ title }</Text>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
              <View style={{width: moderateScale(6), height: moderateScale(6), backgroundColor: statusElement02, borderRadius: moderateScale(100) }}></View>
              <Text style={[styles.statusText, {left: moderateScale(4), color:colorTheme.subText}]}>{ status }</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={[styles.iconContainer02]} onPress={functionType}>  
          <MaterialCommunityIcons name={icon} size={moderateScale(28)} style={[styles.icon,{color:colorTheme.tint}]}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: moderateScale(10),
    alignItems: 'flex-end',
    justifyContent:'center',
    height: moderateScale(55),
    paddingTop: moderateScale(55),
    borderTopWidth: moderateScale(55),
    flexDirection: 'row',
  },
  messagerContainer: {
    height: moderateScale(52),
    width: moderateScale(250),
    justifyContent:'center',
    alignItems:'center',
    bottom: moderateScale(12),
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection:'column', 
    left: moderateScale(10), 
    paddingRight: moderateScale(10)
  },
  iconContainer01: {
    width: moderateScale(52),
    height: moderateScale(52),
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    left: moderateScale(30),
    bottom: moderateScale(12),
  },
  iconContainer02: {
    width: moderateScale(52),
    height: moderateScale(52),
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right: moderateScale(30),
    bottom: moderateScale(12),
  },
  icon: {
    position: 'absolute',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: moderateScale(24),
  },
  statusText: {
    fontSize: moderateScale(12),
  },
  image: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(60),
  },
  gradient: {
    height: moderateScale(56),
    width: moderateScale(56), 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: moderateScale(60)
  },
});

