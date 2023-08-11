import React, { useState, useEffect, useContext } from "react";
import { AllPosts } from "../components/AllPosts";
import Navbar from "../components/Navbar";
import CreatePostInput from "../components/CreatePostInput";
import SidebarTryPremium from "../components/SidebarTryPremium";
import FilterPosts from "../components/FilterPosts";
import SidebarActions from "../components/SidebarActions";
import SidebarTC from "../components/SidebarTC";
import { DataContext } from "../App";

const HomePage = () => {
  const { user } = useContext(DataContext);
  return (
    <>
      <Navbar />
      <div className="main_content">
        <div className="main_posts">
          {user ? <CreatePostInput /> : null}
          <FilterPosts />
          <AllPosts />
        </div>
        <div className="main_sidebar">
          <SidebarTryPremium />
          <SidebarActions />
          <SidebarTC />
        </div>
      </div>
    </>
  );
};

export default HomePage;
