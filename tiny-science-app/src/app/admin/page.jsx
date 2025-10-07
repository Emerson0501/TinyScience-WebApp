"use client";
import Sidebar from "@/components/admin/Sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [summary, setSummary] = useState({ pinesActivos: 0, categoriasActivas: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Error al obtener resumen:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-dvh bg-pink-50">
      {/* Sidebar (oculta en móviles, visible en pantallas md+) */}
 

      {/* Contenido principal */}
      <main className="flex-1 px-6 sm:px-10 py-10 bg-gray-50 min-h-screen">
        {/* Encabezado */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-700">
            🌸 ¡Bienvenida al Panel de Administración!
          </h1>
          <p className="text-gray-600 mt-2 text-base sm:text-lg">
            Gestiona y supervisa tus contenidos de forma sencilla.
          </p>
        </div>

        {/* Tarjetas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 mb-10 max-w-5xl mx-auto">
          {/* Tarjeta Pines */}
          <Link
            href="/admin/pines"
            className="group block rounded-2xl bg-pink-200 hover:bg-pink-300 transition-all duration-200 shadow-lg p-8 sm:p-10 text-center sm:text-left"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-pink-900 group-hover:scale-105 transition-transform">
              📌 Administra tus Pines
            </h2>
            <p className="text-pink-800 mt-3 text-base sm:text-lg">
              Crea, edita y organiza los pines que se muestran en tu plataforma.
            </p>
          </Link>

          {/* Tarjeta Categorías */}
          <Link
            href="/admin/categorias"
            className="group block rounded-2xl bg-rose-200 hover:bg-rose-300 transition-all duration-200 shadow-lg p-8 sm:p-10 text-center sm:text-left"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-rose-900 group-hover:scale-105 transition-transform">
              🗂️ Administra tus Categorías
            </h2>
            <p className="text-rose-800 mt-3 text-base sm:text-lg">
              Añade o modifica categorías para mantener tu contenido bien organizado.
            </p>
          </Link>
        </div>

        {/* Tarjetas de totales */}
        {loading ? (
          <p className="text-center text-gray-500 mt-8">Cargando resumen...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
            {/* Pines activos */}
            <div className="bg-pink-200 hover:bg-pink-300 transition-all rounded-2xl shadow-lg p-8 sm:p-10 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-pink-800">
                Pines Activos
              </h3>
              <p className="text-4xl sm:text-5xl font-bold text-pink-700 mt-2">
                {summary.pinesActivos}
              </p>
            </div>

            {/* Categorías activas */}
            <div className="bg-rose-200 hover:bg-rose-300 transition-all rounded-2xl shadow-lg p-8 sm:p-10 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-rose-800">
                Categorías Activas
              </h3>
              <p className="text-4xl sm:text-5xl font-bold text-rose-700 mt-2">
                {summary.categoriasActivas}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
