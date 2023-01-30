import { nanoid } from "nanoid";
import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import commentService from "../services/comment.service";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
   return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
   const [isLoaded, setLoaded] = useState(false);
   const [comments, setComments] = useState([]);
   const [error, setError] = useState(null);
   const pageId = useParams()["*"];
   const currentUserId = useSelector(getCurrentUserId());
   useEffect(() => {
      getComments();
   }, [pageId]);

   useEffect(() => {
      if (error !== null) {
         toast.error(error);
         setError(null);
      }
   }, [error]);

   async function createComment(data) {
      const comment = {
         ...data,
         _id: nanoid(),
         pageId,
         created_at: Date.now(),
         userId: currentUserId,
      };
      try {
         const content = await commentService.createComment(comment);
         setComments((prev) => [...prev, content]);
      } catch (error) {
         errorCatcher(error);
      }
   }

   async function getComments() {
      try {
         const { content } = await commentService.getComments(pageId);
         setComments(content);
      } catch (error) {
         errorCatcher();
      } finally {
         setLoaded(true);
      }
   }

   async function removeComment(id) {
      try {
         const content = await commentService.removeComment(id);
         if (content === null) {
            setComments((prev) => [...prev.filter((c) => c._id !== id)]);
         }
      } catch (error) {
         errorCatcher(error);
      }
   }

   function errorCatcher(err) {
      const { message } = err.response.data;
      setError(message);
   }

   return (
      <CommentsContext.Provider
         value={{ isLoaded, comments, createComment, removeComment }}
      >
         {children}
      </CommentsContext.Provider>
   );
};
