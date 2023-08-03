import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import useResetErrorTimeout from "./hooks/useResetErrorTimeout";

const LogInModal = () => {
  const { closeModal, showModal, setEmail, setPassword, signInUser, error } =
    useContext(DataContext);
  const resetErrorTimeout = useResetErrorTimeout();

  return (
    <div className="log_in_modal--container">
      <div className="modal show">
        <button className="modal-close" type="button" onClick={closeModal}>
          X
        </button>
        <form
          className="log_in_form sign_in--form"
          id="sign_in--form"
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;
            signInUser(email, password).catch(() => resetErrorTimeout());
          }}
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
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
          <label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          {error && <div>{error}</div>}
          <div>
            Forgot your
            <a> username </a>
            or
            <a> password</a>?
          </div>
          <button type="submit">Log In</button>
          <div>
            New to Bluedit?
            <a onClick={() => showModal("signup")}> Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInModal;
