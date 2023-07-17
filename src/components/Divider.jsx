import React from "react";

const Divider = () => {
  return (
    <div className="divider--container">
      <div className="sort">
        <div>Sort by:</div>
        <select id="sort_comments">
          <option value="best">🚀 Best</option>
          <option value="popular">🌟 Popular</option>
        </select>
        <div className="divider_border"></div>
        <div className="comment_count">
          <div>
            6.5k
            <span>comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divider;
