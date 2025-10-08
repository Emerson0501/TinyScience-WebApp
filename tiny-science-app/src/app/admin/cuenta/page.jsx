'use client';
import { useEffect, useState } from "react";
import { useLogout } from "@/utils/useLogout";
export default function Cuenta() {
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    credentials: "include",
                }); const data = await res.json();
                setUsuario(data.user);
            } catch (error) {
                console.error("Error al cargar la información del usuario:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsuario();
    }, []);

    const { handleLogout } = useLogout();


    return (
        <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
            {/* Header */}
            <section className="w-full h-[25vh] bg-rose-200 flex flex-col justify-center items-center p-4 shadow-sm">
                <h1 className="text-2xl md:text-3xl text-white font-bold mb-2 text-center">
                    MI CUENTA
                </h1>
                <p className="text-white/90 text-sm md:text-base text-center">
                    Visualiza tu información personal y datos de administrador.
                </p>
            </section>

            {/* Contenido */}
            <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
                {isLoading ? (
                    <p className="text-center text-gray-600 text-lg">
                        Cargando información...
                    </p>
                ) : usuario ? (
                    <div className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-rose-50 border border-rose-200 rounded-lg p-5">
                                <h3 className="font-semibold text-rose-700 mb-1">Nombre</h3>
                                <p className="text-gray-800">{usuario.name}</p>
                            </div>

                            <div className="bg-rose-50 border border-rose-200 rounded-lg p-5">
                                <h3 className="font-semibold text-rose-700 mb-1">Apellido</h3>
                                <p className="text-gray-800">{usuario.lastName}</p>
                            </div>

                            <div className="bg-rose-50 border border-rose-200 rounded-lg p-5">
                                <h3 className="font-semibold text-rose-700 mb-1">Correo electrónico</h3>
                                <p className="text-gray-800">{usuario.email}</p>
                            </div>

                            <div className="bg-rose-50 border border-rose-200 rounded-lg p-5">
                                <h3 className="font-semibold text-rose-700 mb-1">Rol</h3>
                                <p className="text-gray-800 capitalize">{usuario.role}</p>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 rounded-lg bg-rose-400 hover:bg-rose-500 text-white font-semibold transition shadow-md"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No se pudo cargar la información del usuario.
                    </p>
                )}
            </div>
        </div>
    );
}
