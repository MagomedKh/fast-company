import Select from "react-select";

const MultiSelectField = ({
   options,
   onChange,
   name,
   value,
   label,
   defaultValue,
   error,
}) => {
   const optionsArray =
      !Array.isArray(options) && typeof options === "object"
         ? Object.keys(options).map((optionName) => ({
              label: options[optionName].name,
              value: options[optionName]._id,
           }))
         : options;
   //!! : options.map((option) => ({
   // !!     name: option.name,
   // !!     value: option._id,
   // !!  }));

   const handleChange = (value) => {
      onChange({ name, value });
   };

   const getInputClasses = () => {
      return "basic-multi-select" + (error ? " is-invalid" : "");
   };

   return (
      <div className="mb-4">
         <label className="form-label">{label}</label>
         <Select
            isMulti
            value={value}
            options={optionsArray}
            className={getInputClasses()}
            classNamePrefix="select"
            onChange={handleChange}
            defaultValue={defaultValue}
            name={name}
            closeMenuOnSelect={false}
         />
         {error && <div className="invalid-feedback">{error}</div>}
      </div>
   );
};

export default MultiSelectField;
