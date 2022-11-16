import React, { useState } from "react";
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'


const App = () => {
   const [users, setUsers] = useState(api.users.fetchAll());

   const handleDelete = (userId) => {
      setUsers(users.filter((user) => user._id !== userId));
   };

   const handleToggleBookMark = (userId) => {
      setUsers(
         users.map(user => {
            if (user._id === userId) {
               return {...user, bookmark: !user.bookmark}
            } 
            return user
         })
      )
   };

   return (
      <>
         <SearchStatus length={users.length} />
         <Users onDelete={handleDelete} users={users} onToggleBookMark={handleToggleBookMark}  />
      </>
   );
};

export default App;