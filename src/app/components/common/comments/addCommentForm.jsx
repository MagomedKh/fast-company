import { useEffect } from "react";
import { useState } from "react";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
   const [data, setData] = useState({ content: "" });
   const [errors, setErrors] = useState({});

   const validateConfig = {
      content: {
         isRequired: { message: "Message is required" },
      },
   };
   useEffect(() => {
      validate();
   }, [data]);

   const validate = () => {
      const errors = validator(data, validateConfig);
      setErrors(errors);
      return !Object.keys(errors).length;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      !errors.length && onSubmit(data);
      setData({ content: "" });
   };

   const handleChange = (target) => {
      setData((prev) => ({ ...prev, [target.name]: target.value }));
   };

   return (
      <>
         <h2>New comment</h2>
         <form onSubmit={handleSubmit}>
            <TextAreaField
               label="Message"
               name={"content"}
               rows="3"
               value={data.content || ""}
               onChange={handleChange}
               error={errors.message}
               userId={data.userId}
            />
            <div className="d-flex justify-content-end">
               <button
                  className="btn btn-primary"
                  disabled={!!Object.keys(errors).length}
               >
                  Publish
               </button>
            </div>
         </form>
      </>
   );
};

export default AddCommentForm;
