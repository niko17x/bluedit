import React, { useContext } from "react";
import { DataContext } from "../App";

const UserSignIn = () => {
  const { registerUser, signInUser, signOutUser, user } =
    useContext(DataContext);

  const handleAuth = (e, isSignIn = false) => {
    e.preventDefault();
    let email, password;

    if (e.target.tagName === "FORM") {
      // Check if it's a form submission event => 'e' is referring to the form itself so it there must be differentiation between the button for form submission and button for 'sign in / sign out'.
      email = e.target.elements.email.value;
      password = e.target.elements.password.value;
    } else {
      // It's a button click event => select and store values for both email and password.
      email = document.querySelector("#email").value;
      password = document.querySelector("#password").value;
    }

    if (user && isSignIn) {
      // if user is signed in and isSignIn is true
      signOutUser(); // sign out the user
    } else if (isSignIn && email) {
      console.log("logged");
      signInUser(email, password);
    } else {
      registerUser(email, password);
    }

    // Reset email and password values:
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
    console.log("Logged In");
  };

  return (
    <div>
      <form
        className="sign_in--form"
        id="sign_in--form"
        onSubmit={(e) => handleAuth(e, false)}
      >
        <label htmlFor="email" />
        <input type="email" name="email" id="email" placeholder="email"></input>
        <label htmlFor="password" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        ></input>
        <button type="submit">Create Account</button>
        <button type="button" onClick={(e) => handleAuth(e, true)}>
          {user ? (user.email ? "Sign Out" : "Sign In") : "Sign In"}
        </button>
      </form>
      <div>{user && user.email ? user.email : "No User Logged In"}</div>
    </div>
  );
};

export default UserSignIn;

// Todo: 'email' can not be read properly and is causing issues of user sign-in in Firebase.
