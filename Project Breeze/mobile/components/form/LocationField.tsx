import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { moderateScale } from "../../constants/Layout";
import ErrorMessage from "./ErrorMessage";

function LocationField({ name, key }: any) {
  const { handleChange, setFieldValue, errors, touched } = useFormikContext();

  return (
    <>
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        placeholder="Enter Suburb, City or State"
        fetchDetails
        onPress={(data, details = null) => {
          const locationObject = { ...data["terms"] };
          const location = {
            suburb: locationObject[0].value,
            city: locationObject[1].value,
            state: locationObject[2].value,
            longitude: details?.geometry.location.lng,
            latitude: details?.geometry.location.lat
          };
          setFieldValue(name, location);
        }}
        query={{
          key: "AIzaSyBqD4a1Z-j47rCTIxrtiiQxADZ7WRR0f0E",
          language: "en",
          components: "country:au",
          types: "locality|administrative_area_level_1",
        }}
        renderLeftButton={() => {
          return (
            <View style={styles.locationLeftButton}>
              <MaterialCommunityIcons
                name="map-marker"
                size={moderateScale(20)}
                color="#8A7DFF"
              />
            </View>
          );
        }}
        styles={locationStyle}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  locationLeftButton: {
    paddingHorizontal: moderateScale(10),
  },
});
const locationStyle = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: moderateScale(1),
    borderTopEndRadius: moderateScale(15),
    borderColor: "#E8E6EA",
    borderRadius: moderateScale(15),
    width: "100%",
    aspectRatio: 295 / 58,
  },
  textInput: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: moderateScale(14),
    flex: 1,
  },
});
export default LocationField;
