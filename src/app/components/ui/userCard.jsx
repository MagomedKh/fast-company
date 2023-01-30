import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

const UserCard = ({ user, id }) => {
   const currentUser = useSelector(getCurrentUserData());

   return (
      <div className="card mb-3">
         <div className="card-body">
            {currentUser._id === id && (
               <Link
                  to={`${id}/edit`}
                  className="position-absolute top-0 end-0 btn btn-light btn border border-primary border-end-0 border-top-0"
               >
                  <i className="bi bi-gear"></i>
               </Link>
            )}
            <div className="d-flex flex-column align-items-center text-center position-relative">
               <img
                  src={user.image}
                  className="rounded-circle"
                  width="150"
                  alt="avatar"
               />
               <div className="mt-3">
                  <h4>{user.name}</h4>
                  <p className="text-secondary mb-1">{user.profession.name}</p>
                  <div className="text-muted">
                     <i
                        className="bi bi-caret-down-fill text-primary"
                        role="button"
                     ></i>
                     <i
                        className="bi bi-caret-up text-secondary"
                        role="button"
                     ></i>
                     <span className="ms-2">{user.rate}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserCard;
