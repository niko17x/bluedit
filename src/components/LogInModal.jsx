import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

const LogInModal = () => {
  const { closeModal } = useContext(DataContext);
  return (
    <div className="log_in_modal--container">
      <div className="modal show">
        <button className="modal-close" type="button" onClick={closeModal}>
          X
        </button>
        <form className="log_in_form">
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
          <label>
            <input placeholder="USERNAME"></input>
          </label>
          <label>
            <input placeholder="PASSWORD"></input>
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
            <Link to={"sign-in"}> SIGN UP</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInModal;
