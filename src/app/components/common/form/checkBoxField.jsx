import React from "react";

const CheckBoxField = ({ value, name, onChange, error, children }) => {
   const handleChange = () => {
      onChange({ name, value: !value });
   };

   const getInputClasses = () => {
      return "form-check" + (error ? " is-invalid" : "");
   };

   return (
      <div className="mb-3">
         <div className={getInputClasses()}>
            <input
               className="form-check-input"
               type="checkbox"
               value=""
               id={name}
               onChange={handleChange}
               checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
               {children}
            </label>
         </div>
         {error && <div className="invalid-feedback">{error}</div>}
      </div>
   );
};

export default CheckBoxField;
