import React, { useState, useEffect } from "react";
import { auth, provider } from "../Firebase/firebaseServices.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "antd";
import Foro from "../pages/Foro.jsx";

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
    const irAlhome = () => {
        try {
            window.location.href = "/";
        } catch (error) {
            console.error("Error al volver:", error);
        }
    };

    const logout = async () => {
        try {
            window.location.href = "/";
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="min-h-screen bg-purple-100 flex items-center justify-center">
            {user ? (
                <div className="w-full max-w-5xl mx-auto px-4">
                    <header className="flex items-center justify-between bg-gray-200 text-black py-4 px-6 rounded-lg shadow-md mb-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="rounded-full w-12 h-12"
                            />
                            <span className="text-lg font-semibold">{user.displayName}</span>
                        </div>
                        <Button type="primary" onClick={logout} className="bg-gray-800 hover:bg-gray-700 text-white">
                            Cerrar sesión
                        </Button>
                    </header>
                    <Foro user={user} />
                </div>
            ) : (
                <div className="login-container bg-gray-200 text-black rounded-xl shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold mb-6 text-purple-600">
                        Bienvenido al Foro de Sistemas Inteligentes
                    </h1>
                    <Button
                        type="primary"
                        onClick={signInWithGoogle}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition mb-4"
                    >
                        Iniciar sesión con Google
                    </Button>
                    <Button
                        type="primary"
                        onClick={irAlhome}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 ml-6 rounded transition mt-4"
                    >
                        Ir al home
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Login;