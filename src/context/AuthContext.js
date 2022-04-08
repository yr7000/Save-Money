import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { projectAuth } from "../firebase/config";

// creating a context which provides various states and functions
// to the components that the context api has wrapped
export const AuthContext = createContext();

// reducer function that is responsible for these global state updates
export const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "authReady":
      return { ...state, authIsReady: true, user: action.payload };
    case "changeTheme":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

// when we dispatch (request to change the state), reducer function is invoked.

// auth context provider providing the states and functions to the children(wrapped components)
export const AuthContextProvider = ({ children }) => {
  // creating a useReducer hooks.
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    theme: "light",
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "authReady", payload: user });
      unsub();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
