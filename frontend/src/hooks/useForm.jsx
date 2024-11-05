import { useState } from "react";
import { validateEmail, validatePassword } from "@/helpers/loginValidation";

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let error = "";
    if (field === "email") {
      error = validateEmail(value) ? "" : "Please enter a valid email address.";
    }
    if (field === "password") {
      error = validatePassword(value)
        ? ""
        : "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noErrors = Object.values(errors).every((error) => !error);
    if (noErrors) onSubmit();
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
