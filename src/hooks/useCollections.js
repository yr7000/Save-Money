import { useEffect, useState, useRef } from "react";
import { projectFireStore } from "../firebase/config";

export const useCollections = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let collectionRefernce = projectFireStore.collection(collection);
    if (query) {
      collectionRefernce = collectionRefernce.where(...query);
    }
    if (orderBy) {
      collectionRefernce = collectionRefernce.orderBy(...orderBy);
    }
    const unsub = collectionRefernce.onSnapshot(
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(result);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unsub();
  }, [collection, query]);

  return { documents, error };
};
