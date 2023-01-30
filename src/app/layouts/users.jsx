import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId, getIsLoggedIn } from "../store/users";
const Users = () => {
   const isLoggedIn = useSelector(getIsLoggedIn());

   const currentUserId = useSelector(getCurrentUserId());
   const location = useLocation();

   const params = useParams()["*"];
   const paramsLength = params ? params.split("/").length : 0;

   if (!isLoggedIn) {
      return <Navigate to={"/login"} state={{ from: location.pathname }} />;
   }

   let component;
   switch (paramsLength) {
      case 1:
         component = <UserPage userId={params} />;
         break;
      case 2:
         component =
            currentUserId + "/edit" === params ? (
               <UserEditPage />
            ) : (
               <Navigate to={"/users/" + currentUserId + "/edit"} />
            );
         break;
      default:
         component = <UsersListPage />;
         break;
   }
   return <UsersLoader>{component}</UsersLoader>;
};

export default Users;
