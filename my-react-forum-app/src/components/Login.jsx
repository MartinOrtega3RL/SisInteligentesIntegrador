import React, { useState, useEffect } from "react";
import { auth, provider } from "../Firebase/firebaseServices.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "antd"; // Importing Ant Design Button

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="login-container flex flex-col items-center justify-center h-screen">
      {user ? (
        <div className="user-info flex flex-col items-center">
          <img src={user.photoURL} alt={user.displayName} className="rounded-full w-24 h-24 mb-4" />
          <span className="text-lg font-semibold">{user.displayName}</span>
          <Button type="primary" onClick={logout} className="mt-4">Cerrar sesión</Button>
        </div>
      ) : (
        <Button type="primary" onClick={signInWithGoogle}>Iniciar sesión con Google</Button>
      )}
    </div>
  );
};

export default Login;