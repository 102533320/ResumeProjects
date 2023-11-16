import React, { useRef, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import Icon from "./Icon";
import { moderateScale } from "../constants/Layout";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

function RegionPicker({ setRegion, activeRegion, regions }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  const [searchTxt, setSearchtxt] = useState("");
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {/* region picker */}
          <View style={styles.picker}>
            <AppText style={styles.pickerText}>
              {activeRegion.code} ({activeRegion.dial_code})
            </AppText>
            <MaterialCommunityIcons
              name="chevron-down"
              color={colorTheme.text}
              size={40 * 0.5}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Modal region list */}
      <Modal visible={modalVisible} animationType="slide">
        <>
          {/* Top Search bar & close button */}
          <View
            style={[
              styles.modalTopBar,
              { backgroundColor: colorTheme.background },
            ]}
          >
            <Icon
              name="arrow-left"
              iconColor="#cacaca"
              size={50}
              onPress={() => setModalVisible(false)}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="off"
              style={[styles.modalSearchInput, { color: colorTheme.text }]}
              placeholderTextColor={colorTheme.text}
              value={searchTxt}
              onChangeText={(text) => setSearchtxt(text)}
              placeholder="Search"
            />
          </View>
          <FlatList
            data={regions.filter(({ name }: any) =>
              name.toLowerCase().includes(searchTxt)
            )}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setRegion(item);
                  setModalVisible(false);
                }}
              >
                <View
                  style={[
                    styles.selectableItem,
                    { backgroundColor: colorTheme.background },
                  ]}
                >
                  <AppText
                    style={[
                      styles.countryValue,
                      { flex: 3, textAlign: "left" },
                    ]}
                  >
                    {item.name}
                  </AppText>
                  <AppText
                    style={[
                      styles.countryValue,
                      { flex: 1, textAlign: "right" },
                    ]}
                  >
                    {item.dial_code}
                  </AppText>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  modalTopBar: {
    borderBottomWidth: moderateScale(1),
    borderColor: "#eeeeee",
    elevation: moderateScale(5),
    width: "100%",
    height:moderateScale(58),
    alignItems: "center",
    flexDirection: "row",
  },
  modalSearchInput: {
    height: "100%",
    fontSize: moderateScale(20),
    flex: 1,
    marginLeft: moderateScale(15),
  },
  picker: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(5),
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  pickerText: {
    fontSize: moderateScale(12),
  },
  selectableItem: {
    flexDirection: "row",
    padding: moderateScale(15),
    paddingHorizontal: moderateScale(50),
    alignItems: "center",
  },
  countryValue: {
    fontSize: moderateScale(20),
    color: "#999999",
  },
});

export default RegionPicker;
