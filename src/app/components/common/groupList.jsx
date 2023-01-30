import React from "react";

const GroupList = ({
   items,
   valueProp = "_id",
   contentProp = "name",
   onItemSelect,
   selectedItem,
}) => {
   if (Array.isArray(items)) {
      return (
         <ul className="list-group">
            {items.map((name) => (
               <li
                  className={`list-group-item ${
                     selectedItem === name ? " active" : ""
                  }`}
                  key={name[valueProp]}
                  onClick={() => onItemSelect(name)}
                  role="button"
               >
                  {name[contentProp]}
               </li>
            ))}
         </ul>
      );
   }

   return (
      <ul className="list-group">
         {Object.keys(items).map((name) => (
            <li
               className={`list-group-item ${
                  selectedItem === items[name] ? " active" : ""
               }`}
               key={items[name][valueProp]}
               onClick={() => onItemSelect(items[name])}
               role="button"
            >
               {items[name][contentProp]}
            </li>
         ))}
      </ul>
   );
};

export default GroupList;
