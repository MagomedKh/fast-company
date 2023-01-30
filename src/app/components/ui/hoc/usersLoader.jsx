import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../../../store/users";

const UsersLoader = ({ children }) => {
   const dataStatus = useSelector(getDataStatus());
   const dispatch = useDispatch();
   useEffect(() => {
      if (!dataStatus) dispatch(loadUsersList());
   }, []);
   return dataStatus ? children : "Loading...";
};

export default UsersLoader;
