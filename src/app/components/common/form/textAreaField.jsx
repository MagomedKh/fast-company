const TextAreaField = ({ label, name, rows = 3, value, onChange, error }) => {
   const handleChange = ({ target }) => {
      onChange({ name: target.name, value: target.value });
   };

   const getInputClasses = () => {
      return "form-control" + (error ? " is-invalid" : "");
   };

   return (
      <div className="mb-4">
         <label className="form-label" htmlFor={name}>
            {label}
         </label>
         <textarea
            className={getInputClasses()}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            rows={rows}
         />
         {error && <div className="invalid-feedback">{error}</div>}
      </div>
   );
};

export default TextAreaField;
