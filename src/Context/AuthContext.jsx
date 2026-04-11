import React, { createContext, useContext, useEffect, useState } from "react";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import auth from "./firebase.config";

/* --------------------------------------------------------------
   1️⃣  Create the context – it lives outside of any component.
   -------------------------------------------------------------- */
const AuthContext = createContext(null);

/* --------------------------------------------------------------
   2️⃣  Tiny hook to consume the context safely
   -------------------------------------------------------------- */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};

/* --------------------------------------------------------------
   3️⃣  Provider component – wrap your app with this.
   -------------------------------------------------------------- */
export const AuthProvider = ({ children }) => {
    // ---- Global auth state ------------------------------------------------
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    // ----------------------------------------------------------------------
    // Keep `user` in sync with Firebase (handles page refreshes)
    // ----------------------------------------------------------------------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUserLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // ----------------------------------------------------------------------
    // 1️⃣ Sign‑in with e‑mail + password
    // ----------------------------------------------------------------------
    const loginWithEmailPassword = async (email, password) => {
        setUserLoading(true);
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            setUser(credential.user);
            return credential.user;
        } catch (error) {
            console.error("[Auth] login error:", error);
            throw error; // let UI handle the error (toast, modal, …)
        } finally {
            setUserLoading(false);
        }
    };

    // ----------------------------------------------------------------------
    // 2️⃣ Sign‑up with e‑mail + password
    // ----------------------------------------------------------------------
    const signUpWithEmailPassword = async (email, password) => {
        setUserLoading(true);
        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setUser(credential.user);
            return credential.user;
        } catch (error) {
            console.error("[Auth] sign‑up error:", error);
            throw error;
        } finally {
            setUserLoading(false);
        }
    };

    // ----------------------------------------------------------------------
    // 3️⃣ Continue with Google (OAuth popup)
    // ----------------------------------------------------------------------
    const continueWithGoogle = async () => {
        setUserLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            return result.user;
        } catch (error) {
            console.error("[Auth] Google sign‑in error:", error);
            throw error;
        } finally {
            setUserLoading(false);
        }
    };

    // ----------------------------------------------------------------------
    // 4️⃣ Logout
    // ----------------------------------------------------------------------
    const logout = async () => {
        setUserLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("[Auth] logout error:", error);
            throw error;
        } finally {
            setUserLoading(false);
        }
    };

    // ----------------------------------------------------------------------
    // Context value that every consumer receives
    // ----------------------------------------------------------------------
    const contextValue = {
        user,
        userLoading,
        loginWithEmailPassword,
        signUpWithEmailPassword,
        continueWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

/* --------------------------------------------------------------
   5️⃣  Default export – convenient for `import AuthProvider …`
   -------------------------------------------------------------- */
export default AuthProvider;
