import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { FirebaseAuthContext } from "./FirebaseContext";

console.log("FirebaseAuthContext loaded");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser);
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  const signup = async (email, password, name) => {
    console.log("Attempting to sign up with:", { email, name });
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Firebase signup result:", result);

      await updateProfile(result.user, {
        displayName: name,
      });

      console.log("Profile updated successfully");
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Firebase signup error:", error);
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    console.log("Attempting to log in with:", email);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase login result:", result);
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Firebase login error:", error);
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    console.log("Attempting Google login");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login result:", result);
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Google login error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    console.log("Attempting to log out");
    try {
      await signOut(auth);
      console.log("Logout successful");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
