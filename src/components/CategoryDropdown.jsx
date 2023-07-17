import React from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = () => {
  return (
    <div className="category_dropdown--container">
      <select id="main_categories">
        <option value="popular">Popular</option>
        <option value="home">Home</option>
      </select>
    </div>
  );
};

export default CategoryDropdown;
