import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfessionsList } from "../../../store/professions";
import { loadQualitiesList } from "../../../store/qualities";
import {
   getIsLoggedIn,
   getUsersLoadedStatus,
   loadUsersList,
} from "../../../store/users";

const AppLoader = ({ children }) => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(getIsLoggedIn());
   const usersStatusLoaded = useSelector(getUsersLoadedStatus());
   useEffect(() => {
      dispatch(loadQualitiesList());
      dispatch(loadProfessionsList());
      if (isLoggedIn) {
         dispatch(loadUsersList());
      }
   }, [isLoggedIn]);
   return usersStatusLoaded ? children : "Loading...";
};

export default AppLoader;
