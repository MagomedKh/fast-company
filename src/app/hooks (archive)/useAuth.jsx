import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import localStorageService, {
   setTokens,
} from "../services/localStorage.service";
import userService from "../services/user.service";

export const httpAuth = axios.create({
   baseURL: "https://identitytoolkit.googleapis.com/v1/",
   params: {
      key: process.env.REACT_APP_FIREBASE_KEY,
   },
});
const AuthContext = React.createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
   const [currentUser, setUser] = useState();
   const [error, setError] = useState(null);
   const [isLoaded, setLoaded] = useState(false);
   const navigate = useNavigate();

   const randomInt = (min, max) => Math.ceil(Math.random() * (max - min + 1));

   async function signUp({ email, password, ...rest }) {
      try {
         const { data } = await httpAuth.post(`accounts:signUp`, {
            email,
            password,
            returnSecureToken: true,
         });
         setTokens(data);
         await createUser({
            _id: data.localId,
            email,
            rate: randomInt(1, 5),
            completedMeetings: randomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${(
               Math.random() + 1
            )
               .toString(36)
               .substring(7)}.svg`,
            ...rest,
         });
      } catch (error) {
         errorCatcher(error);
         const { code, message } = error.response.data.error;
         if (code === 400) {
            if (message === "EMAIL_EXISTS") {
               const errorObj = {
                  email: "User with this email already exists",
               };
               throw errorObj;
            }
         }
      }
   }

   async function signIn({ email, password }) {
      try {
         const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
            email,
            password,
            returnSecureToken: true,
         });
         setTokens(data);
         await getUserData();
      } catch (error) {
         errorCatcher(error);
         const { code, message } = error.response.data.error;
         console.log(error);
         if (code === 400) {
            switch (message) {
               case "EMAIL_NOT_FOUND" || "INVALID_PASSWORD":
                  throw "Invalid email or password";
               default:
                  throw "Too many attemps, try later";
            }
         }
      }
   }

   function logOut() {
      localStorageService.removeAuthData();
      setUser(null);
      navigate("/");
   }

   async function createUser(data) {
      try {
         const content = await userService.create(data);
         setUser(content);
      } catch (error) {
         errorCatcher(error);
      }
   }

   function errorCatcher(err) {
      const { message } = err.response.data;
      setError(message);
   }

   async function updateUser(user) {
      try {
         const { data } = await userService.update({ ...user });
         setUser({ ...currentUser, ...data });
         console.log(data);
      } catch (error) {
         errorCatcher(error);
      }
   }

   async function getUserData() {
      try {
         const content = await userService.getCurrentUser();
         setUser(content);
      } catch (error) {
         errorCatcher(error);
      } finally {
         setLoaded(true);
      }
   }

   useEffect(() => {
      if (localStorageService.getAccessToken()) {
         getUserData();
      } else {
         setLoaded(true);
      }
   }, []);

   useEffect(() => {
      if (error !== null) {
         toast.error(error);
         setError(null);
      }
   }, [error]);

   return (
      <AuthContext.Provider
         value={{ signUp, signIn, updateUser, logOut, currentUser }}
      >
         {isLoaded ? children : "Loading..."}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
