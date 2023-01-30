import React from "react";
import { useParams } from "react-router-dom";
import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import { getUserById } from "../../../store/users";
import { useSelector } from "react-redux";

const UserPage = () => {
   const id = useParams()["*"];
   const user = useSelector(getUserById(id));

   return user ? (
      <div className="container">
         <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
               <UserCard user={user} id={id} />
               <QualitiesCard qualities={user.qualities} />
               <MeetingsCard meetings={user.completedMeetings} />
            </div>
            <div className="col-md-8">
               <Comments />
            </div>
         </div>
      </div>
   ) : (
      <h1>Loading...</h1>
   );
};

export default UserPage;
