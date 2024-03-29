import { useNavigate } from "react-router-dom";

const BackButton = () => {
   const navigate = useNavigate();
   return (
      <button className="btn btn-primary" onClick={() => navigate(-1)}>
         <i className="bi bi-caret-left" />
         Back
      </button>
   );
};

export default BackButton;
