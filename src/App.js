import React, { createContext } from "react";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import DisplayDetailedPost from "./pages/DisplayDetailedPost";
import CreatePost from "./components/CreatePost";
import { fetchPosts } from "./components/utils/fetchPosts";
import { db, auth } from "./lib/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { fetchComments } from "./components/utils/fetchComments";
import deleteCommentsOnPost from "./components/utils/deleteCommentsOnPost";

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

  // Retrieve the current user id from fb auth, matches to id in firestore to obtain user username:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authenticate, (user) => {
      if (user) {
        setUser(user);
        const fetchUserDoc = async () => {
          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUsername(docSnap.data().username);
            }
            // Set the username here
            else {
              console.log(
                "Issue fetching user. Check FB authentication users. Username may have been deleted from database."
              );
            }
          } catch (error) {
            console.error("Error fetching user document:", error);
          }
        };
        fetchUserDoc();
      } else {
        setUser(null);
        setUsername(""); // Reset the username to empty string.
      }
    });
    return () => {
      unsubscribe();
      setUsername("");
      setUser(null);
    };
  }, [authenticate]);

  const deletePost = async (id) => {
    try {
      const postRef = doc(db, "posts", id);
      await deleteCommentsOnPost(id);
      await deleteDoc(postRef);
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
      console.log("Post has been successfully delete.");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserPostVotesId = async (pageId) => {
    try {
      const postVotesIdRef = doc(
        db,
        `users/${authenticate.currentUser.uid}/postVotes/${pageId}`
      );
      await deleteDoc(postVotesIdRef);
      console.log("User postVotes ID deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostDeletion = async (pageId) => {
    deletePost(pageId);
    deleteUserPostVotesId(pageId);
  };

  const handlePostCreation = async (postTitle, postBody, form) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await addDoc(addPostRef, {
        userDisplayText: "",
        username: username,
        userId: user.uid,
        title: postTitle,
        body: postBody,
        numberOfComments: 0,
        voteStatus: 0,
        currentUserVoteStatus: {
          id: "",
          voteValue: 0,
        },
        imageURL: "",
        postIdx: "",
        createdAt: serverTimestamp(),
        editedAt: "",
      });
      form.reset();
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
      console.log("Post has been successfully created.");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const showModal = (type) => {
    if (type === "login") {
      setLogInMod(true);
      setSignUpMod(false);
      setUserCredMod(false);
    } else if (type === "signup") {
      setLogInMod(false);
      setSignUpMod(true);
      setUserCredMod(false);
    } else if (type === "usercred") {
      setLogInMod(false);
      setSignUpMod(false);
      setUserCredMod(true);
    }
  };

  const closeModal = () => {
    setLogInMod(false);
    setSignUpMod(false);
    setUserCredMod(false);
  };

  // Retreive and store "posts" from FB to useState:
  useEffect(() => {
    const fetchData = async () => {
      const getPosts = await fetchPosts();
      setPosts(getPosts);
    };
    fetchData();
  }, [forceRender]);

  useEffect(() => {
    const fetchData = async () => {
      const getComments = await fetchComments();
      setComments(getComments);
    };
    fetchData();
  }, [forceRender]);

  const registerUser = async (email, password) => {
    // console.log(email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username,
      });
      closeModal();
      return user;
    } catch (error) {
      let message;
      switch (error.code) {
        case "auth/email-already-in-use":
          break;
        case "auth/missing-password":
          break;
        case "auth/invalid-email":
          break;
        case "auth/weak-password":
          break;
        default:
          message = "Error occurred during register.";
      }
      setError(message);
      console.error(`Error: ${error.code}`, error.message);
      return Promise.reject(error);
      // throw error;
    }
  };

  const signInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      closeModal();
      return Promise.resolve(user);
    } catch (error) {
      let message;
      switch (error.code) {
        case "auth/user-not-found":
          message = "No user found with this email.";
          break;
        case "auth/wrong-password":
          message = "Wrong password.";
          break;
        case "auth/invalid-email":
          message = "Email address is not valid.";
          break;
        default:
          message = "An error occurred.";
          break;
      }
      setError(message);
      console.log(`Error: ${error.code}`);
      return Promise.reject(error);
      // throw error;
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
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
        closeModal,
        handlePostCreation,
        handlePostDeletion,
        signOutUser,
        signInUser,
        registerUser,
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
