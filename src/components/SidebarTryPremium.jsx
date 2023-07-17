import React from "react";

const SidebarTryPremium = () => {
  return (
    <div className="SidebarTryPremium--container">
      <div className="content">
        <img
          src="assets/shield.png"
          alt="bluedit premium image"
          style={{ height: "35px" }}
        />
        <div>
          <div>Bluedit Premium</div>
          <div>The best Bluedit experience, with monthly coins</div>
        </div>
      </div>
      <button role="button">Try Now</button>
    </div>
  );
};

export default SidebarTryPremium;
