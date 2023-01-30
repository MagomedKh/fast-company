import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
   return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
   const [isLoaded, setLoaded] = useState(false);
   const [professions, setProfession] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      getProfessionsList();
   }, []);

   useEffect(() => {
      if (error !== null) {
         toast.error(error);
         setError(null);
      }
   }, [error]);

   const getProfession = (id) => {
      return professions.find((p) => p._id === id);
   };

   async function getProfessionsList() {
      try {
         const { content } = await professionService.get();
         setProfession(content);
         setLoaded(true);
      } catch (error) {
         errorCatcher(error);
      }
   }

   function errorCatcher(err) {
      const { message } = err.response.data;
      setError(message);
   }

   return (
      <ProfessionContext.Provider
         value={{ isLoaded, professions, getProfession }}
      >
         {children}
      </ProfessionContext.Provider>
   );
};
