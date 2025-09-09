"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faTag,
    faImage,
    faAlignLeft,
    faDollarSign,
    faBoxes,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const ModalAgregarPin = ({ closeModal, onPinAdded }) => {
    const [pinData, setPinData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
    });

    const [categorias, setCategorias] = useState([]);

    // Cargar categorías para el select
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch("/api/categorias");
                const data = await res.json();
                setCategorias(data);
            } catch (error) {
                console.error("Error cargando categorías:", error);
            }
        };
        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        setPinData({
            ...pinData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/pines", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...pinData,
                    price: Number(pinData.price),
                    stock: Number(pinData.stock),
                }),
            });

            if (!res.ok) {
                throw new Error("Error al crear el pin");
            }

            const data = await res.json();
            onPinAdded(data);
            closeModal();
        } catch (error) {
            console.error("Error creando pin:", error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex justify-center items-center z-50 bg-black/40"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="w-full max-w-md h-[80vh] bg-white rounded-xl shadow-xl relative 
                 overflow-y-auto p-6"
                >
                    {/* Botón Cerrar */}
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col items-center">
                        <FontAwesomeIcon
                            icon={faTag}
                            className="text-pink-500 text-4xl mb-2"
                        />
                        <h2 className="text-center text-xl font-bold text-gray-700">
                            Agregar Pin
                        </h2>

                        {/* Nombre */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faTag} className="mr-2" />
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del pin"
                                value={pinData.name}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faAlignLeft} className="mr-2" />
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                placeholder="Descripción del pin"
                                value={pinData.description}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                                rows={3}
                            />
                        </div>

                        {/* Precio */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                                Precio
                            </label>
                            <input
                                type="number"
                                name="price"
                                placeholder="0.00"
                                value={pinData.price}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                                required
                            />
                        </div>

                        {/* Stock */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faBoxes} className="mr-2" />
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                placeholder="Cantidad disponible"
                                value={pinData.stock}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                                required
                            />
                        </div>

                        {/* Categoría */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faList} className="mr-2" />
                                Categoría
                            </label>
                            <select
                                name="category"
                                value={pinData.category}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Imagen */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faImage} className="mr-2" />
                                URL de imagen
                            </label>
                            <input
                                type="text"
                                name="image"
                                placeholder="https://..."
                                value={pinData.image}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                            />
                        </div>

                        {/* Vista previa */}
                        {pinData.image && (
                            <img
                                src={pinData.image}
                                alt="Vista previa"
                                className="mt-4 max-h-40 rounded border"
                            />
                        )}

                        {/* Botones */}
                        <div className="flex space-x-4 mt-6">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ModalAgregarPin;
