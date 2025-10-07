"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Home,
    User,
    Bell,
    AppWindow,
    ShoppingBag,
    LogIn,
    LogOut,
    Mail,
    Calendar,
    ChevronDown,
    Menu,
} from "lucide-react";

export default function SidebarDesktop({onLogout}) {
    const [isOpen, setIsOpen] = useState(true);
    const [pinesOpen, setPinesOpen] = useState(false);
    const [categoriasOpen, setCategoriasOpen] = useState(false);


    return (
        <aside
            className={`hidden min-h-screen text-white md:flex flex-col transition-all duration-300 ${isOpen ? "w-50" : "w-16"
                } bg-pink-300 overflow-y-auto`}
        >


            {/* Header */}
            <div className="px-2 py-2 border-b border-white/20">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition w-full"
                >
                    <Menu size={20} className="flex-shrink-0 min-w-[20px]" />
                    <span
                        className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto font-bold " : "opacity-0 w-0"
                            }`}
                    >
                        Tiny Science
                    </span>
                </button>
            </div>


            {/* Body */}
            <div className="flex-1 px-2 py-6 overflow-y-auto flex flex-col">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <Home size={18} className="flex-shrink-0 min-w-[20px]" />
                            <span
                                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                    }`}
                            >
                                Home
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <User size={18} className="flex-shrink-0 min-w-[20px]" />
                            <span
                                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                    }`}
                            >
                                Cuenta
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/categorias"
                            className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <Bell size={18} className="flex-shrink-0 min-w-[20px]" />
                            <span
                                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                    }`}
                            >
                                Categorías
                            </span>
                        </Link>
                    </li>



                    {/* DROPDOWN DE CATEGORIAS*/}
                    <li>
                        <button
                            onClick={() => setCategoriasOpen(!categoriasOpen)}
                            className="flex items-center justify-between w-full px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <div className="flex items-center gap-3">
                                <AppWindow size={18} className="flex-shrink-0 min-w-[20px]" />
                                <span
                                    className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                        }`}
                                >
                                    Categorías
                                </span>
                            </div>
                            {isOpen && (
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${categoriasOpen ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </button>
                        {categoriasOpen && isOpen && (
                            <ul className="ml-10 mt-2 space-y-2">
                                <li>
                                    <Link
                                        href="/admin/categorias"
                                        className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                                    >
                                        <Mail size={18} className="flex-shrink-0 min-w-[20px]" />
                                        <span>Administrar</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/categorias/visualizar"
                                        className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                                    >
                                        <Calendar size={18} className="flex-shrink-0 min-w-[20px]" />
                                        <span>Visualizar</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>



                    {/* DROPDOWN DE PINES*/}
                    <li>
                        <button
                            onClick={() => setPinesOpen(!pinesOpen)}
                            className="flex items-center justify-between w-full px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <div className="flex items-center gap-3">
                                <AppWindow size={18} className="flex-shrink-0 min-w-[20px]" />
                                <span
                                    className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                        }`}
                                >
                                    Pines
                                </span>
                            </div>
                            {isOpen && (
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${pinesOpen ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </button>
                        {pinesOpen && isOpen && (
                            <ul className="ml-10 mt-2 space-y-2">
                                <li>
                                    <Link
                                        href="/admin/pines"
                                        className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                                    >
                                        <Mail size={18} className="flex-shrink-0 min-w-[20px]" />
                                        <span>Administrar</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                                    >
                                        <Calendar size={18} className="flex-shrink-0 min-w-[20px]" />
                                        <span>Visualizar</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-3.5 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <ShoppingBag size={18} className="flex-shrink-0 min-w-[20px]" />
                            <span
                                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                    }`}
                            >
                                Product
                            </span>
                        </Link>
                    </li>

                    {/* <li>
                        <Link
                            href="#"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <LogIn size={18} className="flex-shrink-0 min-w-[20px]" />
                            <span
                                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                    }`}
                            >
                                Sign In
                            </span>
                        </Link>
                    </li> */}
                </ul>

                {/* Sign Out siempre abajo */}
                <div className="mt-auto">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500 transition w-full text-left"
                    >
                        <LogOut size={18} className="flex-shrink-0 min-w-[20px]" />
                        <span
                            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                }`}
                        >
                            Sign Out
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
