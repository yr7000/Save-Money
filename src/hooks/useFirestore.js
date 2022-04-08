import { useReducer, useState, useEffect } from "react";
import { projectFireStore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "isPending":
      return { document: null, isPending: true, success: false, error: null };
    case "addDoc":
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case "deleteDoc":
      return {
        document: null,
        isPending: false,
        success: true,
        error: null,
      };
    case "error":
      return {
        isPending: false,
        error: action.payload,
        success: false,
        document: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const collectionRef = projectFireStore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const documentRef = await collectionRef.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "addDoc", payload: documentRef });
    } catch (err) {
      dispatchIfNotCancelled({ type: "error", payload: err.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "isPending" });
    try {
      await collectionRef.doc(id).delete();
      dispatchIfNotCancelled({
        type: "deleteDoc",
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "error", payload: error.message });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
