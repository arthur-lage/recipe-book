import { ReactNode, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { IUser } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import { usersService } from "../services/usersService";

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  currentUser: IUser | null;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderType = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderType) {
  const [currentUser, setCurrentUser] = useState<null | IUser>(null);

  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  async function signInWithGoogle() {
    try {
      const res = await signInWithPopup(auth, provider);

      setCurrentUser({
        id: res.user.uid,
        displayName: res.user?.displayName,
        email: res.user?.email,
        photoURL: res.user?.photoURL,
      });
    } catch (err) {
      console.error(err);
    }
  }

  function logout() {
    signOut(auth);
    setCurrentUser(null);
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userExistsInDatabase = await usersService.checkIfUserExists(
          user.uid
        );

        if (!userExistsInDatabase) {
          await usersService.addUserToDatabase({
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
          });
        }

        return setCurrentUser({
          id: user.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        });
      }

      setCurrentUser(null);
      return navigate("/auth");
    });
  }, []);

  const value = {
    signInWithGoogle,
    logout,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
