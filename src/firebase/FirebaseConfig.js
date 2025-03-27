import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const FirebaseConfig = {
  apiKey: "AIzaSyDbp4NqAvmQZ_mXmdJRVJSYl4ZZYuInGlw",
  authDomain: "irctc-1857d.firebaseapp.com",
  projectId: "irctc-1857d",
  storageBucket: "irctc-1857d.appspot.com",
  messagingSenderId: "792185282677",
  appId: "1:792185282677:web:aa46d731224c29ac43183c"
};

const app = initializeApp(FirebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth};
