import React, { useContext } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";

const LogInButton = () => {
  const { user, handleSignOutUser, handleShowModal, username } =
    useContext(DataContext);
  return (
    <div className="log_in_button">
      {user ? (
        <>
          <div>{username}</div>
          <button className="log_out" type="button" onClick={handleSignOutUser}>
            ⎋ Log Out
          </button>
        </>
      ) : (
        <div>
          <button
            onClick={() => handleShowModal("login")}
            className="log_in"
            type="button"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default LogInButton;
