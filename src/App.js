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

// Firebase authentication:
const authenticate = getAuth();

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
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  // Firebase references:
  const addPostRef = collection(db, "posts");
  // Retrieve username from currently logged in user:
  onAuthStateChanged(authenticate, (user) => {
    if (!user) {
      console.log("No user currently logged in.");
      setUserId(null);
      return;
    }
    const fetchUserDoc = async () => {
      try {
        const currentUserId = user.uid;
        const docRef = doc(db, "users", currentUserId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserId(docSnap.data().username);
          console.log(
            `User ID: ${docSnap.id}, Username: ${docSnap.data().username}`
          );
        } else {
          console.log("No such doc exists!");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };
    fetchUserDoc();
  });

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
      setUser(currentUser);
    });
    // Cleanup on unmount:
    return () => {
      unsubscribe();
    };
  }, [authenticate]);

  const registerUser = async (email, password) => {
    console.log(email, password);
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
        setUsername,
        email,
        password,
        setError,
        error,
        userId,
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
