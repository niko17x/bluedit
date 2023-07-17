import React from "react";

const SidebarActions = () => {
  return (
    <div className="sidebar_actions--container">
      <img src="assets/planets.jpeg" alt="planets image" />
      <div className="content">
        <div className="header">
          <img src="assets/reddit.png" alt="bluedit icon" />
          <span>Home</span>
        </div>
        <div className="body">
          Your personal Bluedit frontpage. Come here to check in with your
          favorite communities.
        </div>
      </div>
      <div className="divider"></div>
      <div className="footer">
        <button type="button">Create Post</button>
        <button type="button">Create Community</button>
      </div>
    </div>
  );
};

export default SidebarActions;
