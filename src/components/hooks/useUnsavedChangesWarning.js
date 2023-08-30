// When "title" or "content" states true and refresh event is invoked, a warning dialog appears.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useUnsavedChangesWarning = (condition) => {
  // console.log("useUnsavedChangesWarning");
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (location.pathname !== "/create-post" && condition) console.log("log");
    };
  }, [location, condition]);

  useEffect(() => {
    const beforeunloadHandler = (e) => {
      if (condition) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", beforeunloadHandler, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", beforeunloadHandler, {
        capture: true,
      });
    };
  }, [condition]);
};

export default useUnsavedChangesWarning;
