import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale } from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export default function Header({ title, icon, functionType}) {
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;

  return (
    <View style={[styles.header, { width: useWindowDimensions().width, backgroundColor: colorTheme.card, borderColor: colorTheme.card}]}>
        <View style={[styles.titleContainer]}>  
          <Text style={[styles.headerText,{color: colorTheme.text}]}>{ title }</Text>
        </View>
        <TouchableOpacity style={[styles.iconContainer]} onPress={functionType}>  
          <MaterialCommunityIcons name={icon} size={moderateScale(28)} color={colorTheme.tint}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: moderateScale(10),
    alignItems: 'flex-end',
    height: moderateScale(55),
    paddingTop: moderateScale(55),
    borderTopWidth: moderateScale(55),
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: moderateScale(34),
  },
  titleContainer: {
    height: moderateScale(52),
    bottom: moderateScale(12),
    left: moderateScale(44),
  },
  iconContainer: {
    width: moderateScale(52),
    height: moderateScale(52),
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    right: moderateScale(30),
    bottom: moderateScale(12),
  }
});

