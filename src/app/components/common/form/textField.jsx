import React from "react";
import { useState } from "react";

const TextField = ({ label, type = "text", name, value, onChange, error }) => {
   const [showPassword, setShowPassword] = useState(false);

   const handleChange = ({ target }) => {
      onChange({ name: target.name, value: target.value });
   };

   const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
   };

   const getInputClasses = () => {
      return "form-control" + (error ? " is-invalid" : "");
   };

   return (
      <div className="mb-4">
         <label htmlFor={name}>{label}</label>
         <div className="input-group has-validation">
            <input
               type={showPassword ? "text" : type}
               id={name}
               onChange={handleChange}
               value={value}
               name={name}
               className={getInputClasses()}
            />
            {type === "password" && (
               <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowPassword}
               >
                  <i
                     className={"bi bi-eye" + (showPassword ? "-slash" : "")}
                  ></i>
               </button>
            )}
            {/* {error && isStartWrite && ( */}
            {error && <div className="invalid-feedback">{error}</div>}
         </div>
      </div>
   );
};

export default TextField;
