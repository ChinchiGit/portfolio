import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User logged in:", currentUser.email);
        const adminEmail = import.meta.env.VITE_ADMIN;
        if (currentUser.email === adminEmail) {
          setUser(currentUser);
          console.log("User logged in:", currentUser.email);
        } else {
          logout();
          console.error("Unauthorized: You are not allowed to log in.");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    // La verificación del usuario se realiza en el onAuthStateChanged
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/"); // Redirige a la página de inicio
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


