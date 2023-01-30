import React, { useEffect, useState } from "react";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";
import { useLocation } from "react-router-dom";

const LoginForm = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const [data, setData] = useState({
      email: "",
      password: "",
      stayOn: false,
   });
   const [errors, setErrors] = useState({});

   const loginError = useSelector(getAuthErrors());

   const handleChange = (target) => {
      setData((prev) => ({ ...prev, [target.name]: target.value }));
   };

   const validatorConfig = {
      email: {
         isRequired: { message: "Email is required" },
      },
      password: {
         isRequired: { message: "Password is required" },
      },
   };

   useEffect(() => {
      validate();
   }, [data]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return;
      dispatch(
         login({
            payload: data,
            redirect: location.state ? location.state.from : "../",
         })
      );
   };

   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return !Object.keys(errors).length;
   };

   // Test login
   useEffect(() => {
      handleChange({ name: "email", value: "Test1@example.com" });
      handleChange({ name: "password", value: "Test1@example.com" });
   }, []);

   return (
      <form onSubmit={handleSubmit}>
         <TextField
            label="Email"
            onChange={handleChange}
            value={data.email}
            name="email"
            error={errors.email}
         />
         <TextField
            label="Password"
            type="password"
            onChange={handleChange}
            value={data.password}
            name="password"
            error={errors.password}
         />
         <CheckBoxField
            value={data.stayOn}
            onChange={handleChange}
            name="stayOn"
         >
            Stay Sign In
         </CheckBoxField>
         {loginError && <p className="text-danger">{loginError}</p>}
         <button
            disabled={!!Object.keys(errors).length}
            className="btn btn-primary w-100 mx-auto mb-3"
         >
            Submit
         </button>
      </form>
   );
};

export default LoginForm;
