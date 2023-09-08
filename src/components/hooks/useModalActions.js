// Handle all modal related actions:

export const showModal = (type, setLogInMod, setSignUpMod, setUserCredMod) => {
  if (type === "login") {
    setLogInMod(true);
    setSignUpMod(false);
    setUserCredMod(false);
  } else if (type === "signup") {
    setLogInMod(false);
    setSignUpMod(true);
    setUserCredMod(false);
  } else if (type === "usercred") {
    setLogInMod(false);
    setSignUpMod(false);
    setUserCredMod(true);
  }
};

export const closeModal = (setLogInMod, setSignUpMod, setUserCredMod) => {
  setLogInMod(false);
  setSignUpMod(false);
  setUserCredMod(false);
};
