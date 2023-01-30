import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
   const dispatch = useDispatch();
   const [data, setData] = useState({
      email: "",
      password: "",
      name: "",
      profession: "",
      sex: "male",
      qualities: [],
      licence: false,
   });
   const qualities = useSelector(getQualities());
   const qualitiesList = qualities.map((qual) => ({
      label: qual.name,
      value: qual._id,
   }));
   const professions = useSelector(getProfessions());
   const professionsList = professions.map((prof) => ({
      label: prof.name,
      value: prof._id,
   }));
   const [errors, setErrors] = useState({});

   const handleChange = (target) => {
      setData((prev) => ({ ...prev, [target.name]: target.value }));
   };

   const validatorConfig = {
      email: {
         isRequired: { message: "Email is required" },
         isEmail: { message: "Email entered incorrectly" },
      },
      name: {
         isRequired: { message: "Name is required" },
         min: {
            message: `Name must consist of at least 3 characters`,
            value: 3,
         },
      },
      password: {
         isRequired: { message: "Password is required" },
         isCapitalSymbol: {
            message: "Password must contain at least one capital letter",
         },
         isContainDigit: {
            message: "Password must contain at least one number",
         },
         min: {
            message: `Password must consist of at least 8 characters`,
            value: 8,
         },
      },
      profession: {
         isRequired: { message: "Profession is required" },
      },
      qualities: {
         isRequired: { message: "Qualities is required" },
      },
      licence: {
         isRequired: { message: "Confirm is required" },
      },
   };

   useEffect(() => {
      validate();
   }, [data]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return;
      const newData = {
         ...data,
         qualities: data.qualities.map((q) => q.value),
      };
      dispatch(signUp(newData));
   };

   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return !Object.keys(errors).length;
   };

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
            label="Name"
            onChange={handleChange}
            value={data.name}
            name="name"
            error={errors.name}
         />
         <TextField
            label="Password"
            type="password"
            onChange={handleChange}
            value={data.password}
            name="password"
            error={errors.password}
         />
         <SelectField
            label="Choose Your profession"
            value={data.profession}
            onChange={handleChange}
            options={professionsList}
            defaultOption={"Choose..."}
            error={errors.profession}
            name="profession"
         />
         <RadioField
            options={[
               { name: "Male", value: "male" },
               { name: "Female", value: "female" },
               { name: "Other", value: "other" },
            ]}
            value={data.sex}
            name="sex"
            onChange={handleChange}
            label="Choose Your sex"
         />
         <MultiSelectField
            options={qualitiesList}
            onChange={handleChange}
            name="qualities"
            defaultValue={data.qualities}
            label="Choose Your qualities"
            error={errors.qualities}
         />
         <CheckBoxField
            value={data.licence}
            onChange={handleChange}
            name="licence"
            error={errors.licence}
         >
            Confirm the <a>license agreement</a>
         </CheckBoxField>
         <button
            disabled={!!Object.keys(errors).length}
            className="btn btn-primary w-100 mx-auto mb-3"
         >
            Submit
         </button>
      </form>
   );
};

export default RegisterForm;
