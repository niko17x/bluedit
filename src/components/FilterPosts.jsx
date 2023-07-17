import React from "react";

const FilterPosts = () => {
  return (
    <div className="filter_posts--container">
      <div>
        <img src="assets/rocket.png" alt="rocket icon" />
        <span>Best</span>
      </div>
      <div>
        <img src="assets/fire.png" alt="fire icon" />
        <span>Hot</span>
      </div>
      <div>
        <img src="assets/circle-dashed.png" alt="circle icon" />
        <span>New</span>
      </div>
      <div>
        <img src="assets/arrow.png" alt="arrow icon" />
        <span>Top</span>
      </div>
    </div>
  );
};

export default FilterPosts;
