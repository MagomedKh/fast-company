import React from "react";

const SearchStatus = ({ length }) => {
   const quantity =
      (length < 10 || length > 20) &&
      (length % 10 === 2 || length % 10 === 3 || length % 10 === 4)
         ? `${length} Человека тусанут`
         : `${length} Человек тусанет`;

   return (
      <h1>
         <span
            className={`badge m-3 bg-${length === 0 ? "danger" : "primary"}`}
         >
            {length === 0
               ? "Никто с тобой не тусанет"
               : `${quantity} с тобой сегодня`}
         </span>
      </h1>
   );
};

export default SearchStatus;
