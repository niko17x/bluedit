import React, { useContext } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";

const LogInButton = () => {
  const { user, signOutUser, showModal } = useContext(DataContext);
  return (
    <div className="log_in_button">
      {user ? (
        <>
          <div>{user.email}</div>
          <button className="log_out" type="button" onClick={signOutUser}>
            ⎋ Log Out
          </button>
        </>
      ) : (
        <div>
          <button
            onClick={() => showModal("login")}
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
