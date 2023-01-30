import { useSelector } from "react-redux";
import { useAuth } from "../../../hooks (archive)/useAuth";
import { getCurrentUserId, getUserById } from "../../../store/users";
import { displayDate } from "../../../utils/displayDate";

const Comment = ({
   content,
   created_at: created,
   _id: id,
   userId,
   onRemove,
}) => {
   const user = useSelector(getUserById(userId));
   const currentUserId = useSelector(getCurrentUserId());
   return (
      <div className="bg-light mb-3 card-body">
         <div className="row">
            <div className="col">
               <div className="d-flex flex-start">
                  <img
                     src={user.image}
                     className="rounded-circle shadow-1-strong me-3"
                     height="65"
                     width="65"
                     alt="avatar"
                  />
                  <div className="flex-grow-1 flex-shrink-1">
                     <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                           <p className="mb-1">
                              {user.name}
                              <span className="small">
                                 &nbsp; - &nbsp;{displayDate(created)}
                              </span>
                           </p>
                           {currentUserId === userId && (
                              <button
                                 onClick={() => onRemove(id)}
                                 className="btn btn-sm text-primary d-flex align-items-center"
                              >
                                 <i className="bi bi-x-lg"></i>
                              </button>
                           )}
                        </div>
                        <p className="small mb-0">{content}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Comment;
