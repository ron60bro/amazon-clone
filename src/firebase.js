import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
  } from "firebase/auth";
  // import { getFirestore, addDoc, collection } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9Oq-kqsZXR3YcCwQEAPmbGq9lGq3Be7U",
    authDomain: "challenge-5cff0.firebaseapp.com",
    projectId: "challenge-5cff0",
    storageBucket: "challenge-5cff0.appspot.com",
    messagingSenderId: "177795368530",
    appId: "1:177795368530:web:57985418b2534433d5818b",
    measurementId: "G-58ZJ95KP34"
  };

  const firebaseApp=initializeApp(firebaseConfig)

  const db=getFirestore(firebaseApp);
  const auth=getAuth(firebaseApp);

  export {db,auth}