import { useSelector } from "react-redux";
import {
   getProfessionById,
   getProfessionsLoadStatus,
} from "../../store/professions";

const Profession = ({ id }) => {
   const prof = useSelector(getProfessionById(id));
   const isLoaded = useSelector(getProfessionsLoadStatus());
   return isLoaded ? <p>{prof.name}</p> : "Loading...";
};

export default Profession;
