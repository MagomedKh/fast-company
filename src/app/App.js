import React, { useState } from "react";
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

const App = () => {
   const [users, setUsers] = useState(api.users.fetchAll());

   const handleDelete = (userId) => {
      setUsers(users.filter((user) => user._id !== userId));
   };

   const handleToggleBookMark = (userId) => {};

   const renderPhrase = (num) => {
      const quantity =
         (num < 10 || num > 20) &&
         (num % 10 === 2 || num % 10 === 3 || num % 10 === 4)
            ? `${num} Человека тусанут`
            : `${num} Человек тусанет`;

      return (
         <h1>
            <span
               className={`badge m-3 bg-${num === 0 ? "danger" : "primary"}`}
            >
               {num === 0
                  ? "Никто с тобой не тусанет"
                  : `${quantity} с тобой сегодня`}
            </span>
         </h1>
      );
   };

   return (
      <>
         {renderPhrase(users.length)}

         {users.length > 0 && (
            <table className="table" id="table">
               <thead>
                  <tr>
                     <th scope="col">Имя</th>
                     <th scope="col">Качества</th>
                     <th scope="col">Профессия</th>
                     <th scope="col">Встретился, раз</th>
                     <th scope="col">Оценка</th>
                     <th scope="col" />
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <tr key={user._id}>
                        <th className="col-3">{user.name}</th>
                        <td className="col-3">
                           {user.qualities.map((quality) => (
                              <span
                                 key={quality._id}
                                 className={`badge bg-${quality.color} m-2`}
                              >
                                 {quality.name}
                              </span>
                           ))}
                        </td>
                        <td className="col">{user.profession.name}</td>
                        <td className="col">{user.completedMeetings}</td>
                        <td className="col">{user.rate} / 5</td>
                        <td className="col">
                           <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(user._id)}
                           >
                              Удалить
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </>
   );
};

export default App;