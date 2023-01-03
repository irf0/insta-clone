import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState("");

  //1.Signup functionality
  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password);
  // }

  //2.Login functionality
  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password);
  // }

  //3.Logout functionality
  function logout() {
    return auth.signOut(); //--> Log Out btn is given inside Home Page
  }

  //4.Reset Password functionality
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  //5.Setting the new user as the current user
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((newUser) => {
  //     newUser.updateProfile({
  //       displayName: "",
  //     });
  //     setCurrentUser(newUser);
  //     console.log(newUser);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    // currentUser,
    // signup,
    // login,
    logout,
    resetPassword,
    // setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
