import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LogInButton from "./LogInButton";
import LogInModal from "./LogInModal";
import CategoryDropdown from "./CategoryDropdown";
import { DataContext } from "../App";
import SignUpModal from "./SignUpModal";
import UserCred from "./UserCred";
// contains: bluedit icon, homepage, search feature, sign-in feature.

const Navbar = () => {
  const { logInMod, signUpMod, userCredMod } = useContext(DataContext);
  return (
    <div className="navbar--container">
      <div className="navbar--logo">
        <img src="/assets/bluedit_icon.png" alt="logo" />
        <p>bluedit</p>
      </div>
      <div className="navbar--responsive">
        <CategoryDropdown />
        <SearchBar />
        <LogInButton />
        {/* {logInMod ? <LogInModal /> : ""} */}
        {logInMod && <LogInModal />}
        {signUpMod && <SignUpModal />}
        {userCredMod && <UserCred />}
      </div>
    </div>
  );
};

export default Navbar;
