import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import InterestPickerItem from "./InterestPickerItem";
import ErrorMessage from "./ErrorMessage";
import { setIn, useFormikContext } from "formik";

function InterestsPicker({ name, data, ...rest }: any) {
  const { setFieldValue, errors, touched }: any = useFormikContext();
  const [interests, setInterests] = useState(data);
  
  useEffect(() => {
    setInterests(data);
  }, [data]);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <InterestPickerItem
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
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default InterestsPicker;
