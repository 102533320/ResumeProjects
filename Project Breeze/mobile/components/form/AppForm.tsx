import React, { Children } from "react";
import { Formik } from "formik";
function AppForm({ initialValues, onSubmit, validationSchema, children }: any) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
