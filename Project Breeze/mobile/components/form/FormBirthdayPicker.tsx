import { useFormikContext } from "formik";
import React from "react";
import { TextInput } from "react-native";
import BirthdayPicker from "../BirthdayPicker";
import ErrorMessage from "./ErrorMessage";

function FormBirthdayPicker({ name }: any) {
  const {
    // handleChange,
    // setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  }: any = useFormikContext();

  return (
    <>
      <BirthdayPicker
        birthday={values[name]}
        setBirthday={(value: string) => setFieldValue(name, value)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormBirthdayPicker;
