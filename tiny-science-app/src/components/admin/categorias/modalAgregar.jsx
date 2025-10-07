import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTag, faImage, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploader from '../../cloudinary/ImageUploader';

const ModalAgregarCategoria = ({ closeModal, onCategoriaAdded }) => {
    const [categoriaData, setCategoriaData] = useState({
        name: "",
        description: "",
        image: "",
        file: null,
    });

    const [subiendo, setSubiendo] = useState(false);

    const handleChange = (e) => {
        setCategoriaData({
            ...categoriaData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        try {

            setSubiendo(true);
            let imageUrl = categoriaData.image;

            if (categoriaData.file) {
                const formData = new FormData();
                formData.append("file", categoriaData.file);

                const resUpload = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await resUpload.json();
                imageUrl = uploadData.url;
            }


            const res = await fetch("/api/categorias",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...categoriaData,
                        image: imageUrl,
                    }),
                })

            if (!res.ok) {
                throw new Error("Error al crear la categoría")
            }

            const data = await res.json();
            onCategoriaAdded(data)
            closeModal();
        } catch (error) {
            console.error("Error creando la materia:", error);
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0  flex justify-center items-center z-50  bg-black/40"
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
                            Agregar Categoría
                        </h2>

                        {/* Campo Nombre */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faTag} className="mr-2" />
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre de la categoría"
                                value={categoriaData.name}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                                required
                            />
                        </div>

                        {/* Campo Descripción */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faAlignLeft} className="mr-2" />
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                placeholder="Descripción de la categoría"
                                value={categoriaData.description}
                                onChange={handleChange}
                                className="w-full border text-black rounded p-2"
                                rows={3}
                            />
                        </div>

                        {/* Imagen */}
                        <div className="w-full mt-4">
                            <label className="flex items-center text-sm font-medium text-gray-600 mb-1">
                                <FontAwesomeIcon icon={faImage} className="mr-2" />
                                Imagen de la categoria
                            </label>
                            <ImageUploader
                                onFileSelect={(file) =>
                                    setCategoriaData((prev) => ({ ...prev, file }))
                                }
                            />
                        </div>

                        {/* Vista previa de imagen */}
                        {categoriaData.image && (
                            <img
                                src={categoriaData.image}
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
                                className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500"
                                onClick={handleSubmit}
                                disabled={subiendo}
                            >
                                {subiendo ? "Subiendo..." : "Agregar"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ModalAgregarCategoria;