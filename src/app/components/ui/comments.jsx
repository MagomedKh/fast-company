import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";
import _ from "lodash";
import { useComments } from "../../hooks (archive)/useComments";
import { useDispatch, useSelector } from "react-redux";
import {
   createComment,
   getComments,
   getCommentsLoadStatus,
   loadCommentsList,
   removeComment,
} from "../../store/comments";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
   const userId = useParams()["*"];
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(loadCommentsList(userId));
   }, [userId]);
   const isLoaded = useSelector(getCommentsLoadStatus());
   const comments = useSelector(getComments());

   const handleSubmit = (data) => {
      dispatch(createComment({ ...data, pageId: userId }));
   };

   const handleRemoveComment = (id) => {
      dispatch(removeComment(id));
   };

   const sortedComments = _.orderBy(comments, ["created_at"], "desc");

   return (
      <>
         <div className="card mb-2">
            <div className="card-body">
               <AddCommentForm onSubmit={handleSubmit} />
            </div>
         </div>{" "}
         {!!sortedComments.length && (
            <div className="card mb-3">
               <div className="card-body">
                  <h2>Comments</h2>
                  <hr />
                  {isLoaded ? (
                     <CommentsList
                        comments={sortedComments}
                        onRemove={handleRemoveComment}
                     />
                  ) : (
                     "Loading..."
                  )}
               </div>
            </div>
         )}
      </>
   );
};

export default Comments;
