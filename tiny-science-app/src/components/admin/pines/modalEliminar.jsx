"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function ModalEliminarPin({ pin, closeModal, onPinDeleted }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/pines/${pin._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el pin");
      }

      const data = await res.json();
      onPinDeleted(data); // notificar al padre para refrescar la tabla
      closeModal();
    } catch (error) {
      console.error("❌ Error eliminando el pin:", error);
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
          className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 relative"
        >
          {/* Botón cerrar */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-red-500 text-4xl mb-3"
            />
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Eliminar Pin
            </h2>
            <p className="text-center text-gray-600">
              ¿Estás seguro de que deseas eliminar el pin{" "}
              <span className="font-semibold">{pin?.name}</span>?  
              Esta acción no se puede deshacer.
            </p>

            {/* Botones */}
            <div className="flex space-x-4 mt-6">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
