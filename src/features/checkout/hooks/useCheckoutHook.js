import React, { useState } from "react";

const useCheckoutHook = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;
  const validate = () => {
    let errors = {};
    if (values.name === "" || !values.name) {
      errors.name = "name required";
    }
    if (!values.email || !emailPattern.test(values.email)) {
      errors.email = "valid email required";
    }
    if (!values.address) {
      errors.address = "address required";
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const valErrors = validate();
    setErrors(valErrors);
    if (Object.keys(valErrors).length === 0) {
      onSubmit(values);
      setValues(initialValues);
    }
    setIsSubmitting(false);
  };
  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useCheckoutHook;
