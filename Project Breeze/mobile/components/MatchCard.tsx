import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { moderateScale } from '../constants/Layout';

export default function MatchCard({ item, navigation}) {
  return (
      <TouchableOpacity onPress={() => navigation.navigate("MatchConfirm", { item })}>
        <View style={styles.card}>
          <Image style={styles.image} source={item.imagePath} />
          <View style={styles.titleBackground}></View>
          <Text style={styles.title}>{item.title + ", " + item.age}</Text>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    width: moderateScale(140),
    height: moderateScale(206),
    backgroundColor: '#fff',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  title: {
    fontWeight: "bold",
    fontSize: moderateScale(16),
    color: "#fff",
    position: "absolute",
    marginVertical: moderateScale(172),
    marginHorizontal: moderateScale(10),
  },
  image: {
    width: moderateScale(140),
    height: moderateScale(206),
    borderRadius: 15,
  },
  titleBackground: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: "#000000",
    opacity: 0.4,
    width: moderateScale(140),
    height: moderateScale(44),
    position: "absolute",
    marginTop: moderateScale(162),
  },
});

