"use client";

import { auth } from "@/utils/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  validatePassword,
} from "firebase/auth";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface UserContextProps {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  registerUser: (email: string, senha: string) => Promise<void>;
  loginUser: (email: string, senha: string) => Promise<void>;
  logOut: () => Promise<void>;
  esqueciSenha: (email: string) => Promise<void>;
  verificarEmail: (user: User) => Promise<void>;
  loading: boolean;
}

interface UserContextProviderProps {
  children: ReactNode;
}

const userContext = createContext<UserContextProps>({} as UserContextProps);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  setPersistence(auth, browserLocalPersistence);

  onAuthStateChanged(auth, (changedUser: User | null) => {
    if (changedUser) {
      setUser(changedUser);
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential?.accessToken;

      const user = result.user;

      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function registerUser(email: string, senha: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, senha);
      const user = result.user;

      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  async function loginUser(email: string, senha: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, senha);

      const user = result.user;

      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  async function esqueciSenha(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  }

  async function verificarEmail(user: User) {
    try {
      const result = await sendEmailVerification(user);
    } catch (error) {
      console.error(error);
    }
  }

  const value = useMemo(() => {
    return { signInWithGoogle, registerUser, loginUser, logOut, esqueciSenha, verificarEmail, loading, user };
  }, [user, loading]);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export function useUserContext() {
  return useContext(userContext);
}
