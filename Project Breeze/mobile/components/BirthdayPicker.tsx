import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../constants/Colors";
import { moderateScale } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import AppButton from "./AppButton";
import AppText from "./AppText";

function BirthdayPicker({ birthday, setBirthday }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  return (
    <>
      {/* Calendar Button */}
      
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.birthday}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={20}
            color="#8A7DFF"
          />
          <AppText style={styles.birthdayText}>
            {birthday !== undefined
              ? new Date(birthday?.toString()).toDateString()
              : "Choose birthday date"}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
      {/* Calendar modal screen */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
      >
        <View style={styles.modalContent}>
          <View
            style={[
              styles.modalCalendar,
              { backgroundColor: colorTheme.background },
            ]}
          >
            <CalendarPicker
              textStyle={{ color: colorTheme.text }}
              selectedDayColor="#8A7DFF"
              selectedDayTextColor="white"
              showDayStragglers
              onDateChange={(d: any) => {
                setBirthday(d.toString());
              }}
              monthYearHeaderWrapperStyle={styles.calendarHeader}
              monthTitleStyle={styles.monthTitle}
              yearTitleStyle={styles.yearTitle}
              previousComponent={
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={moderateScale(35)}
                  color={colorTheme.text}
                />
              }
              nextComponent={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={moderateScale(35)}
                  color={colorTheme.text}
                />
              }
              dayLabelsWrapper={{}}
            />
          </View>
          <View
            style={[
              styles.modalButton,
              { backgroundColor: colorTheme.background },
            ]}
          >
            <AppButton
              title="Save"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  birthday: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    backgroundColor: "#e5e2ff",
    marginTop: moderateScale(10),
    aspectRatio: 295 / 58,
    width: "100%",
  },
  birthdayText: {
    marginLeft: moderateScale(15),
    color: "#8A7DFF",
    fontWeight: "bold",
  },
  calendarHeader: {
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  monthTitle: {
    fontSize: moderateScale(14),
    color: "#8A7DFF",
  },
  yearTitle: {
    fontSize: moderateScale(34),
    color: "#8A7DFF",
  },
  modalButton: {
    flex: 0.11,
    paddingHorizontal: moderateScale(30),
    justifyContent: "center",
  },
  modalCalendar: {
    paddingTop: moderateScale(15),
    borderTopEndRadius: moderateScale(50),
    borderTopStartRadius: moderateScale(50),
    justifyContent: "flex-start",
    flex: 0.45,
  },
  modalContent: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default BirthdayPicker;
