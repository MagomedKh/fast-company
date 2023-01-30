import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
   name: 'comments',
   initialState: {
      entities: null,
      isLoaded: false,
      error: null,
   },
   reducers: {
      commentsRequested(state) {
         state.isLoaded = false
      },
      commentsReceve(state, action) {
         state.entities = action.payload
         state.isLoaded = true
      },
      commentsRequestFailed(state, action) {
         state.error = action.payload
         state.isLoaded = true
      },
      commentCreated(state, action) {
         state.entities.push(action.payload)
      },
      commentRemoved(state, action) {
         state.entities = state.entities.filter(c => c._id !== action.payload)
      },
   }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceve, commentsRequestFailed, commentCreated, commentRemoved, } = actions

const createCommentRequested = createAction('comments/createCommentRequested')
const removeCommentRequested = createAction('comments/removeCommentRequested')

export const loadCommentsList = (userId) => async (dispatch) => {
   dispatch(commentsRequested())
   try {
      const { content } = await commentService.getComments(userId);
      dispatch(commentsReceve(content))
   } catch (error) {
      dispatch(commentsRequestFailed(error.message))
   }
}

export const createComment = (payload) => async (dispatch, getState) => {
   dispatch(createCommentRequested(payload))
   const comment = {
      ...payload,
      _id: nanoid(),
      created_at: Date.now(),
      userId: getCurrentUserId()(getState())
   };
   try {
      const content = await commentService.createComment(comment);
      dispatch(commentCreated(content))
   } catch (error) {
      dispatch(commentsRequestFailed(error.message))
   }
}

export const removeComment = (id) => async (dispatch) => {
   dispatch(removeCommentRequested(id))
   try {
      const content = await commentService.removeComment(id);
      if (content === null) {
         dispatch(commentRemoved(id))
      }
   } catch (error) {
      dispatch(commentsRequestFailed(error.message))
   }
}


export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadStatus = () => (state) => state.comments.isLoaded

export default commentsReducer
