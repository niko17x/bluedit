import React, { useContext } from "react";
import { DataContext } from "../App";
import useResetErrorTimeout from "./hooks/useResetErrorTimeout";

const UserCred = () => {
  const {
    handleRegisterUser,
    handleCloseModal,
    setPassword,
    setUsername,
    email,
    error,
    password,
  } = useContext(DataContext);
  const resetErrorTimeout = useResetErrorTimeout();

  return (
    <div className="log_in_modal--container">
      <div className="modal show">
        <button
          className="modal-close"
          type="button"
          onClick={handleCloseModal}
        >
          X
        </button>
        <form
          className="log_in_form sign_in--form"
          id="sign_in--form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegisterUser(email, password).catch(() =>
              resetErrorTimeout()
            );
          }}
        >
          <div className="terms">
            <h2>Create your username and password</h2>
            <p>
              Bluedit is anonymous, so your username is what you&apos;ll go by
              here. Choose wisely - because once you get a name, you can&apos;t
              change it.
            </p>
          </div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </label>
          <label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
          {error && <div>{error}</div>}
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default UserCred;
