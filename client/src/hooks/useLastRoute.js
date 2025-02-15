import { useEffect } from "react";

const useLastRoute = (location, isAuthenticated) => {
  useEffect(() => {
    if (isAuthenticated) {
      try {
        localStorage.setItem("lastRoute", location);
      } catch (e) {
        console.error("Error saving last route to localStorage:", e);
      }
    }
  }, [location]);
};

export default useLastRoute;
