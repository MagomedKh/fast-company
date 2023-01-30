import { useEffect } from "react";
import { useState } from "react";

const SearchField = ({ onSearchChange, searchValue }) => {
   const [inputValue, setInputValue] = useState("");
   let followingValue = searchValue;
   useEffect(() => {
      if (searchValue === "clear" && inputValue) {
         setInputValue("");
      }
   }, [followingValue]);

   const handleSearchField = (e) => {
      setInputValue(e.target.value);
      onSearchChange(e.target.value);
   };

   return (
      <input
         className="search w-100"
         type="text"
         onChange={handleSearchField}
         value={inputValue}
         placeholder="Search..."
      />
   );
};

export default SearchField;
