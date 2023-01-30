import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams } from "react-router-dom";
import BackButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../../store/qualities";
import { getProfessions } from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const UserEditPage = () => {
   const dispatch = useDispatch();
   const [isLoaded, setIsLoaded] = useState(false);
   const [data, setData] = useState({
      name: "",
      email: "",
      profession: "",
      sex: "male",
      qualities: [],
   });
   const currentUser = useSelector(getCurrentUserData());
   let qualities = useSelector(getQualities());
   const userId = useParams()["*"].slice(0, useParams()["*"].indexOf("/"));

   if (Array.isArray(qualities)) {
      qualities = qualities.map((quality) => ({
         label: quality.name,
         value: quality._id,
      }));
   }
   let professions = useSelector(getProfessions());
   if (Array.isArray(professions)) {
      professions = professions.map((option) => ({
         label: option.name,
         value: option._id,
      }));
   }

   const [errors, setErrors] = useState({});

   useEffect(() => {
      currentUser &&
         setData((prev) => ({
            ...prev,
            ...currentUser,
            qualities: currentUser.qualities.map((id) => {
               return qualities.find((q) => q.value === id);
            }),
         }));
   }, [currentUser]);
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
      profession: {
         isRequired: { message: "Profession is required" },
      },
      qualities: {
         isRequired: { message: "Qualities is required" },
      },
   };

   useEffect(() => {
      if (isLoaded) validate();
   }, [data]);

   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return !Object.keys(errors).length;
   };

   const handleUpdate = (e) => {
      e.preventDefault();
      if (!validate()) return;
      const modifiedData = {
         ...data,
         _id: userId,
         qualities: data.qualities.map((qualiti) => qualiti.value),
      };
      dispatch(updateUser(modifiedData));
   };

   if (!isLoaded && professions && qualities && currentUser) setIsLoaded(true);

   return (
      <div className="container mt-5">
         <BackButton />
         <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
               {isLoaded ? (
                  <>
                     <h3 className="mb-4">{currentUser.name}</h3>

                     <form onSubmit={handleUpdate}>
                        <TextField
                           label="Name"
                           onChange={handleChange}
                           value={data.name}
                           name="name"
                           error={errors.name}
                        />
                        <TextField
                           label="Email"
                           onChange={handleChange}
                           value={data.email}
                           name="email"
                           error={errors.email}
                        />
                        <SelectField
                           label="Choose Your profession"
                           value={data.profession}
                           onChange={handleChange}
                           options={professions}
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
                           options={qualities}
                           onChange={handleChange}
                           name="qualities"
                           defaultValue={data.qualities}
                           value={data.qualities}
                           label="Choose Your qualities"
                           error={errors.qualities}
                        />
                        <button
                           disabled={!!Object.keys(errors).length}
                           className="btn btn-primary w-100 mx-auto mb-3"
                        >
                           Update
                        </button>
                     </form>
                  </>
               ) : (
                  <h1>Loading...</h1>
               )}
            </div>
         </div>
      </div>
   );
};

export default UserEditPage;
