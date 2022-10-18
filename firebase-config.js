import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4FltO7mIBBLZKdHuq96wuBnnLHAWo6NM",
  authDomain: "virgo-anotador-pro.firebaseapp.com",
  projectId: "virgo-anotador-pro",
  storageBucket: "virgo-anotador-pro.appspot.com",
  messagingSenderId: "159873162284",
  appId: "1:159873162284:web:6422c41f36f1890b054589"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Auth
export const auth = getAuth(app);
// Firestore
export const db = getFirestore(app)