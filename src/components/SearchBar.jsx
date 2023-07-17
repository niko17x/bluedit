import React from "react";

const SearchBar = ({ handleChange, handleClick }) => {
  return (
    <form className="search_bar--form">
      <label>
        <input
          type="text"
          placeholder="Search Bluedit"
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default SearchBar;
