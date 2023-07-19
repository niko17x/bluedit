import React, { useContext } from "react";
import { DataContext } from "../App";

const SignUpModal = () => {
  const { closeModal, handleAuth, showUserCredMod, showLogInMod } =
    useContext(DataContext);

  return (
    <div className="log_in_modal--container">
      <div className="modal show">
        <button className="modal-close" type="button" onClick={closeModal}>
          X
        </button>
        <form className="log_in_form sign_in--form" id="sign_in--form">
          <div className="terms">
            <h2>Sign Up</h2>
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
          <button type="button" onClick={showUserCredMod}>
            Continue
          </button>
          <div>
            Already a redditor?
            <a onClick={showLogInMod}> Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
