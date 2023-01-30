import React from "react";

const SelectField = ({
   label,
   value,
   onChange,
   defaultOption,
   options,
   name,
   error,
}) => {
   if (!(options && options.length && Object.keys(options).length)) return;

   const handleChange = ({ target }) => {
      onChange({ name: target.name, value: target.value });
   };

   const getInputClasses = () => {
      return "form-select" + (error ? " is-invalid" : "");
   };

   const optionsArray =
      !Array.isArray(options) && typeof options === "object"
         ? Object.keys(options).map((optionName) => ({
              label: options[optionName].name,
              value: options[optionName]._id,
           }))
         : options;
   // !!: options.map((option) => ({
   // !!     name: option.name,
   //  !!    value: option._id,
   //  !! }));
   return (
      <div className="mb-4">
         <label htmlFor={name} className="form-label">
            {label}
         </label>
         <select
            className={getInputClasses()}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
         >
            <option key="defaultOption" disabled value="">
               {defaultOption}
            </option>
            {optionsArray &&
               optionsArray.map((option) => (
                  <option value={option.value} key={option.value}>
                     {option.label}
                  </option>
               ))}
         </select>
         {error && <div className="invalid-feedback">{error}</div>}
      </div>
   );
};

export default SelectField;
