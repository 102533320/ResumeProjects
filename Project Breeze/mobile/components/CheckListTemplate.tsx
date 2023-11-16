import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { moderateScale } from '../constants/Layout';

export default function CheckList({ option, functionType, message, iconName, borderRadius, backgroundColor, iconColor}) {
  return (
    <TouchableOpacity activeOpacity={1}
      style={{
        flexDirection: 'row',
        height: moderateScale(48),
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(12),
      }}
      onPress={functionType}
    >
      {option ? (
        <View
          style={{
            width: moderateScale(24),
            height: moderateScale(24),
            borderWidth: moderateScale(1),
            borderColor: '#E8E6EA',
            borderRadius: borderRadius
          }}
        />)
        :
        <View
          style={{
            width: moderateScale(24),
            height: moderateScale(24),
            borderWidth: moderateScale(1),
            borderColor: '#8A7DFF',
            backgroundColor: backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: borderRadius
          }}
        >
          <MaterialCommunityIcons
            name={iconName}
            size={moderateScale(21)}
            color={iconColor}
          />
        </View>
      }
      <Text
        style={{
          fontSize: moderateScale(16),
          marginLeft: moderateScale(24)
        }}>{message}
      </Text>
    </TouchableOpacity>
  );
}

