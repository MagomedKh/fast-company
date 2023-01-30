import React from "react";

const TableHeader = ({ selectedSort, onSort, columns }) => {
   const handleSort = (item) => {
      if (selectedSort.path === item) {
         onSort(() => ({
            ...selectedSort,
            order: selectedSort.order === "asc" ? "desc" : "asc",
         }));
      } else {
         onSort({ path: item, order: "asc" });
      }
   };

   const changeSortArrow = (selectedSort, currentPath) => {
      if (!(selectedSort.path === currentPath)) return;

      return selectedSort.order === "asc" ? (
         <i className="bi bi-caret-down-fill"></i>
      ) : (
         <i className="bi bi-caret-up-fill"></i>
      );
   };

   return (
      <thead>
         <tr>
            {Object.keys(columns).map((column) => (
               <th
                  key={column}
                  onClick={() =>
                     columns[column].path
                        ? handleSort(columns[column].path)
                        : null
                  }
                  {...{ role: columns[column].path && "button" }}
                  scope="col"
               >
                  {columns[column].name}
                  {columns[column].path &&
                     changeSortArrow(selectedSort, columns[column].path)}
               </th>
            ))}
         </tr>
      </thead>
   );
};

export default TableHeader;
