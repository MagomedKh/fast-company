import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
   return useContext(UserContext);
};

const UserProvider = ({ children }) => {
   const [users, setUsers] = useState([]);
   const { currentUser } = useAuth();
   const [isLoaded, setLoaded] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      getUsers();
   }, []);

   useEffect(() => {
      if (error !== null) {
         toast.error(error);
         setError(null);
      }
   }, [error]);

   useEffect(() => {
      if (isLoaded) {
         const newUsers = [...users];
         const indexUser = newUsers.findIndex((u) => u._id === currentUser._id);
         newUsers[indexUser] = currentUser;
         setUsers(newUsers);
      }
   }, [currentUser]);

   async function getUsers() {
      try {
         const { content } = await userService.get();
         setUsers(content);
         setLoaded(true);
      } catch (error) {
         errorCatcher(error);
      }
   }

   function errorCatcher(err) {
      const { message } = err.response.data;
      setError(message);
      setLoaded(true);
   }

   function getUserById(id) {
      return users.find((user) => user._id === id);
   }

   return (
      <UserContext.Provider value={{ users, getUserById }}>
         {isLoaded ? children : <h1>Loading...</h1>}
      </UserContext.Provider>
   );
};

export default UserProvider;
