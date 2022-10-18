// Next
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
// Firebase
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase-config";

// React Context
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    // Router
    const router = useRouter()
    // Global User
    const [globalUser, setGlobalUser] = useState(null)
    // Controller states inside Global
    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser) {
        // Session Started
        setGlobalUser(currentUser)
        } else {
        // No Session
        setGlobalUser(null)
        }
    })

    // Logout Function
    function logout() {
        signOut(auth)
        .then(() => {
          router.push('/login')
        })
        .catch((error) => {
          console.log("Error:", error.message)
        })
    }

    return (
        <userAuthContext.Provider
        value={{ globalUser, logout }}
        >
        {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}