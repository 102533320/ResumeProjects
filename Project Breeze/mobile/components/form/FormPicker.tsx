import { useFormikContext } from "formik";
import React, { useState } from "react";
import { FlatList } from "react-native";
import ErrorMessage from "./ErrorMessage";
import PickerItem from "./PickerItem";

function FormPicker({ name, data, initialState = {}, ...others }: any) {
  const { setFieldValue, errors, touched, values }: any = useFormikContext();
  const [activeItem, setActive] = useState(initialState);
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }: any) => (
          <PickerItem
            item={item}
            activeItem={activeItem}
            onPress={() => {
              setActive(item);
              setFieldValue(name, item["title"]);
            }}
          />
        )}
        {...others}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPicker;
