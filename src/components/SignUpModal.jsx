import React, { useContext } from "react";
import { DataContext } from "../App";
import useResetErrorTimeout from "./hooks/useResetErrorTimeout";

const SignUpModal = () => {
  const { closeModal, showModal, error, setError, setEmail } =
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
            if (email !== "") {
              showModal("usercred");
            } else {
              setError("Please enter an email.");
              resetErrorTimeout();
            }
          }}
        >
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
              onChange={(e) => {
                // console.log(e.target.value);
                setEmail(e.target.value);
              }}
            ></input>
          </label>
          {error && <div>{error}</div>}
          <button type="submit">Continue</button>
          <div>
            Already a redditor?
            <a
              onClick={(e) => {
                showModal("login");
              }}
            >
              {" "}
              Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
