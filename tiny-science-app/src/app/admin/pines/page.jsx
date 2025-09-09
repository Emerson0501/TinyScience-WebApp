'use client';
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { FaPlus } from "react-icons/fa";
import ModalAgregarPin from "@/components/admin/pines/modalAgregar";
import ModalImagenPin from "@/components/modalImagen";
import ModalEditarPin from "@/components/admin/pines/modalEditar";
import ModalEliminarPin from "@/components/admin/pines/modalEliminar";



export default function PinesAdmin() {
  const [pines, setPines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPin, setSelectedPin] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [imagenModal, setImagenModal] = useState(null);

  const fetchPines = async () => {
    try {
      const res = await fetch("/api/pines");
      const data = await res.json();
      setPines(data);
    } catch (err) {
      console.error("Error al cargar pines:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Solo lo llamamos cuando se monta
  useEffect(() => {
    fetchPines();
  }, []);



  const handleEdit = (id) => {
    console.log("Editar pin con id:", id);
  };

  const handleDeleteClick = (pin) => {
    console.log("Eliminar pin:", pin);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Nombre" },
      { accessorKey: "description", header: "Descripción" },
      { accessorKey: "price", header: "Precio" },
      { accessorKey: "stock", header: "Stock" },
      {
        accessorKey: "category.name", // si en populate traes la categoría completa
        header: "Categoría",
        Cell: ({ row }) => row.original.category?.name || "Sin categoría",
      },
      {
        accessorKey: "image",
        header: "Imagen",
        Cell: ({ cell }) => {
          const url = cell.getValue();
          return url ? (
            <button
              onClick={() => setImagenModal(url)}
              className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-amber-300 text-white rounded-lg hover:bg-amber-400 transition"
            >
              Ver imagen
            </button>
          ) : (
            <span className="text-gray-400 italic">Sin imagen</span>
          );
        },
      },
      {
        accessorKey: "acciones",
        header: "Acciones",
        enableSorting: false,
        enableColumnActions: false,
        muiTableHeadCellProps: { align: "right", sx: { pr: 6.5 } },
        muiTableBodyCellProps: { align: "right" },
        Cell: ({ row }) => (
          <div className="flex w-full justify-end items-center space-x-2">
            <button
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                setSelectedPin(row.original);
                setShowEditModal(true);
              }}
            >
              Editar
            </button>
            <button
              type="button"
              className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
              onClick={() => {
                setSelectedPin(row.original);
                setShowDeleteModal(true);
              }}            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({ columns, data: pines });

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <section className="w-full h-[25vh] bg-pink-300 flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-4 text-center">
          ADMINISTRAR PINES
        </h1>
        <div className="flex justify-center">
          <button
            type="button"
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white text-black border border-white rounded-full hover:bg-green-600 hover:border-green-600 transition duration-200 shadow-lg"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </section>

      {/* Tabla */}
      <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 overflow-x-auto">
        {isLoading ? (
          <p className="text-center text-lg text-gray-600">Cargando pines...</p>
        ) : (
          <MaterialReactTable table={table} />
        )}
      </div>

      {/* Modales */}
      {
        showAddModal && (
          <ModalAgregarPin
            closeModal={() => setShowAddModal(false)}
            onPinAdded={(nuevoPin) => {
              setPines((prev) => [...prev, nuevoPin]);
            }}
          />
        )
      }


      {
        showEditModal && (
          <ModalEditarPin
            pin={selectedPin}
            closeModal={() => setShowEditModal(false)}
            onPinUpdated={() => {
              fetchPines();
            }}

          />
        )
      }

      {
        showDeleteModal && (
          <ModalEliminarPin
            pin={selectedPin}
            closeModal={() => setShowDeleteModal(false)}
            onPinDeleted={() => {
              fetchPines();
            }}
          />
        )
      }

      {imagenModal && (
        <ModalImagenPin
          imageURL={imagenModal}
          closeModal={() => setImagenModal(null)}
        />
      )}
    </div>
  );
}
