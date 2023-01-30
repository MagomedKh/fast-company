import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
   return (
      <table className="table" id="table">
         {children || (
            <>
               <TableHeader {...{ onSort, selectedSort, columns }} />
               <TableBody {...{ columns, data }} />
            </>
         )}
      </table>
   );
};

export default Table;
