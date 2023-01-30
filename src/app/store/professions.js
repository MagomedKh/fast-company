import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import isOutdated from "../utils/isOutdated";

const professionsSlice = createSlice({
   name: 'professions',
   initialState: {
      entities: null,
      isLoaded: false,
      error: null,
      lastFetch: null,
   },
   reducers: {
      professionsRequested(state) {
         state.isLoaded = false
      },
      professionsReceve(state, action) {
         state.entities = action.payload
         state.isLoaded = true
         state.lastFetch = Date.now()
      },
      professionsRequestFailed(state, action) {
         state.error = action.payload
         state.isLoaded = true
      },
   }
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceve, professionsRequestFailed } = actions

export const loadProfessionsList = () => async (dispatch, getState) => {
   const { lastFetch } = getState().professions
   if (isOutdated(lastFetch)) {
      dispatch(professionsRequested())
      try {
         const { content } = await professionService.get();
         dispatch(professionsReceve(content))
      } catch (error) {
         dispatch(professionsRequestFailed(error.message))
      }
   }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadStatus = () => (state) => state.professions.isLoaded
export const getProfessionById = (professionId) => state => {
   if (state.professions.entities) {
      return state.professions.entities.find(profession => profession._id === professionId)
   }
}


export default professionsReducer
