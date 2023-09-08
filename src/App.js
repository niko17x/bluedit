import React, { createContext } from "react";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import { showModal, closeModal } from "./components/hooks/useModalActions";
import { useFetchData } from "./components/hooks/useFetchData";
import DisplayDetailedPost from "./pages/DisplayDetailedPost";
import CreatePost from "./components/CreatePost";
import {
  useRegisterUser,
  useSignInUser,
  useSignOutUser,
  useFetchUserDoc,
} from "./components/hooks/useAuth";
import {
  deletePost,
  deleteUserPostVotesId,
  postCreation,
} from "./components/utils/postActions";
import { db } from "./lib/firebase";
import { getAuth } from "firebase/auth";
import { collection } from "firebase/firestore";

export const DataContext = createContext(); // Out of component to prevent re-renders.

const authenticate = getAuth();
const addPostRef = collection(db, "posts");

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [logInModal, setLogInModal] = useState(false);
  const [user, setUser] = useState({}); // Firebase store user object.
  const [logInMod, setLogInMod] = useState(false);
  const [signUpMod, setSignUpMod] = useState(false);
  const [userCredMod, setUserCredMod] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [forceRender, setForceRender] = useState(0);
  const [commentId, setCommentId] = useState("");

  console.log("Log - App.js");

  useFetchUserDoc(authenticate, setUser, setUsername);

  useFetchData(setPosts, forceRender, "posts");
  useFetchData(setComments, forceRender, "comments");

  const handlePostDeletion = async (pageId) => {
    deletePost(pageId, setPosts);
    deleteUserPostVotesId(authenticate, pageId);
  };

  const handlePostCreation = async (postTitle, postBody, form) => {
    postCreation(
      postTitle,
      postBody,
      form,
      setPosts,
      username,
      user,
      addPostRef
    );
  };

  const handleShowModal = (type) => {
    showModal(type, setLogInMod, setSignUpMod, setUserCredMod);
  };

  const handleCloseModal = () => {
    closeModal(setLogInMod, setSignUpMod, setUserCredMod);
  };

  const handleRegisterUser = async (email, password) => {
    useRegisterUser(
      email,
      password,
      username,
      setError,
      setLogInMod,
      setSignUpMod,
      setUserCredMod
    );
  };

  const handleSignInUser = async (email, password) => {
    useSignInUser(
      email,
      password,
      setError,
      setLogInMod,
      setSignUpMod,
      setUserCredMod
    );
  };

  const handleSignOutUser = async (auth) => {
    useSignOutUser(auth);
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        logInModal,
        email,
        password,
        user,
        signUpMod,
        logInMod,
        userCredMod,
        username,
        error,
        title,
        body,
        forceRender,
        comments,
        setComments,
        setLogInModal,
        handlePostCreation,
        handlePostDeletion,
        showModal,
        setEmail,
        setPassword,
        setUsername,
        setError,
        setTitle,
        setBody,
        setForceRender,
        commentId,
        setCommentId,
        handleShowModal,
        handleCloseModal,
        handleRegisterUser,
        handleSignInUser,
        handleSignOutUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:pageId" element={<DisplayDetailedPost />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
