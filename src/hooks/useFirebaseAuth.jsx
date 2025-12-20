import { useContext } from "react";
import { FirebaseAuthContext } from "../context/FirebaseContext";

console.log("useFirebaseAuth hook loaded");

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error("useFirebaseAuth must be used within an AuthProvider");
  }
  return context;
};
