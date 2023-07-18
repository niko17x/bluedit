import React, { useContext } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";

const LogInButton = () => {
  const { user, signOutUser, openModal } = useContext(DataContext);
  return (
    <div className="log_in_button">
      {/* {user ? (
        <>
          <div>{user.email}</div>
          <button className="log_out" type="button" onClick={signOutUser}>
            ⎋ Log Out
          </button>
        </>
      ) : (
        <div>
          <button onClick={openModal} className="log_in" type="button">
            Log In
          </button>
        </div>
      )} */}
      <button type="button" onClick={openModal}>
        Click me
      </button>
    </div>
  );
};

export default LogInButton;
