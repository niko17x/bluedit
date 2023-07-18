import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

const LogInModal = () => {
  const { registerUser, signInUser, signOutUser, user, showSignUpMod } =
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

  const { closeModal } = useContext(DataContext);
  return (
    <div className="log_in_modal--container">
      <div className="modal show">
        <button className="modal-close" type="button" onClick={closeModal}>
          X
        </button>
        <form
          className="log_in_form sign_in--form"
          id="sign_in--form"
          onSubmit={(e) => handleAuth(e, false)}
        >
          <div className="terms">
            <h2>Log in</h2>
            <p>
              By continuing, you are setting up a Bluedit account and agree to
              our
              <a href=""> User Agreement </a>
              and
              <a href=""> Privacy Policy</a>.
            </p>
          </div>
          <div className="o_auth_log_in">
            <div>Continue with Google</div>
            <div>Continue with Apple</div>
          </div>
          <div className="line_break">OR</div>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="EMAIL"
            ></input>
          </label>
          <label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="PASSWORD"
            ></input>
          </label>
          <div>
            Forgot your
            <a> username </a>
            or
            <a> password</a>?
          </div>
          <button type="submit">Log In</button>
          <div>
            New to Bluedit?
            {/* <Link to="/sign-up-modal">Sign Up</Link> */}
            <span onClick={showSignUpMod}> Sign Up</span>
          </div>
        </form>
      </div>
    </div>
  );

  //   <div>
  //   <form
  //     className="sign_in--form"
  //     id="sign_in--form"
  //     onSubmit={(e) => handleAuth(e, false)}
  //   >
  //     <label htmlFor="email" />
  //     <input type="email" name="email" id="email" placeholder="email"></input>

  //     <label htmlFor="password" />
  //     <input
  //       type="password"
  //       placeholder="password"
  //     ></input>

  //     <button type="submit">Create Account</button>

  //     <button type="button" onClick={(e) => handleAuth(e, true)}>
  //       {user ? (user.email ? "Sign Out" : "Sign In") : "Sign In"}
  //     </button>

  //   </form>
  //   <div>{user && user.email ? user.email : "No User Logged In"}</div>
  // </div>
};

export default LogInModal;
