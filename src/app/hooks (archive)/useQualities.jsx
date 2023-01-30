import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
   return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
   const [qualities, setQualities] = useState([]);
   const [isLoaded, setLoaded] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      getQualitiesList();
   }, []);

   useEffect(() => {
      if (error !== null) {
         toast.error(error);
         setError(null);
      }
   }, [error]);

   const getQuality = (id) => {
      return qualities.find((q) => q._id === id);
   };

   async function getQualitiesList() {
      try {
         const { content } = await qualityService.fetchAll();
         setQualities(content);
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
      <QualitiesContext.Provider value={{ isLoaded, qualities, getQuality }}>
         {children}
      </QualitiesContext.Provider>
   );
};
