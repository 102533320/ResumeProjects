import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {   moderateScale } from "../constants/Layout";
import AppButton from "./AppButton";
import AuthContext from "../context/AuthContext";
import API from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";
function BirthdayPickerSetting({ birthday, setBirthday}: any) {
  const [loading, setLoading] = React.useState(false);
  const { sub: userId } = React.useContext(AuthContext)["user"];

  const success = () =>
  Alert.alert("Success", "Your changed have been saved.", [
    { text: "Confirm", onPress: () =>console.log("OK Pressed")  },
  ]);

  const updateUserData = async () => {
    setLoading(true);
    const user = await API.updateMatchDetails(
      userId,
      { birthday: new Date(birthday).toISOString() }
    ).then(()=> success()).finally(()=>{
      setLoading(false);
    });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
  return (
    <>
      <ActivityIndicator visible={loading}/>
      <View>
      <TouchableOpacity 
       style={styles.dropDownstyle}
       onPress={() => setModalVisible(true)}>
          <Text>
            {birthday !== undefined
              ? new Date(birthday?.toString()).toDateString()
              : new Date(birthday?.toString()).toDateString()}
          </Text>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={moderateScale(20)}
            color="grey"
          />
      </TouchableOpacity >

      {/* Calendar modal screen */}

      {modalVisible && (
        <View style={[styles.option,{ backgroundColor: colorTheme.background }]}>
          <CalendarPicker
           textStyle={{ color: colorTheme.text }}
            width={moderateScale(340)}
            todayBackgroundColor={colorTheme.background} 
            todayTextStyle={{color: colorTheme.text}}
            selectedDayColor="#8A7DFF"
            selectedDayTextColor="white"
            showDayStragglers
            onDateChange={(d: any) => {
              // console.log(d.toDateString() as Date);
              setBirthday(d.toString());

            }}
            monthYearHeaderWrapperStyle={styles.calendarHeader}
            monthTitleStyle={styles.monthTitle}
            yearTitleStyle={styles.yearTitle}
            previousComponent={
              <MaterialCommunityIcons name="chevron-left" size={moderateScale(35)} color={colorTheme.text} />
            }
            nextComponent={
              <MaterialCommunityIcons name="chevron-right" size={moderateScale(35)} color={colorTheme.text} />
            }
            dayLabelsWrapper={{}}
          />
        </View>
      )}
    </View>
    <View style={styles.save}>
    <AppButton
      title="Save"
      onPress={() => {
        updateUserData();
        setModalVisible(false);
      }}
      />
    </View>
   </>
  );
}

const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  monthTitle: {
    fontSize: moderateScale(12),
    color: "#8A7DFF",
  },
  yearTitle: {
    fontSize: moderateScale(23),
    color: "#8A7DFF",
  },
  modalText: {
    backgroundColor: "white",
    flex: 0.06,
    paddingHorizontal: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  birthday: {
    height: moderateScale(58),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    backgroundColor: "#e5e2ff",
    marginTop: moderateScale(10),
  },
  modalButton: {
    backgroundColor: "white",
    flex: 0.11,
    paddingHorizontal: moderateScale(30),
    justifyContent: "center",
  },
  modalCalendar: {
    backgroundColor: "white",
    borderTopEndRadius: moderateScale(50),
    borderTopStartRadius: moderateScale(50),
    justifyContent: "flex-end",
    flex: 0.45,
  },
  modalContent: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropDownstyle: {
    backgroundColor: "white",
    padding: moderateScale(8),
    width: "80%",
    left: moderateScale(35),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(2),
    borderColor: "#E5E5E5",
    minHeight: moderateScale(42),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  option: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: moderateScale(1), height: moderateScale(1) },
    shadowOpacity: moderateScale(0.4),
    shadowRadius: moderateScale(3),
    elevation: moderateScale(5),
    width: "80%",
    left: moderateScale(35),
    marginTop: moderateScale(9),
  },
  save: {
    flex: 1,
    justifyContent: "flex-end",
    width: "80%",
    left: moderateScale(40),
    marginBottom: moderateScale(20),
  },
});

export default BirthdayPickerSetting;
