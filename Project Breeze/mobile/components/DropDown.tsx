import React from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {   moderateScale } from "../constants/Layout";

function DropDown({data,value,onSelect}) {
    const [showOption, setShowOption] = React.useState(false);
    const colorTheme = useColorScheme() === "light" ? Colors.light : Colors.dark;
    const onSelectedItem = (val) => {
        setShowOption(false)
        onSelect(val)
    }

    const capitalizeFirst = str =>{
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
    <View>
        <Text style={styles.text}>Gender</Text>
        <TouchableOpacity 
        style={styles.dropDownstyle}
        activeOpacity={0.8}
        onPress={()=>setShowOption(!showOption)}
        >
            <Text>{!!value? value?.title: capitalizeFirst(value.title)}</Text>
            <MaterialCommunityIcons name="chevron-down" size={moderateScale(25)} color="grey" style={{transform:[{rotate: showOption ?"180deg":"0deg"}]}}/>
        </TouchableOpacity>
        {showOption && (<View style={styles.option}>
        {data.map((val,i)=>{
            return (
                <TouchableOpacity 
                key={String(i)}
                onPress={()=>onSelectedItem(val)}
                style={{
                    backgroundColor: value.title == val.title? "#e5e2ff" : "transparent",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    padding: moderateScale(8),
                    borderRadius:moderateScale(3),
                    paddingHorizontal: moderateScale(6),
                }}
                >
                <Text style={{color:value.title == val.title? "black" : colorTheme.text}} >{val.title}</Text>
                <MaterialCommunityIcons name="check" size={moderateScale(24)} color={ value.title == val.title? "#8A7DFF" : "white"}/>
                </TouchableOpacity>
            )
        })}
        </View>)}
      </View>
  );
}
const styles = StyleSheet.create({
    dropDownstyle:{
      backgroundColor: "white",
      padding: moderateScale(8),
      width:"80%",
      left: moderateScale(35),
      borderRadius:moderateScale(5),
      borderWidth:moderateScale(2),
      borderColor:"#E5E5E5",
      minHeight:moderateScale(42),
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems: "center",
    },
    option:{
      borderWidth:moderateScale(2),
      borderRadius:moderateScale(5),
      borderColor:"#E5E5E5",
      width:"80%",
      left: moderateScale(35),
      marginTop:moderateScale(9),
    },
    text:{
        fontSize:moderateScale(13),
        color:"#8A7DFF",
        width:"80%",
        left: moderateScale(35),
        fontWeight:"bold",
      }
  });
  
export default DropDown;
