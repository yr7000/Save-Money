import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7N3UrKpSnCNM2nxxjHA5rUFmThlCdjdc",
  authDomain: "savemoney-c9ddf.firebaseapp.com",
  projectId: "savemoney-c9ddf",
  storageBucket: "savemoney-c9ddf.appspot.com",
  messagingSenderId: "762827051357",
  appId: "1:762827051357:web:58ef43bbd4672b9457d8b4",
};

firebase.initializeApp(firebaseConfig);

const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFireStore, projectAuth, timestamp };
