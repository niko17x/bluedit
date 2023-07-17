import React, { useState, useEffect, useContext } from "react";
import { Post } from "../components/Post";
import Navbar from "../components/Navbar";
import CreatePostInput from "../components/CreatePostInput";
import SidebarTryPremium from "../components/SidebarTryPremium";
import FilterPosts from "../components/FilterPosts";
import SidebarActions from "../components/SidebarActions";
import SidebarTC from "../components/SidebarTC";
import { DataContext } from "../App";
import UserSignIn from "../components/UserSignIn";

const HomePage = () => {
  const { loggedIn, setLogInModal, posts, signOutUser } =
    useContext(DataContext);
  return (
    <>
      <Navbar
        isLoggedIn={loggedIn}
        // closeModal={}
        // openModal={}
        logInModal={loggedIn}
        setLogInModal
        signOutUser={signOutUser}
      />
      <div className="main_content">
        <div className="main_posts">
          <CreatePostInput />
          <FilterPosts />
          <Post getPosts={posts} />
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
