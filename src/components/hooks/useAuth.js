// Hook to handle all user authentication actions (sign up, log out, etc...).
import { auth } from "../../lib/firebase";
import { closeModal } from "./useModalActions";
import { registerUser, signInUser } from "../utils/manageUserAuth";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useFetchUserDoc as useFetchUserDocument } from "./useFetchData";

// Function to get error message based on error code
const getErrorMessage = (error) => {
  const errorMessages = {
    "auth/email-already-in-use": "Email already in use.",
    "auth/missing-password": "Missing password.",
    "auth/invalid-email": "Invalid email.",
    "auth/weak-password": "Weak password.",
    "auth/user-not-found": "No user found with this email.",
    "auth/wrong-password": "Wrong password.",
    default: "An error occurred.",
  };
  return errorMessages[error.code] || errorMessages.default;
};

// Function to handle actions common to both registration and sign-in
const handleCommonActions = (
  setError,
  error,
  setLogInMod,
  setSignUpMod,
  setUserCredMod
) => {
  setError(getErrorMessage(error));
  console.error(`Error: ${error.code}`, error.message);
  closeModal(setLogInMod, setSignUpMod, setUserCredMod);
  return Promise.reject(error);
};

export const useRegisterUser = async (
  email,
  password,
  username,
  setError,
  setLogInMod,
  setSignUpMod,
  setUserCredMod
) => {
  try {
    const user = await registerUser(email, password, username);
    closeModal(setLogInMod, setSignUpMod, setUserCredMod);
    return user;
  } catch (error) {
    return handleCommonActions(
      setError,
      error,
      setLogInMod,
      setSignUpMod,
      setUserCredMod
    );
  }
};

export const useSignInUser = async (
  email,
  password,
  setError,
  setLogInMod,
  setSignUpMod,
  setUserCredMod
) => {
  try {
    await signInUser(email, password); // <-- This should be the actual sign-in function, as currently it's recursive.
    closeModal(setLogInMod, setSignUpMod, setUserCredMod);
  } catch (error) {
    return handleCommonActions(
      setError,
      error,
      setLogInMod,
      setSignUpMod,
      setUserCredMod
    );
  }
};

export const useSignOutUser = async () => {
  await signOut(auth);
};

// !
export const useFetchUserDoc = (authenticate, setUser, setUsername) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authenticate, async (user) => {
      if (user) {
        setUser(user);
        await useFetchUserDocument(user, setUsername);
      } else {
        setUser(null);
        setUsername(""); // Reset the username to empty string.
      }
    });
    // useEffect cleanup:
    return () => {
      unsubscribe();
      setUsername("");
      setUser(null);
    };
  }, [authenticate, setUser, setUsername]);
};
