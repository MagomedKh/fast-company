import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/users";

const LogOut = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      dispatch(logout(navigate));
   }, []);

   return <h1>Loading...</h1>;
};

export default LogOut;
