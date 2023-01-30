import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
import isOutdated from "../utils/isOutdated";

const qualitiesSlice = createSlice({
   name: 'qualities',
   initialState: {
      entities: null,
      isLoaded: false,
      error: null,
      lastFetch: null,
   },
   reducers: {
      qualitiesRequested: state => {
         state.isLoaded = false
      },
      qualitiesReceved: (state, action) => {
         state.entities = action.payload
         state.isLoaded = true
         state.lastFetch = Date.now()
      },
      qualitiesRequestFailed: (state, action) => {
         state.error = action.payload
         state.isLoaded = true
      }
   }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } = actions

export const loadQualitiesList = () => async (dispatch, getState) => {
   const { lastFetch } = getState().qualities
   if (isOutdated(lastFetch)) {
      dispatch(qualitiesRequested())
      try {
         const { content } = await qualityService.fetchAll();
         dispatch(qualitiesReceved(content))
      } catch (error) {
         dispatch(qualitiesRequestFailed(error.message))
      }
   }
}

export const getQualities = () => state => state.qualities.entities
export const getQualitiesLoadedStatus = () => state => state.qualities.isLoaded
export const getQualitiesByIds = (qualitiesIds) => state => {
   if (state.qualities.entities) {
      const qualitiesArray = []
      for (const qualId of qualitiesIds) {
         for (const quality of state.qualities.entities) {
            if (quality._id === qualId) {
               qualitiesArray.push(quality)
               break
            }
         }
      }
      return qualitiesArray
   }
   return []
}

export default qualitiesReducer