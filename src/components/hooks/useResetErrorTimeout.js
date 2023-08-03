import React, { useContext } from "react";
import { DataContext } from "../../App";

// Reset error message on modal after a set amount of time to 'null'.
const useResetErrorTimeout = () => {
  const { setError } = useContext(DataContext);

  const resetErrorTimeout = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return resetErrorTimeout;
};

export default useResetErrorTimeout;
