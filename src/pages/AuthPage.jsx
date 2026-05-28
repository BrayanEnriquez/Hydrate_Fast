import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Divider from '../components/atoms/Divider';
import AuthLayout from '../components/templates/AuthLayout';

const AuthPage = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const auth = async (user, password) => {
        setIsLoading(true);
        try {
            const authFirebase = getAuth();
            await signInWithEmailAndPassword(authFirebase, user, password);
            alert("Autenticado");
            navigate("/cultivos");
        } catch (error) {
            alert("Credenciales incorrectas");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!user || !password) {
            alert("Por favor completa todos los campos");
            return;
        }
        auth(user, password);
    };

    useEffect(() => {
        const authFirebase = getAuth();
        const unsubscribe = onAuthStateChanged(authFirebase, (currentUser) => {
            if (currentUser) {
                navigate("/cultivos");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <AuthLayout
            title="Hydrate Fast"
            subtitle="Gestión inteligente de hidratación para una agricultura sostenible y eficiente con Hydrate Fast."
        >
            <h2 className="text-[15px] font-bold text-gray-800 mb-5">Bienvenido a Hydrate Fast</h2>

            <form onSubmit={onSubmit}>
                <Input
                    label="Correo electrónico o usuario"
                    type="email"
                    placeholder="ejemplo@agroriego.com"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    icon={<span className="material-symbols-outlined text-lg">person</span>}
                />

                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={<span className="material-symbols-outlined text-lg">lock</span>}
                    rightElement={
                        <button type="button" className="focus:outline-none hover:text-gray-600 transition-colors flex items-center">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                    }
                />

                <div className="mt-5 mb-4">
                    <Button
                        type="submit"
                        text={isLoading ? "Cargando..." : "Iniciar Sesión"}
                        className="!bg-[#04281a] hover:!bg-[#031d13] text-white text-sm font-semibold py-2.5 !rounded-md !shadow-none w-full !scale-100"
                    />
                </div>

                <div className="text-center mb-1">
                    <a href="#" className="text-xs font-bold text-[#256e9c] hover:underline">
                        Olvidé mi contraseña
                    </a>
                </div>
            </form>

            <Divider text="o" />

            <div className="text-center mt-2">
                <span className="text-[11px] font-medium text-gray-500">¿No tienes una cuenta? </span>
                <Link to="/register" className="text-[11px] font-bold text-[#04281a] hover:underline">
                    Crear cuenta
                </Link>
            </div>
        </AuthLayout>
    );
};

export default AuthPage;
