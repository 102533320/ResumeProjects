import React, { useState, useEffect } from "react";
import { FlatList,View } from "react-native";
import InterestPickerItem from "./InterestPickerItem";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import InterestItemSetting from "./InterestItemSetting";
import {   moderateScale } from "../../constants/Layout";

function InterestSetting({ name, data, ...rest }: any) {
  const { setFieldValue, errors, touched, values }: any = useFormikContext();
  const [interests, setInterests] = useState(data);
  useEffect(() => {
    setInterests(data);
  }, [data]);
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <InterestItemSetting
            item={item}
            data={interests}
            onSelect={(items: any) => {
              setInterests(items);
              setFieldValue(
                name,
                items.filter((v) => v.active).map((v) => v["title"])
              );
            }}
          />
        )}
        {...rest}
      />
      <View style={{  width: "100%", left: moderateScale(10)}}>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </>
  );
}

export default InterestSetting;