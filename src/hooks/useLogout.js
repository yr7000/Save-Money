import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // try sign the user out
    try {
      await projectAuth.signOut();
      dispatch({ type: "logout" });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  // clean up function helps to avoid state updates when a component unmounts
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { isPending, error, logout };
};
