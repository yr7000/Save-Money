import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCacelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, userName) => {
    setError(null);
    setIsPending(true);
    try {
      // sign up the user with the firebase inbuilt function
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete the signup");
      }
      // add display name to user
      await res.user.updateProfile({ displayName: userName });
      // we will call the dispatch function to update the state of the user
      dispatch({ type: "login", payload: res.user });
      if (!isCacelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, signup };
};
