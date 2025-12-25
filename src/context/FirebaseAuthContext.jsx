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

// Helper function to get user-friendly error messages
const getFirebaseErrorMessage = (error) => {
  const errorCode = error.code;
  
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead or use a different email.";
    case "auth/invalid-email":
      return "Invalid email address. Please check and try again.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled. Please contact support.";
    case "auth/weak-password":
      return "Password is too weak. Please use a stronger password.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/user-not-found":
      return "No account found with this email. Please sign up first.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-credential":
      return "Invalid email or password. Please check your credentials.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed. Please try again.";
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled. Please try again.";
    default:
      return error.message || "An error occurred. Please try again.";
  }
};

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
      const friendlyMessage = getFirebaseErrorMessage(error);
      return { success: false, error: friendlyMessage };
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
      const friendlyMessage = getFirebaseErrorMessage(error);
      return { success: false, error: friendlyMessage };
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
      const friendlyMessage = getFirebaseErrorMessage(error);
      return { success: false, error: friendlyMessage };
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
