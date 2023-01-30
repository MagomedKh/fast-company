import React from "react";
import { Route, Routes } from "react-router-dom";

import Users from './layouts/users'
import Login from './layouts/login'
import Main from './layouts/main'
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
   return (
      <>
         <AppLoader>
            <NavBar />
            <Routes>
               <Route index element={<Main />} />
            </Routes>
            <Routes>
               <Route path="/login" element={<Login />} >
                  <Route path=":type" element={<Login />} />
               </Route>
               <Route path="/users/*" element={<Users />} />
               <Route path="/logout" element={<LogOut />} />
            </Routes>
            <ToastContainer />
         </AppLoader>
      </>)
};

export default App;