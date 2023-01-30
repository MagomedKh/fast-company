import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchField from "../../ui/searchField";
import { useSelector } from "react-redux";
import {
   getProfessions,
   getProfessionsLoadStatus,
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
   const pageSize = 4;
   const users = useSelector(getUsersList());
   const currentUserId = useSelector(getCurrentUserId());
   const professions = useSelector(getProfessions());
   const professionsLoaded = useSelector(getProfessionsLoadStatus());
   const [selectedProf, setSelectedProf] = useState();
   const [currentPage, setCurrentPage] = useState(1);
   const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
   const [searchValue, setSearchValue] = useState("");

   useEffect(() => setCurrentPage(1), [selectedProf, searchValue]);

   const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);

   const handleSort = (item) => {
      setSortBy(item);
   };

   if (users?.length) {
      function filterUsers(data) {
         let filteredUsers;
         if (selectedProf) {
            filteredUsers = data.filter(
               (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf._id)
            );
         } else if (searchValue && searchValue !== "clear") {
            filteredUsers = data.filter((user) =>
               user.name.toLowerCase().includes(searchValue.toLowerCase())
            );
         } else {
            filteredUsers = data;
         }
         return filteredUsers.filter((u) => u._id !== currentUserId);
      }
      const filteredUsers = filterUsers(users);

      const count = filteredUsers.length;
      const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], sortBy.order);
      const userCrop = paginate(sortedUsers, currentPage, pageSize);

      const handleProfessionSelect = (item) => {
         setSelectedProf(item);
         setSearchValue("clear");
      };

      const clearAllFilters = () => {
         setSelectedProf(undefined);
         setSearchValue("clear");
      };

      const handleSearchChange = (value) => {
         setSearchValue(value);

         setSelectedProf(undefined);
      };

      return (
         <div className="d-flex">
            {professions && professionsLoaded && (
               <div className="d-flex flex-column flex-shrink-0 p-3">
                  <GroupList
                     selectedItem={selectedProf}
                     items={professions}
                     onItemSelect={handleProfessionSelect}
                  />
                  <button
                     className="btn btn-secondary mt-2"
                     onClick={() => {
                        clearAllFilters();
                     }}
                  >
                     Сбросить фильтры
                  </button>
               </div>
            )}

            <div className="d-flex flex-column">
               <SearchStatus length={count} />
               <SearchField
                  onSearchChange={handleSearchChange}
                  searchValue={searchValue}
               />
               {count > 0 && (
                  <UserTable
                     users={userCrop}
                     onSort={handleSort}
                     selectedSort={sortBy}
                  />
               )}
               <div className="d-flex justify-content-center">
                  <Pagination
                     itemsCount={count}
                     pageSize={pageSize}
                     currentPage={currentPage}
                     onPageChange={handlePageChange}
                  />
               </div>
            </div>
         </div>
      );
   }
   return <h1>Loading...</h1>;
};

export default UsersListPage;
