import React, { createContext } from "react";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import CreatePost from "./components/CreatePost";
import SignUp from "./components/SignUp";
import UserSignIn from "./components/UserSignIn";
import { db, auth } from "./lib/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  orderBy,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

export const DataContext = createContext();

function App() {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInModal, setLogInModal] = useState(false);
  const [user, setUser] = useState({}); // Firebase store user object.

  // Firebase references:
  const addPostRef = collection(db, "posts");
  // Firebase authentication:
  const auth = getAuth();

  const authChange = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // do something with user, or return it
      console.log(user.uid);
      return user;
    } catch (error) {
      console.error(`Error: ${error.code}`, error.message);
      throw error;
    }
  };

  const signInUser = async (email, password) => {
    console.log("log");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.log(`Error: ${error.code}`, error.message);
      throw error;
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const fetchData = async () => {
      const que = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(que);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    };
    fetchData();
  }, []);

  const closeModal = (e) => {
    e.preventDefault();
    setLogInModal(false);
  };

  const openModal = (e) => {
    e.preventDefault();
    setLogInModal(true);
  };

  const handlePostCreation = (postTitle, postContent, form) => {
    addDoc(addPostRef, {
      createdAt: serverTimestamp(),
      postTitle: postTitle,
      postContent: postContent,
      upVotes: 0,
      downVotes: 0,
      // updatedAt: ,
    })
      .then(() => form.reset())
      .then(() => console.log("Successfully added new document."))
      .catch(() => console.log("Error in submitting form."));
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        loggedIn,
        logInModal,
        setLogInModal,
        closeModal,
        openModal,
        user,
        signOutUser,
        signInUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage isLoggedIn={loggedIn} signOutUser={signOutUser} />
            }
          />
          <Route path="/posts-page" element={<PostsPage getPost={posts} />} />
          <Route
            path="/create-post"
            element={<CreatePost submitPost={handlePostCreation} />}
          />
          <Route path="/sign-in" element={<UserSignIn />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
