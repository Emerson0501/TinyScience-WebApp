'use client';
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { FaPlus } from 'react-icons/fa';
import ModalAgregarCategoria from "@/components/admin/categorias/modalAgregar";
import ModalImagenCategoria from "@/components/modalImagen";
import ModalEditarCategoria from "@/components/admin/categorias/modalEditar";
import ModalEliminarCategoria from "@/components/admin/categorias/modalEliminar";

export default function CategoriaAdmin() {
    const [categorias, setCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategoria, setSelectedCategoria] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [imagenModal, setImagenModal] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch('/api/categorias');
                const data = await res.json();
                setCategorias(data);
            } catch (err) {
                console.error("Error al cargar categorías:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategorias();
    }, []);



    const handleEdit = (id) => {
        console.log("Editar categoría con id:", id);
    };

    const handleDeleteClick = (categoria) => {
        console.log("Eliminar categoría:", categoria);
    };

    const columns = useMemo(() => [
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "description",
            header: "Descripción",
        },
        {
            accessorKey: "image",
            header: "Imagen",
            Cell: ({ cell }) => {
                const url = cell.getValue();
                return url ? (
                    <button
                        onClick={() => setImagenModal(url)}
                        className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-amber-300 text-white rounded-lg hover:bg-amber-400 transition"                   >
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
            muiTableHeadCellProps: {
                align: "right",
                sx: { pr: 6.5 },
            },
            muiTableBodyCellProps: {
                align: "right",
            },
            Cell: ({ row }) => (
                <div className="flex w-full justify-end items-center space-x-2">
                    <button
                        type="button"
                        className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"

                        onClick={() => {
                            setSelectedCategoria(row.original);
                            setShowEditModal(true);
                        }}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                        onClick={() => {
                            setSelectedCategoria(row.original);
                            setShowDeleteModal(true);
                        }}
                    >
                        Eliminar
                    </button>

                </div>
            ),
        },
    ], []);

    const table = useMaterialReactTable({
        columns,
        data: categorias,
    });

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen">
            {/* Header */}
            <section className="w-full h-[25vh] bg-gradient-to-r from-pink-400 to-pink-500 flex flex-col justify-center items-center p-4">
                <h1 className="text-2xl md:text-3xl text-white font-bold mb-4 text-center">
                    ADMINISTRAR CATEGORÍAS
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

            <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 overflow-x-auto">
                {isLoading ? (
                    <p className="text-center text-lg text-gray-600">Cargando categorías...</p>
                ) : (
                    <MaterialReactTable table={table} />
                )}
            </div>

            {
                showAddModal && (
                    <ModalAgregarCategoria
                        closeModal={() => setShowAddModal(false)}
                        onCategoriaAdded={(nuevaCategoria) => {
                            setCategorias((prev) => [...prev, nuevaCategoria]);
                        }}
                    />
                )
            }

            {
                showEditModal && (
                    <ModalEditarCategoria
                        categoria={selectedCategoria}
                        closeModal={() => setShowEditModal(false)}
                        onCategoriaUpdated={(categoriaEditada) => {
                            setCategorias((prev) =>
                                prev.map((cat) =>
                                    cat._id === categoriaEditada._id ? categoriaEditada : cat
                                )
                            );
                        }}
                    />
                )
            }

            {
                showDeleteModal && (
                    <ModalEliminarCategoria
                        categoria={selectedCategoria}
                        closeModal={() => setShowDeleteModal(false)}
                        onCategoriaDeleted={(idEliminado) => {
                            setCategorias((prev) =>
                                prev.filter((cat) => cat._id !== idEliminado)
                            );
                        }}
                    />
                )
            }



            {imagenModal && (
                <ModalImagenCategoria
                    imageURL={imagenModal}
                    closeModal={() => setImagenModal(null)}
                />
            )}


        </div>

    );
}
