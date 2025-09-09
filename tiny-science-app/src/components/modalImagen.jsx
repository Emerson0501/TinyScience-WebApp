// components/admin/categorias/ModalImagenCategoria.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function ModalImagenCategoria({ imageURL, closeModal }) {
    return (
        <AnimatePresence>
            {imageURL && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center shadow-fuchsia-500 shadow-2xl justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="relative bg-white p-4 rounded-lg shadow-lg"
                    >
                        <img
                            src={imageURL}
                            alt="Vista previa"
                            className="max-w-md max-h-[70vh] object-contain"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                            Cerrar
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
