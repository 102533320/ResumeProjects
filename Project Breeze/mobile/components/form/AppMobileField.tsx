import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import InputPhoneNo from "../InputPhoneNo";
function AppMobileField({ name, activeRegion, regions, ...others }: any) {
  const { handleChange, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <InputPhoneNo
        activeRegion={values?.[activeRegion]}
        regions={regions}
        onChangeText={handleChange(name)}
        setRegion={(item: any) => setFieldValue(activeRegion, item)}
        {...others}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppMobileField;
