import React, { createContext } from "react";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import CreatePost from "./components/CreatePost";
import { db, auth } from "./lib/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";

export const DataContext = createContext(); // Out of component to prevent re-renders.

const authenticate = getAuth();
const addPostRef = collection(db, "posts");

function App() {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInModal, setLogInModal] = useState(false);
  const [user, setUser] = useState({}); // Firebase store user object.
  const [logInMod, setLogInMod] = useState(false);
  const [signUpMod, setSignUpMod] = useState(false);
  const [userCredMod, setUserCredMod] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  // Retrieve the current user id from fb auth, matches to id in firestore to obtain user username:
  onAuthStateChanged(authenticate, (user) => {
    console.log("onAuthStateChanged logged.");
    if (!user) {
      return;
    }
    const fetchUserDoc = async () => {
      try {
        const currentUserId = user.uid;
        const docRef = doc(db, "users", currentUserId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        } else {
          console.log("No such doc exists!");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };
    fetchUserDoc();
  });

  // Retrieve the username of the post.

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
    console.log("logout");
    setLogInMod(false);
    setSignUpMod(false);
    setUserCredMod(false);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authenticate, (currentUser) => {
      console.log("log");
      setUser(currentUser);
    });
    // Cleanup on unmount:
    return () => {
      unsubscribe();
      setUsername(null);
    };
  }, [authenticate]);

  const registerUser = async (email, password) => {
    // console.log(email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { username });
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
    console.log("log");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      closeModal();
      return Promise.resolve(user);
      // return user;
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
        // handle more error codes...
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

  const handlePostCreation = (postTitle, postContent, form) => {
    addDoc(addPostRef, {
      createdAt: serverTimestamp(),
      username: username,
      postTitle: postTitle,
      postContent: postContent,
      upVotes: 0,
      downVotes: 0,
      // updatedAt: ,
    })
      .then(() => console.log(username))
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
        user,
        signOutUser,
        signInUser,
        handlePostCreation,
        registerUser,
        signUpMod,
        logInMod,
        userCredMod,
        showModal,
        setEmail,
        setPassword,
        username,
        setUsername,
        email,
        password,
        setError,
        error,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts-page" element={<PostsPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          {/* <Route path="/sign-in" element={<UserSignIn />} /> */}
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
