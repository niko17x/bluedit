import React, { useContext } from "react";
import { DataContext } from "../App";

const UserCred = () => {
  const { closeModal, handleAuth } = useContext(DataContext);

  return (
    <div className="log_in_modal--container">
      <div className="modal show">
        <button className="modal-close" type="button" onClick={closeModal}>
          X
        </button>
        <form className="log_in_form sign_in--form" id="sign_in--form">
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
              type="username"
              name="username"
              id="username"
              placeholder="Username"
            ></input>
          </label>
          <label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            ></input>
          </label>
          <button type="button">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default UserCred;
