import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import navigateUtil from "../utils/navigateUtil";

const initialState = localStorageService.getAccessToken() ? {
   entities: null,
   isLoaded: false,
   error: null,
   auth: { userId: localStorageService.getUserId() },
   isLoggedIn: true,
   dataLoaded: false,
} : {
   entities: null,
   isLoaded: true,
   error: null,
   auth: null,
   isLoggedIn: false,
   dataLoaded: false,
}

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      usersRequested(state) {
         state.isLoaded = false
      },
      usersReceved(state, action) {
         state.entities = action.payload
         state.dataLoaded = true
         state.isLoaded = true
      },
      usersRequestFailed(state, action) {
         state.error = action.payload
         state.isLoaded = true
      },
      authRequested(state) {
         state.error = null
      },
      authRequestSuccess(state, action) {
         state.auth = action.payload
         state.isLoggedIn = true
      },
      authRequestFailed(state, action) {
         state.error = action.payload
      },
      userCreated(state, action) {
         if (!Array.isArray(state.entities)) {
            state.entities = []
         }
         state.entities.push(action.payload)
      },
      userLoggedOut(state) {
         state.entities = null
         state.isLoggedIn = false
         state.auth = null
         state.dataLoaded = false
      },
      userUpdated(state, action) {
         const index = state.entities.findIndex(u => u._id === action.payload._id)
         state.entities[index] = action.payload
      }
   }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceved, usersRequestFailed, authRequestSuccess, authRequestFailed, userCreated, userLoggedOut, userUpdated, } = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFailed = createAction('users/createUserFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const updateUserFailed = createAction('users/updateUserFailed')

export const login = ({ payload, redirect }) => async (dispatch) => {
   const { email, password } = payload
   dispatch(authRequested())
   try {
      const data = await authService.login({ email, password })
      dispatch(authRequestSuccess({ userId: data.localId }))
      localStorageService.setTokens(data)
      navigateUtil.push(redirect)
   } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
         const errorMessage = generateAuthError(message)
         dispatch(authRequestFailed(errorMessage))
      } else {
         dispatch(authRequestFailed(error.message))
      }
   }
}
export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
   dispatch(authRequested)
   try {
      const data = await authService.register({ email, password, })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      dispatch(createUser({
         _id: data.localId,
         email,
         bookmark: false,
         rate: getRandomInt(1, 5),
         completedMeetings: getRandomInt(0, 200),
         image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
         )
            .toString(36)
            .substring(7)}.svg`,
         ...rest,
      }))
   } catch (error) {
      dispatch(authRequestFailed(error.message))
   }
}
export const logout = () => (dispatch) => {
   localStorageService.removeAuthData()
   dispatch(userLoggedOut())
   navigateUtil.push("/");
}

function createUser(payload) {
   return async (dispatch) => {
      dispatch(userCreateRequested())
      try {
         const content = await userService.create(payload)
         console.log(content)
         dispatch(userCreated(content))
         navigateUtil.push("/users");
      } catch (error) {
         dispatch(createUserFailed(error.message))
      }
   }
}

export const updateUser = (user) => async (dispatch) => {
   dispatch(userUpdateRequested())
   try {
      const { data } = await userService.update(user);
      dispatch(userUpdated(data))
      navigateUtil.push(`/users/${user._id}`)
   } catch (error) {
      dispatch(updateUserFailed(error.message))
   }
}

export const loadUsersList = () => async (dispatch) => {
   dispatch(usersRequested())
   try {
      const { content } = await userService.get();
      dispatch(usersReceved(content))
   } catch (error) {
      dispatch(usersRequestFailed(error.message))
   }
}

export const getUserById = (userId) => state => {
   if (state.users.entities) {
      return state.users.entities.find(user => user._id === userId)
   }
}
export const getUsersList = () => state => state.users.entities
export const getIsLoggedIn = () => state => state.users.isLoggedIn
export const getDataStatus = () => state => state.users.dataLoaded
export const getCurrentUserId = () => state => state.users.auth?.userId
export const getUsersLoadedStatus = () => state => state.users.isLoaded
export const getCurrentUserData = () => state => {
   return state.users.entities ? state.users.entities.find(u => u._id === state.users.auth.userId) : null
}
export const getAuthErrors = () => state => state.users.error

export default usersReducer
