import React from "react";

const Quality = ({ _id, color, name }) => {
   return (
      <span key={_id} className={`badge bg-${color} m-2`}>
         {name}
      </span>
   );
};

export default Quality;
