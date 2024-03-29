import axios from "axios";
import { toast } from 'react-toastify'
import configFile from '../config.json'
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
   baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
   async function (config) {
      if (configFile.isFirebase) {
         const containSlash = /\/$/gi.test(config.url)
         if (containSlash) config.url = config.url.slice(0, -1)
         config.url += '.json'

         const expiresDate = localStorageService.getTokenExpiresDate()
         const refreshToken = localStorageService.getRefreshToken()
         if (refreshToken && expiresDate < Date.now()) {
            const data = await authService.refresh()
            localStorageService.setTokens({
               refreshToken: data.refresh_token, idToken: data.id_token, expiresIn: data.expires_in, localId: data.user_id
            })
         }
         const accessToken = localStorageService.getAccessToken()
         if (accessToken) {
            config.params = { ...config.params, auth: accessToken }
         }
      }
      return config
   }, function (error) {
      return Promise.reject(error)
   }
)

http.interceptors.response.use(
   res => {
      if (configFile.isFirebase) {
         res.data = res.data && !res.data._id ? { content: [...Object.values(res.data)] } : res.data
      }
      return res
   },
   function (error) {
      const isExpectedErrors = error.response && error.response.status >= 400 && error.response.status < 500
      if (!isExpectedErrors) {
         console.log(error)
         toast.error('Something was wrong. Try it later')
      }
      return Promise.reject(error)
   }
)

const httpService = {
   get: http.get,
   post: http.post,
   put: http.put,
   delete: http.delete,
   putch: http.patch,
}

export default httpService