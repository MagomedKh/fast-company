import axios from "axios";
import localStorageService from "./localStorage.service";

export const httpAuth = axios.create({
   baseURL: "https://identitytoolkit.googleapis.com/v1/",
   params: {
      key: process.env.REACT_APP_FIREBASE_KEY,
   },
});

const authService = {
   async register({ email, password }) {
      const { data } = await httpAuth.post('accounts:signUp', {
         email,
         password,
         returnSecureToken: true,
      })
      return data
   },
   async login({ email, password }) {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
         email,
         password,
         returnSecureToken: true,
      })
      return data
   },
   async refresh() {
      const { data } = await httpAuth.post('token', {
         grant_type: 'refresh_token',
         refreshToken: localStorageService.getRefreshToken()
      })
      return data
   }
}

export default authService