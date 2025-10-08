"use client";
import { useEffect, useState } from "react";

export default function VisualizarPines() {
    const [pines, setPines] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resPines, resCategorias] = await Promise.all([
                    fetch("/api/pines"),
                    fetch("/api/categorias"),
                ]);

                const [dataPines, dataCategorias] = await Promise.all([
                    resPines.json(),
                    resCategorias.json(),
                ]);

                setPines(dataPines);
                setCategorias(dataCategorias);
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const pinesFiltrados =
        categoriaSeleccionada === "todas"
            ? pines
            : pines.filter(
                (pin) =>
                    pin.category &&
                    (pin.category._id === categoriaSeleccionada || pin.category === categoriaSeleccionada)
            );

    return (
        <div className="min-h-screen bg-pink-50 p-8">
            <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                Pines Registrados
            </h1>

            {/* Filtro de categoría */}
            <div className="flex justify-center mb-8">
                <select
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    className="px-4 py-2 border border-pink-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                    <option value="todas">Todas las categorías</option>
                    {categorias.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ?
                (
                    <p className="text-center text-gray-500">Cargando pines...</p>
                ) :
                pinesFiltrados.length === 0 ?
                    (
                        <p className="text-center text-gray-500">
                            No hay pines para esta categoría.
                        </p>
                    ) :
                    (
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {pinesFiltrados.map((pin) => (
                                <div
                                    key={pin._id}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-pink-200 p-4 flex flex-col"
                                >
                                    <div className="w-full h-44 bg-pink-100 rounded-lg flex items-center justify-center overflow-hidden">
                                        {pin.image ? (
                                            <img
                                                src={pin.image}
                                                alt={pin.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-pink-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M3 16.5v-9A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M3 14l3.5-4.5L10 14l4-5 6 8"
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    <h3 className="mt-3 text-lg font-semibold text-gray-800 text-center">
                                        {pin.name}
                                    </h3>

                                    <p className="text-sm text-gray-600 text-center mt-1 line-clamp-2">
                                        {pin.description || "Sin descripción disponible"}
                                    </p>

                                    <div className="mt-3 flex flex-col items-center text-gray-700 text-sm">
                                        <p className="font-medium">
                                            <span className="text-gray-800">
                                                ₡{pin.price?.toFixed(2)}
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Stock disponible:{" "}
                                            <span className="font-semibold">{pin.stock}</span>
                                        </p>
                                        {pin.category && (
                                            <p className="text-xs text-pink-500 mt-1">
                                                Categoría: {pin.category.name || pin.category}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            <p className="text-sm text-gray-500 text-center mt-10">
                Total de pines: {pinesFiltrados.length}
            </p>
        </div>
    );
}
