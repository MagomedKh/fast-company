import React from "react";

const RadioField = ({ options, name, onChange, value, label }) => {
   const handleChange = ({ target }) => {
      onChange({ name: target.name, value: target.value });
   };

   return (
      <div className="mb-4">
         <label className="form-label">{label}</label>
         <div>
            {options.map((option) => (
               <div
                  key={option.name + "_" + option.value}
                  className="form-check form-check-inline"
               >
                  <input
                     type="radio"
                     name={name}
                     id={option.name + "_" + option.value}
                     value={option.value}
                     className="form-check-input"
                     checked={option.value === value}
                     onChange={handleChange}
                  />
                  <label
                     htmlFor={option.name + "_" + option.value}
                     className="form-check-label"
                  >
                     {option.name}
                  </label>
               </div>
            ))}
         </div>
      </div>
   );
};

export default RadioField;
