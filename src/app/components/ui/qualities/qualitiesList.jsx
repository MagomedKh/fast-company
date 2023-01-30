import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   getQualitiesByIds,
   getQualitiesLoadedStatus,
   loadQualitiesList,
} from "../../../store/qualities";
import Quality from "./qualitie";

const QualitiesList = ({ qualities }) => {
   const dispatch = useDispatch();
   const isLoaded = useSelector(getQualitiesLoadedStatus());
   const qualitiesList = useSelector(getQualitiesByIds(qualities));

   useEffect(() => {
      dispatch(loadQualitiesList());
   }, []);

   return isLoaded ? (
      <>
         {qualitiesList.map((qual) => (
            <Quality key={qual._id} {...qual} />
         ))}
      </>
   ) : (
      "Loading..."
   );
};

export default QualitiesList;
